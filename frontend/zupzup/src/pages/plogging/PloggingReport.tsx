import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import * as utils from 'utils';
import { ConfirmButton, RecordReport, PloggingDone } from 'components';
import { store, useAppDispatch, useCapture } from 'hooks';
import { deleteAllPlogging } from 'hooks/store/usePlogging';

import SaveSvg from 'assets/icons/save.svg?react';
import uploadFile from 'hooks/useUpload';
import { PloggingApis, RecordApis } from 'api';
import { PloggingLogRequest, TrashRequest } from 'types';

interface Location {
  lat: number;
  lng: number;
}

const PloggingReport = () => {
  const mapRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { handleCaptureClick, captureRef } = useCapture();
  const [showLoading, setLoading] = useState(true);

  const reportCapture = () => {
    if (!canvasRef.current || !mapRef.current) {
      return;
    }

    (mapRef.current! as HTMLDivElement).style.display = 'none';
    (canvasRef.current! as HTMLCanvasElement).style.display = 'block';
    handleCaptureClick();
    (mapRef.current! as HTMLDivElement).style.display = 'block';
    (canvasRef.current! as HTMLCanvasElement).style.display = 'none';
  };

  const handleDonePlogging = () => {
    dispatch(deleteAllPlogging());
    navigate(utils.URL.MYPAGE.HOME);
  };

  const dataURLtoBlob = (dataURL: string) => {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  useEffect(() => {
    const initMap = () => {
      const maxLat = JSON.parse(
        localStorage.getItem(utils.COORDINATE.MAX_LATITUDE) as string,
      ) as number;
      const minLat = JSON.parse(
        localStorage.getItem(utils.COORDINATE.MIN_LATITUDE) as string,
      ) as number;
      const maxLng = JSON.parse(
        localStorage.getItem(utils.COORDINATE.MAX_LONGITUDE) as string,
      ) as number;
      const minLng = JSON.parse(
        localStorage.getItem(utils.COORDINATE.MIN_LONGITUDE) as string,
      ) as number;

      const { Tmapv3 } = window;
      const latlngBounds = new Tmapv3.LatLngBounds(
        new Tmapv3.LatLng(minLat - 0.0001, minLng - 0.0001),
      );
      latlngBounds.extend(new Tmapv3.LatLng(maxLat + 0.0001, maxLng + 0.0001));
      console.log(latlngBounds);
      if (mapRef.current) {
        const map = new Tmapv3.Map(mapRef.current, {
          width: '100%',
          height: '200px',
          bounds: latlngBounds,
        });

        map.on('ConfigLoad', () => {
          const locations = JSON.parse(
            localStorage.getItem(utils.COORDINATE.LOCATIONS_KEY) as string,
          );

          if (!locations || locations.length < 1) {
            return;
          }

          const paths = [...locations].map(
            (location: Location) =>
              new window.Tmapv3.LatLng(location.lat, location.lng),
          );

          new window.Tmapv3.Polyline({
            path: paths,
            strokeColor: '#dd00dd',
            strokeWeight: 6,
            direction: true,
            map: map,
          });
        });
      }
    };

    const initRoute = async () => {
      if (!canvasRef.current) {
        return;
      }

      const maxLat = JSON.parse(
        localStorage.getItem(utils.COORDINATE.MAX_LATITUDE) as string,
      ) as number;
      const minLat = JSON.parse(
        localStorage.getItem(utils.COORDINATE.MIN_LATITUDE) as string,
      ) as number;
      const maxLng = JSON.parse(
        localStorage.getItem(utils.COORDINATE.MAX_LONGITUDE) as string,
      ) as number;
      const minLng = JSON.parse(
        localStorage.getItem(utils.COORDINATE.MIN_LONGITUDE) as string,
      ) as number;
      const latRange = maxLat - minLat;
      const lngRange = maxLng - minLng;

      const canvas = canvasRef.current as HTMLCanvasElement;
      const context = canvas.getContext('2d') as CanvasRenderingContext2D;

      canvas.width = 800;
      canvas.height = 600;
      canvas.style.display = 'none';
      context.strokeStyle = '#00c4b8';
      context.lineWidth = 6;

      const locations = JSON.parse(
        localStorage.getItem(utils.COORDINATE.LOCATIONS_KEY) as string,
      );

      if (!locations || locations.length < 1) {
        return;
      }

      for (let i = 0; i < locations.length - 1; i++) {
        const curLocation = locations[i] as Location;
        const nextLocation = locations[i + 1] as Location;

        const startX = (curLocation.lng - minLng) * (canvas.width / lngRange);
        const startY = (maxLat - curLocation.lat) * (canvas.height / latRange);
        const endX = (nextLocation.lng - minLng) * (canvas.width / lngRange);
        const endY = (maxLat - nextLocation.lat) * (canvas.height / latRange);

        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.stroke();
      }

      try {
        const blob = dataURLtoBlob(canvas.toDataURL(utils.IMAGE_MIME_TYPE));
        const file = new File(
          [blob],
          `route${new Date()}-${store.getState().auth.memberId}.jpg`,
          {
            type: utils.IMAGE_MIME_TYPE,
          },
        );
        console.log(file);
        const uploadedFileUrl = await uploadFile(
          file,
          file.name, // S3 내 파일 경로 및 이름
        );

        // 업로드 성공 시 결과 전달
        console.log('amazon link', uploadedFileUrl);

        const ploggingData: PloggingLogRequest = {
          calories: store.getState().plogging.calories,
          startDateTime: store.getState().plogging.startDateTime!,
          endDateTime: store.getState().plogging.endDateTime!,
          distance: store.getState().plogging.distance,
          durationTime: store.getState().plogging.time!,
          coin: store.getState().plogging.coin,
          gatheredTrash: store.getState().plogging.gatheredTrash,
          routeImageUrl: uploadedFileUrl,
        };

        const trashData: TrashRequest = store.getState().plogging.trashDetail;
        console.log(ploggingData, trashData);
        await RecordApis.postPloggingLog({
          ploggingLogRequest: ploggingData,
          trashRequest: trashData,
        });
        await PloggingApis.stopPlogging();
        console.log('성공!!');
      } catch (error) {
        // 업로드 실패 시 오류 처리
        console.error('파일 업로드 오류:', error);
      }
    };

    if (mapRef.current) {
      initMap();
    }
    initRoute();
  }, [showLoading]);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      clearTimeout(loadingTimer);
      localStorage.clear();
    };
  }, []);

  if (showLoading) {
    return <PloggingDone />;
  }

  return (
    <S.Wrap>
      <S.Content>
        <S.TitleFrame>
          <S.MainTitle>플로깅 완료</S.MainTitle>
          <S.CloseButton onClick={() => navigate(utils.URL.PLOGGING.LOBBY)}>
            닫기
          </S.CloseButton>
        </S.TitleFrame>
        <S.SubText>플로깅 기록을 확인해주세요</S.SubText>
        <S.CaptureWrapper ref={captureRef}>
          <S.SubTitle>나의 이동 경로</S.SubTitle>
          <S.Map ref={mapRef}></S.Map>
          <S.CanvasBox ref={canvasRef} />
          <S.SubTitle>기록</S.SubTitle>
          <RecordReport />
        </S.CaptureWrapper>

        <S.SaveImage onClick={() => reportCapture()}>
          <SaveSvg />
          이미지로 저장하기
        </S.SaveImage>
      </S.Content>
      <S.BottomFrame>
        <ConfirmButton text="마이페이지로 이동" onClick={handleDonePlogging} />
      </S.BottomFrame>
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    height: 100vh;
    padding-top: 10px;
    background-color: ${({ theme }) => theme.color.background};
    /* color: ${({ theme }) => theme.color.main}; */
  `,

  Content: styled.div`
    /* padding: 0 24px; */
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  `,

  Image: styled.img`
    width: 100%;
    margin-top: 22px;
  `,
  Map: styled.div`
    width: 100%;
    height: 100%;
    margin-top: 20px;
    /* pointer-events: none; */
  `,
  CanvasBox: styled.canvas`
    object-fit: cover;
    width: 100%;
    background-color: ${({ theme }) => theme.color.gray4};
    margin: 20px 0 0 0;
    border-radius: 4px;
    padding: 10px;
  `,
  TitleFrame: styled.div`
    margin-top: 25px;
    display: flex;
    justify-content: space-between;
    padding: 0 24px;
  `,

  CloseButton: styled.div`
    cursor: pointer;
    color: ${({ theme }) => theme.color.main};
    font-size: ${({ theme }) => theme.font.size.focus2};
    font-family: ${({ theme }) => theme.font.family.focus2};
    font-weight: ${({ theme }) => theme.font.weight.body2};
  `,

  MainTitle: styled.div`
    font-size: ${({ theme }) => theme.font.size.display1};
    font-family: ${({ theme }) => theme.font.family.display1};
    font-weight: ${({ theme }) => theme.font.weight.body2};
    line-height: ${({ theme }) => theme.font.lineheight.display1};
    color: ${({ theme }) => theme.color.dark};
  `,

  SubText: styled.div`
    margin-top: 10px;
    color: ${({ theme }) => theme.color.gray2};
    font-size: ${({ theme }) => theme.font.size.body2};
    font-family: ${({ theme }) => theme.font.family.body2};
    font-weight: ${({ theme }) => theme.font.weight.body2};
    line-height: ${({ theme }) => theme.font.lineheight.body2};
    padding: 0 24px;
  `,

  SubTitle: styled.div`
    color: ${({ theme }) => theme.color.dark};
    font-size: ${({ theme }) => theme.font.size.body1};
    font-family: ${({ theme }) => theme.font.family.focus2};
    font-weight: ${({ theme }) => theme.font.weight.body2};
    line-height: ${({ theme }) => theme.font.lineheight.body2};
    padding: 40px 0 0;
  `,

  BottomFrame: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    bottom: 0;
    width: 100%;
    margin: auto 0 50px 0;
  `,

  SaveImage: styled.div`
    cursor: pointer;
    margin: 16px 0;
    display: flex;
    justify-content: flex-end;
    gap: 6px;
    align-items: center;
    font-size: ${({ theme }) => theme.font.size.body3};
    font-family: ${({ theme }) => theme.font.family.focus3};
    font-weight: ${({ theme }) => theme.font.weight.body2};
    color: ${({ theme }) => theme.color.gray2};
    padding: 0 24px;
  `,
  CaptureWrapper: styled.div`
    padding: 0 24px;
    background-color: ${({ theme }) => theme.color.background};
  `,
};
export default PloggingReport;
