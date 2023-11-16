import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import ClockSvg from 'assets/icons/clock.svg?react';
import PathSvg from 'assets/icons/path.svg?react';
import ReportSvg from 'assets/icons/clipboard.svg?react';

import DumbbellSvg from 'assets/icons/dumbbell.svg?react';
import MoreSvg from 'assets/icons/more-horizontal.svg?react';
import ArrowUpSvg from 'assets/icons/angle-up.svg?react';
import { PloggingInfo, TrashDetail } from 'types';
import { useFormatDateTime } from 'hooks';
import { ReportModal } from 'components';
import { RecordApis, RouteApis } from 'api';

interface Props {
  ploggingInfo: PloggingInfo;
}

//! 수정해주세요

const RecordBox = ({ ploggingInfo }: Props) => {
  const mapRef = useRef(null);
  const [showImage, setShowImage] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trashRecord, setTrashRecord] = useState<TrashDetail>();
  const [loadError, setLoadError] = useState<boolean>(false);

  useEffect(() => {
    fetchRecordTrash();
  }, []);

  useEffect(() => {
    const initMap = async () => {
      const { Tmapv3 } = window;
      try {
        const response = await RouteApis.getRoutes(ploggingInfo.ploggingLogId);
        const locations = response.data.results.locations;
        setLoadError(false);

        let minLat = 90;
        let maxLat = -90;
        let minLng = 180;
        let maxLng = -180;
        for (let i = 0; i < locations.length; i++) {
          minLat = Math.min(minLat, locations[i].latitude);
          minLng = Math.min(minLng, locations[i].longitude);
          maxLat = Math.max(maxLat, locations[i].latitude);
          maxLng = Math.max(maxLng, locations[i].longitude);
        }

        const latlngBounds = new Tmapv3.LatLngBounds(
          new Tmapv3.LatLng(minLat - 0.0001, minLng - 0.0001),
        );
        latlngBounds.extend(
          new Tmapv3.LatLng(maxLat + 0.0001, maxLng + 0.0001),
        );

        if (!mapRef.current) {
          return;
        }

        const map = new Tmapv3.Map(mapRef.current, {
          width: '100%',
          height: '200px',
          bounds: latlngBounds,
        });

        map.on('ConfigLoad', () => {
          const paths = [...locations].map(
            (location: { latitude: number; longitude: number }) =>
              new Tmapv3.LatLng(location.latitude, location.longitude),
          );

          new Tmapv3.Polyline({
            path: paths,
            strokeColor: '#00C4B8',
            strokeWeight: 6,
            direction: true,
            map: map,
          });
        });
      } catch (error) {
        setLoadError(true);
      }
    };

    if (mapRef.current && showImage) {
      initMap();
    }
  }, [ploggingInfo.ploggingLogId, showImage]);

  const fetchRecordTrash = async () => {
    const response = await RecordApis.getPloggingTrash(
      ploggingInfo.ploggingLogId,
    );
    const data = response.data.results;
    setTrashRecord(data);
  };

  const handleMoreInfo = () => {
    setShowImage(!showImage);
  };
  return (
    <S.Wrap>
      <ReportModal
        trashDetail={trashRecord!}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <S.Header>
        {useFormatDateTime.formatDateTimeHour(ploggingInfo.startDateTime)}
        <S.RecordButton onClick={() => setIsModalOpen(true)}>
          <ReportSvg />
        </S.RecordButton>
      </S.Header>
      <S.PloggingRecords>
        <S.RecordInfoBox>
          <PathSvg />
          <S.RecordInfo>
            {(ploggingInfo.distance / 1000.0).toFixed(2)}km
          </S.RecordInfo>
        </S.RecordInfoBox>
        <S.RecordInfoBox>
          <ClockSvg />
          <S.RecordInfo>
            {useFormatDateTime.formatDateTimePeriod(
              ploggingInfo.startDateTime,
              ploggingInfo.endDateTime,
            )}
          </S.RecordInfo>
        </S.RecordInfoBox>
        <S.RecordInfoBox>
          <DumbbellSvg />
          <S.RecordInfo>{ploggingInfo.calories}Kcal</S.RecordInfo>
        </S.RecordInfoBox>
      </S.PloggingRecords>
      {showImage ? (
        <>
          {loadError ? (
            <S.Image src={ploggingInfo.routeImageUrl} />
          ) : (
            <S.Map ref={mapRef}></S.Map>
          )}
          <S.BottomBox $isOpen={showImage}>
            <ArrowUpSvg onClick={handleMoreInfo} />
          </S.BottomBox>
        </>
      ) : (
        <S.BottomBox $isOpen={showImage}>
          <MoreSvg onClick={handleMoreInfo} />
        </S.BottomBox>
      )}
    </S.Wrap>
  );
};

interface StyleProps {
  $isOpen: boolean;
}
const S = {
  Wrap: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
    background-color: ${({ theme }) => theme.color.white};
    border-radius: 8px;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.04);
    padding: 14px 16px;
    margin: 0 0 20px 0;
    color: ${({ theme }) => theme.color.dark};
  `,
  Header: styled.div`
    color: ${({ theme }) => theme.color.gray3};
    font-size: ${({ theme }) => theme.font.size.body3};
    font-family: ${({ theme }) => theme.font.family.body3};
    line-height: ${({ theme }) => theme.font.lineheight.body3};
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  PloggingRecords: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  `,
  RecordInfoBox: styled.div`
    display: flex;
    margin-top: 14px;
    & > svg {
      width: 16px;
      height: 16px;
      margin: 0 10px 0 0;
    }
  `,
  RecordInfo: styled.div`
    font-size: ${({ theme }) => theme.font.size.focus3};
    font-family: ${({ theme }) => theme.font.family.focus3};
    line-height: ${({ theme }) => theme.font.lineheight.focus3};
    color: ${({ theme }) => theme.color.dark};
    white-space: nowrap;
  `,

  BottomBox: styled.div<StyleProps>`
    display: flex;
    align-items: center;
    justify-content: ${({ $isOpen }) =>
      $isOpen === true ? 'center' : 'flex-end'};
    margin: 4px 0 -10px 0;
    width: 100%;
    & svg {
      cursor: pointer;
    }
  `,

  Image: styled.img`
    width: 100%;
    margin-top: 14px;
    align-self: center;
  `,

  RecordButton: styled.div`
    margin-top: -4px;
    & svg,
    svg path {
      cursor: pointer;
      stroke: ${({ theme }) => theme.color.main};
      width: 22px;
    }
  `,
  Map: styled.div`
    width: 100%;
    height: 100%;
    margin-top: 20px;
    pointer-events: none;
  `,
};

export default RecordBox;
