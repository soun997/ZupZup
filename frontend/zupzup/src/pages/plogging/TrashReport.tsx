import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { CoinReport, ConfirmButton } from 'components';
import { TrashAnalyzeReport } from 'types/Trash';
import { useAppDispatch } from 'hooks';
import {
  setGatheredTrash,
  setCoin,
  setTrashDetail,
} from 'hooks/store/usePlogging';
import AngleLeftSvg from 'assets/icons/angle-left.svg?react';
import { store } from 'hooks';
import { TrashDetail, TrashTypeTable } from 'types/Trash';
import CONSOLE from 'utils/ColorConsoles';

interface Prop {
  trashReport: TrashAnalyzeReport;
  setCameraOn: (cameraOn: boolean) => void;
}

const MODEL_NAME_MAP_URI = '/model/name_map.json';
const TRASH_TYPE_TABLE_URI = '/classify/trash_classification.json';
const TRASH_IMAGE_ID = 'trash';

const CANVAS_SETTING = {
  imageRate: 0.8,
  rectColor: 'magenta',
  textColor: 'magenta',
  textFont: 'AppleSDGothicNeoB',
  textFontSize: 15,
};

const TrashReport = ({ trashReport, setCameraOn }: Prop) => {
  const dispatch = useAppDispatch();
  const trashAnalyzeCanvasRef =
    useRef() as React.MutableRefObject<HTMLCanvasElement>;
  const [nameMap, setNameMap] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState<Boolean>();
  const [trashTypeTable, setTrashTypeTable] = useState<TrashTypeTable>();

  const savedPloggingRecord = store.getState().plogging;
  useEffect(() => {
    async function load() {
      const nameMap = await fetch(MODEL_NAME_MAP_URI)
        .then(response => response.json())
        .catch(error => {
          console.log(error);
        });

      const trashTypeTableFromJson = await fetch(TRASH_TYPE_TABLE_URI)
        .then(response => response.json())
        .catch(error => {
          console.log(error);
        });

      CONSOLE.info('[TrashReport load] read image');
      const image = new Image();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.result) {
          image.src = fileReader.result as string;
          setIsImageLoaded(true);
        } else {
          CONSOLE.error('캡처 파일 읽기 실패...');
        }
      };

      fileReader.readAsDataURL(trashReport.image as File);

      const canvas = trashAnalyzeCanvasRef.current;
      const context = canvas?.getContext('2d');
      image.onload = () => {
        CONSOLE.info('image loaded');
        context?.drawImage(
          image,
          (canvas.width * (1 - CANVAS_SETTING.imageRate)) / 2,
          (canvas.height * (1 - CANVAS_SETTING.imageRate)) / 2,
          canvas.width * CANVAS_SETTING.imageRate,
          canvas.height * CANVAS_SETTING.imageRate,
        );
        image.id = TRASH_IMAGE_ID;
      };

      setNameMap(nameMap);
      setTrashTypeTable(trashTypeTableFromJson);
    }
    load();
  }, []);

  useEffect(() => {
    if (nameMap && trashTypeTable && isImageLoaded) {
      const boxes = trashReport.classifyDetail.boxes;
      const classes = trashReport.classifyDetail.classes;
      const scores = trashReport.classifyDetail.scores;
      const validDetection = trashReport.classifyDetail.validDetection;
      const canvas = trashAnalyzeCanvasRef.current;
      const context = canvas.getContext('2d');
      context!.strokeStyle = CANVAS_SETTING.rectColor;
      context!.font = `${CANVAS_SETTING.textFontSize}px ${CANVAS_SETTING.textFont}`;
      context!.fillStyle = CANVAS_SETTING.textColor;
      for (let i = 0; i < validDetection + 1; ++i) {
        if (i === validDetection) {
          context?.strokeRect(0, 0, 0, 0);
          break;
        }
        let [x1, y1, x2, y2] = boxes.slice(i * 4, (i + 1) * 4);
        x1 *= canvas.width;
        x2 *= canvas.width;
        y1 *= canvas.height;
        y2 *= canvas.height;
        const rate = CANVAS_SETTING.imageRate;
        const offsetX = canvas.width * ((1 - rate) / 2);
        const offsetY = canvas.height * ((1 - rate) / 2);
        const [convertedX1, convertedY1] = convertCoordinate(
          x1,
          y1,
          rate,
          offsetX,
          offsetY,
        );
        const [convertedX2, convertedY2] = convertCoordinate(
          x2,
          y2,
          rate,
          offsetX,
          offsetY,
        );
        const score = scores[i].toFixed(2);
        const label = trashTypeTable[classes[i]].class;
        context?.strokeRect(
          convertedX1,
          convertedY1,
          convertedX2 - convertedX1,
          convertedY2 - convertedY1,
        );

        context?.fillText(label, convertedX1, convertedY1);

        console.info(`${i} - label : ${label} (score ${score})`);
      }
      saveTrashReport();
    }
    
  }, [nameMap, trashTypeTable, isImageLoaded]);

  function convertCoordinate(
    x: number,
    y: number,
    rate: number,
    offsetX: number,
    offsetY: number,
  ): number[] {
    const coorX = x * rate + offsetX;
    const coorY = y * rate + offsetY;
    return [coorX, coorY];
  }

  function saveTrashReport() {
    dispatch(
      setGatheredTrash(
        savedPloggingRecord.gatheredTrash + trashReport.gatheredTrash,
      ),
    );
    dispatch(setCoin(savedPloggingRecord.coin + trashReport.totalCoin));
    dispatch(
      setTrashDetail(
        updateTrashDetail(
          savedPloggingRecord.trashDetail,
          trashReport.trashDetail,
        ),
      ),
    );
  }

  function updateTrashDetail(
    savedTrashDetail: TrashDetail,
    newTrashDetail: TrashDetail,
  ): TrashDetail {
    let updatedTrashDetail: TrashDetail = {
      plastic: 0,
      cigarette: 0,
      can: 0,
      glass: 0,
      paper: 0,
      normal: 0,
      styrofoam: 0,
      metal: 0,
      clothes: 0,
      battery: 0,
      vinyl: 0,
      mixed: 0,
      food: 0,
      etc: 0,
    };
    Object.keys(updatedTrashDetail).forEach(key => {
      updatedTrashDetail[key] = savedTrashDetail[key] + newTrashDetail[key];
    });
    return updatedTrashDetail;
  }

  return (
    <S.Wrap>
      <S.Header>
        <S.PrevButton onClick={() => setCameraOn(false)}>
          <AngleLeftSvg />
        </S.PrevButton>
      </S.Header>
      <S.Content>
        <S.TitleFrame>
          <S.MainTitle>쓰레기 이미지 분석 결과입니다</S.MainTitle>
          <S.SubTitle>인식이 안되었을 경우 재촬영 해주세요</S.SubTitle>
        </S.TitleFrame>
        <S.CanvasContainer>
          <S.Canvas ref={trashAnalyzeCanvasRef} />
        </S.CanvasContainer>
        <CoinReport
          trashDetail={trashReport.trashDetail}
          totalCoin={trashReport.totalCoin}
        ></CoinReport>
      </S.Content>
      <S.BottomFrame>
        <ConfirmButton
          text="플로깅으로 돌아가기"
          onClick={() => setCameraOn(false)}
        />
      </S.BottomFrame>
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: ${({ theme }) => theme.color.background};
    z-index: 400;
  `,

  Content: styled.div`
    padding: 0 24px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  `,

  Image: styled.img`
    width: 100%;
    margin-top: 44px;
  `,
  CanvasContainer: styled.div`
    width: 100%;
    height: 70%;
    margin-top: 44px;
    overflow: visible;
  `,
  Canvas: styled.canvas`
    width: 100%;
    height: 100%;
  `,
  TitleFrame: styled.div`
    margin-top: 20px;
  `,
  MainTitle: styled.div`
    font-size: ${({ theme }) => theme.font.size.display1};
    font-family: ${({ theme }) => theme.font.family.display1};
    font-weight: ${({ theme }) => theme.font.weight.body2};
    line-height: ${({ theme }) => theme.font.lineheight.display1};
  `,
  SubTitle: styled.div`
    margin-top: 10px;
    color: ${({ theme }) => theme.color.gray2};
    font-size: ${({ theme }) => theme.font.size.body2};
    font-family: ${({ theme }) => theme.font.family.body2};
    font-weight: ${({ theme }) => theme.font.weight.body2};
    line-height: ${({ theme }) => theme.font.lineheight.body2};
  `,
  BottomFrame: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    bottom: 0;
    width: 100%;
    margin: auto 0 50px 0;
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
};
export default TrashReport;
