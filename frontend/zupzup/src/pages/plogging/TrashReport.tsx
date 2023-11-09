import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoinReport, ConfirmButton, TopNavigation } from 'components';
import * as utils from 'utils';
import { TrashAnalyzeReport } from 'types/Trash';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
  setGatheredTrash,
  setCoin,
  setTrashDetail,
} from 'hooks/store/usePlogging';
import CONSOLE from 'utils/ColorConsoles';

interface Prop {
  trashReport: TrashAnalyzeReport;
}

const MODEL_NAME_MAP_URI = '/model/name_map.json';
const TRASH_IMAGE_ID = 'trash';

const TrashReport = ({ trashReport }: Prop) => {
  CONSOLE.reRender('TrashReport rendered!!');
  console.log(trashReport);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const trashAnalyzeCanvasRef =
    useRef() as React.MutableRefObject<HTMLCanvasElement>;
  const [nameMap, setNameMap] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState<Boolean>();

  useEffect(() => {
    async function load() {
      CONSOLE.info('[TrashReport load] 1. load name map');
      const nameMap = await fetch(MODEL_NAME_MAP_URI)
        .then(response => response.json())
        .catch(error => {
          console.log(error);
        });
      CONSOLE.ok('[TrashReport load] 1. load name map complete');
      console.log(nameMap);

      CONSOLE.info('[TrashReport load] 2. read image');
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

      const context = trashAnalyzeCanvasRef.current?.getContext('2d');
      image.onload = () => {
        CONSOLE.info('image loaded');
        context?.drawImage(image, 0, 0, 300, 250);
        image.id = TRASH_IMAGE_ID;
      };

      setNameMap(nameMap);
    }
    load();
  }, []);

  useEffect(() => {
    CONSOLE.useEffectIn('nameMap');
    if (nameMap && isImageLoaded) {
      const boxes = trashReport.classifyDetail.boxes;
      const classes = trashReport.classifyDetail.classes;
      const scores = trashReport.classifyDetail.scores;
      const validDetection = trashReport.classifyDetail.validDetection;
      const canvas = trashAnalyzeCanvasRef.current;
      const context = canvas.getContext('2d');
      context!.strokeStyle = 'yellow';
      context!.font = '20px Arial';
      context!.fillStyle = 'white';
      for (let i = 0; i < validDetection; ++i) {
        let [x1, y1, x2, y2] = boxes.slice(i * 4, (i + 1) * 4);
        x1 *= canvas.width;
        x2 *= canvas.width;
        y1 *= canvas.height;
        y2 *= canvas.height;
        const score = scores[i].toFixed(2);
        const label = nameMap![classes[i]];
        context?.strokeRect(x1, y1, x2 - x1, y2 - y1);

        context?.fillText(label, x1, y1);

        console.info(`${i} - label : ${label} (score ${score})`);
      }
      saveTrashReport();
    }

    // const trashDetail = useAppSelector(state => state.plogging.trashDetail);
    // console.log(trashDetail);
  }, [nameMap, isImageLoaded]);

  function saveTrashReport() {
    dispatch(setGatheredTrash(trashReport.gatheredTrash));
    dispatch(setCoin(trashReport.totalCoin));
    dispatch(setTrashDetail(trashReport.trashDetail));
  }

  return (
    <S.Wrap>
      <TopNavigation />
      <S.Content>
        <S.TitleFrame>
          <S.MainTitle>쓰레기 이미지 분석 결과입니다</S.MainTitle>
          <S.SubTitle>인식이 안되었을 경우 재촬영 해주세요</S.SubTitle>
        </S.TitleFrame>
        <S.Canvas ref={trashAnalyzeCanvasRef} />
        <CoinReport
          trashDetail={trashReport.trashDetail}
          totalCoin={trashReport.totalCoin}
        ></CoinReport>
      </S.Content>
      <S.BottomFrame>
        <ConfirmButton
          text="플로깅으로 돌아가기"
          onClick={() => navigate(utils.URL.PLOGGING.ON)}
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
  Canvas: styled.canvas`
    width: 100%;
    height: 70%;
    margin-top: 44px;
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
};
export default TrashReport;
