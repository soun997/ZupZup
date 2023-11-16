import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import { CaptureResult } from 'components';

import XSvg from 'assets/icons/x.svg?react';
import TrashPage from 'pages/trash/TrashPage';
import { TrashAnalyzeReport } from 'types/Trash';
import { TrashReport } from 'pages';

interface Props {
  setCameraOn: (cameraOn: boolean) => void;
}

const Camera = ({ setCameraOn }: Props) => {
  const cameraRef = useRef<HTMLVideoElement>(null);
  const [capture, setCapture] = useState<boolean>(false);
  const hasUserRequestAnalyzeState = useState<boolean>(false);
  const [hasUserRequestAnalyze, setHasUserRequestAnalyze] =
    hasUserRequestAnalyzeState;
  const captureFileState = useState<File>();
  const [captureFile] = captureFileState;
  const analyzeInfoState = useState<TrashAnalyzeReport>();
  const [analyzeInfo] = analyzeInfoState;
  const [isTrashReportPrepared, setIsTrashReportPrepared] = useState<boolean>();
  const [isProcessingComplete, setIsProcessingComplete] = useState<boolean>();
  const [accessableCamera, setAccessableCamera] = useState<boolean>(true);

  const disableCamera = () => {
    if (cameraRef.current) {
      const stream = cameraRef.current!.srcObject as MediaStream;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => {
          track.stop();
        });
      }
    }
    if (accessableCamera) {
      (cameraRef.current as HTMLVideoElement).disablePictureInPicture = true;
    }
  };

  useEffect(() => {
    const enableCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
          },
        });
        if (cameraRef.current) {
          cameraRef.current!.srcObject = stream;
        }
        setAccessableCamera(true);
      } catch (error) {
        //console.log('camera access error : ', error);
        setAccessableCamera(false);
      }
    };

    enableCamera();

    return () => {
      if (cameraRef.current) {
        const stream = cameraRef.current!.srcObject as MediaStream;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => {
            track.stop();
          });
        }
      }
    };
  }, []);

  useEffect(() => {
    if (captureFile && !capture) {
      setHasUserRequestAnalyze(true);
    }
  }, [capture]);

  useEffect(() => {
    if (isProcessingComplete && analyzeInfo) {
      setHasUserRequestAnalyze(false);
      setIsTrashReportPrepared(true);
    }
  }, [isProcessingComplete, analyzeInfo]);

  return (
    <S.Wrap>
      {capture && (
        <CaptureResult
          cameraRef={cameraRef}
          setCapture={setCapture}
          captureFileState={captureFileState}
        />
      )}
      {hasUserRequestAnalyze && (
        <TrashPage
          captureFile={captureFile}
          setHasUserRequestAnalyze={setHasUserRequestAnalyze}
          analyzeInfoState={analyzeInfoState}
          setIsProcessingComplete={setIsProcessingComplete}
        />
      )}
      {isTrashReportPrepared && (
        <TrashReport
          trashReport={analyzeInfo as TrashAnalyzeReport}
          setCameraOn={setCameraOn}
        />
      )}
      <S.Header>
        <S.CancelButton
          onClick={() => {
            disableCamera();
            setCameraOn(false);
          }}
        >
          <XSvg />
        </S.CancelButton>
      </S.Header>
      {accessableCamera ? (
        <>
          <S.CameraBox ref={cameraRef} autoPlay playsInline height="100%" />
          <S.UserAccess>
            <S.CaptureButton onClick={() => setCapture(true)}></S.CaptureButton>
          </S.UserAccess>
        </>
      ) : (
        <S.CameraAccessInfo>
          <S.CameraAccessInfoImage
            src={`${import.meta.env.VITE_S3_URL}/character/no-result.png`}
          />
          <S.CameraAccessInfoComment>
            <S.CameraAccessTitle>
              카메라 권한을 허용해주세요
            </S.CameraAccessTitle>
            <S.CameraAccessDescList>
              <S.CameraAccessType>
                안드로이드
                <S.CameraAccessDesc>
                  : 앱 아이콘을 꾹 누른 뒤 사이트 설정에서 카메라 허용을
                  체크해주세요!
                </S.CameraAccessDesc>
              </S.CameraAccessType>

              <S.CameraAccessType>
                IOS
                <S.CameraAccessDesc>
                  : 앱 재시작 후 카메라 기능을 다시 실행하면 카메라 접근 권한
                  요청이 옵니다. 꼭 허용을 눌러주세요!
                </S.CameraAccessDesc>
              </S.CameraAccessType>
            </S.CameraAccessDescList>
          </S.CameraAccessInfoComment>
        </S.CameraAccessInfo>
      )}
    </S.Wrap>
  );
};

export default Camera;

const S = {
  Wrap: styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    background-color: ${({ theme }) => theme.color.background};
    z-index: 400;
  `,
  Header: styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 15px;
  `,
  CancelButton: styled.button`
    background-color: transparent;
    font-size: ${({ theme }) => theme.font.size.focus3};
    font-family: ${({ theme }) => theme.font.family.focus3};
    line-height: ${({ theme }) => theme.font.lineheight.focus3};
    & > svg {
      width: 20px;
      height: 20px;
      filter: ${({ theme }) => theme.color.darkFilter};
    }
  `,
  CameraBox: styled.video`
    flex-grow: 1;
    width: 100%;
    object-fit: cover;
  `,
  UserAccess: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 200px;
    padding: 20px 0;
  `,
  CaptureButton: styled.button`
    width: 70px;
    height: 70px;
    border-radius: 35px;
    background-color: ${({ theme }) => theme.color.white};
    border: 4px solid ${({ theme }) => theme.color.gray5};
    box-shadow: 0px 0px 10px 1px #3333;

    &:active {
      box-shadow: 0px 0px 4px 1px #3333;
    }
  `,
  CameraAccessInfo: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  `,
  CameraAccessInfoImage: styled.img`
    width: 60%;
  `,
  CameraAccessInfoComment: styled.div`
    font-size: ${({ theme }) => theme.font.size.body3};
    font-family: ${({ theme }) => theme.font.family.focus2};
    line-height: ${({ theme }) => theme.font.lineheight.body2};
    color: ${({ theme }) => theme.color.dark};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `,
  SettingsButton: styled.button`
    width: 100px;
    height: 30px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.color.main};
    background-color: transparent;
    color: ${({ theme }) => theme.color.main};

    margin: 10px 0 0;

    &:active {
      background-color: ${({ theme }) => theme.color.main};
      color: ${({ theme }) => theme.color.white};
    }
  `,
  CameraAccessTitle: styled.div`
    font-size: ${({ theme }) => theme.font.size.body2};
    font-family: ${({ theme }) => theme.font.family.focus2};
    line-height: ${({ theme }) => theme.font.lineheight.body2};
    color: ${({ theme }) => theme.color.dark};
    margin-bottom: 10px;
  `,

  CameraAccessDescList: styled.div`
    /* display: grid; */
    /* grid-template-columns: 1fr 4fr; */
    text-align: left;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  CameraAccessDesc: styled.div`
    font-size: ${({ theme }) => theme.font.size.body3};
    font-family: ${({ theme }) => theme.font.family.body2};
    line-height: ${({ theme }) => theme.font.lineheight.body2};
    color: ${({ theme }) => theme.color.dark};
  `,
  CameraAccessType: styled.div`
    font-size: ${({ theme }) => theme.font.size.body3};
    font-family: ${({ theme }) => theme.font.family.focus2};
    line-height: ${({ theme }) => theme.font.lineheight.body2};
    color: ${({ theme }) => theme.color.dark};
    margin-bottom: 10px;
  `,
};
