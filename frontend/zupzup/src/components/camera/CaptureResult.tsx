import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import AngleLeftSvg from 'assets/icons/angle-left.svg?react';
import DownloadSvg from 'assets/icons/download.svg?react';
import ShareSvg from 'assets/icons/share.svg?react';
import CONSOLE from 'utils/ColorConsoles';
import { canvasToFile } from 'utils/CanvasUtils';

interface Props {
  cameraRef: React.RefObject<HTMLVideoElement>;
  setCapture: (capture: boolean) => void;
  captureFileState: [
    File | undefined,
    React.Dispatch<React.SetStateAction<File | undefined>>,
  ];
}

const CaptureResult = ({ cameraRef, setCapture, captureFileState }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shareRef = useRef<HTMLButtonElement>(null);
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [captureFile, setCaptureFile] = captureFileState;
  const [captureImage, setCaptureImage] = useState<File>();

  const downloadImage = () => {
    const downloadButton = downloadRef.current;
    if (!downloadButton || !captureFile) {
      return;
    }

    downloadButton.href = URL.createObjectURL(captureFile);
    downloadButton.download = captureFile.name;
  };

  const shareImage = async () => {
    const shareButton = shareRef.current;
    if (!shareButton || !captureFile) {
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          files: [captureFile],
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('not support share in this browser');
    }
  };

  useEffect(() => {
    const capture = () => {
      if (!isCapturing) {
        setIsCapturing(true);

        const camera = cameraRef.current;
        const canvas = canvasRef.current;
        if (!camera || !canvas) {
          return;
        }

        canvas.width = camera.videoWidth;
        canvas.height = camera.videoHeight;
        canvas
          .getContext('2d')!
          .drawImage(camera, 0, 0, canvas.width, canvas.height);

        const file = canvasToFile(`captured_image.jpg`, canvas);

        setCaptureImage(file);
        setIsCapturing(false);
      }
    };

    capture();
  }, []);

  useEffect(() => {
    const disableCamera = () => {
      if (cameraRef.current) {
        const stream = cameraRef.current!.srcObject as MediaStream;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => {
            track.stop();
          });
        }
        (cameraRef.current as HTMLVideoElement).disablePictureInPicture = true;
      }
    };
    if (captureFile) {
      CONSOLE.info('trash captureFile saved in memory');
      disableCamera();
    }
  }, [captureImage]);

  function requestAnalyze() {
    if (!captureImage) {
      alert('이미지 저장이 아직 되지 않았습니다!');
      return;
    }
    setCaptureFile(captureImage);
    setCapture(false);
  }

  return (
    <S.Wrap>
      <S.Header>
        <S.PrevButton onClick={() => setCapture(false)}>
          <AngleLeftSvg />
        </S.PrevButton>
      </S.Header>
      <S.Content>
        <S.CanvasBox ref={canvasRef} />
      </S.Content>
      <S.UserAccess>
        <S.ShareButton ref={shareRef} onClick={() => shareImage()}>
          <ShareSvg /> 공유하기
        </S.ShareButton>
        <S.AnalyzeButton onClick={requestAnalyze}>분석하기</S.AnalyzeButton>
        <S.DownloadButton ref={downloadRef} onClick={() => downloadImage()}>
          <DownloadSvg /> 이미지 저장
        </S.DownloadButton>
      </S.UserAccess>
    </S.Wrap>
  );
};

export default CaptureResult;

const S = {
  Wrap: styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.color.background};
    z-index: 410;
  `,
  Header: styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    padding: 0 15px;
  `,
  PrevButton: styled.button`
    background-color: transparent;
  `,
  Content: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  CanvasBox: styled.canvas`
    object-fit: cover;
    width: 100%;
  `,
  UserAccess: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 30%;
    padding: 15px;
  `,
  ShareButton: styled.button`
    display: flex;
    align-items: center;
    border-radius: 4px;
    background-color: transparent;
    text-align: center;
    font-size: ${({ theme }) => theme.font.size.body3};
    font-family: ${({ theme }) => theme.font.family.body3};
    line-height: ${({ theme }) => theme.font.lineheight.body3};
    color: ${({ theme }) => theme.color.dark};

    & > svg {
      width: 25px;
      margin: 0 8px 0 0;
      filter: ${({ theme }) => theme.color.darkFilter};
    }
  `,
  AnalyzeButton: styled.button`
    display: flex;
    align-items: center;
    border-radius: 4px;
    background-color: transparent;
    text-align: center;
    font-size: ${({ theme }) => theme.font.size.body3};
    font-family: ${({ theme }) => theme.font.family.body3};
    line-height: ${({ theme }) => theme.font.lineheight.body3};
    color: ${({ theme }) => theme.color.dark};

    & > svg {
      width: 25px;
      margin: 0 8px 0 0;
      filter: ${({ theme }) => theme.color.darkFilter};
    }
  `,
  DownloadButton: styled.a`
    display: flex;
    align-items: center;
    border-radius: 4px;
    background-color: transparent;
    text-align: center;
    font-size: ${({ theme }) => theme.font.size.body3};
    font-family: ${({ theme }) => theme.font.family.body3};
    line-height: ${({ theme }) => theme.font.lineheight.body3};
    color: ${({ theme }) => theme.color.dark};

    & > svg {
      width: 25px;
      margin: 0 8px 0 0;
      filter: ${({ theme }) => theme.color.darkFilter};
    }
  `,
};
