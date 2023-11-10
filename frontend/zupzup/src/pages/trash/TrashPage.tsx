import {
  loadGraphModel,
  image as imgts,
  browser,
  tidy,
  Tensor,
  dispose,
} from '@tensorflow/tfjs';
import { useState, useEffect } from 'react';
import { GraphModel } from '@tensorflow/tfjs-converter';
import CONSOLE from 'utils/ColorConsoles';
import { io } from '@tensorflow/tfjs-core';
import styled from 'styled-components';
import { Loading } from 'pages';
import { TrashDetail } from 'types/Trash';
import { TrashAnalyzeReport, TrashTypeTable } from 'types/Trash';

interface Props {
  captureFile: File | undefined;
  setHasUserRequestAnalyze: (hasUserRequestAnalyze: boolean) => void;
  analyzeInfoState: [
    TrashAnalyzeReport | undefined,
    React.Dispatch<React.SetStateAction<TrashAnalyzeReport | undefined>>,
  ];
  setIsProcessingComplete: (setIsProcessingComplete: boolean) => void;
}

interface AnalyzeResult {
  gatheredTrash: number;
  totalCoin: number;
  trashDetail: TrashDetail | undefined;
}

const TrashPage = ({
  captureFile,
  analyzeInfoState,
  setIsProcessingComplete,
}: Props) => {
  const INDEXED_DB_NAME = 'indexeddb://tf-model';
  const MODEL_URI = '/model/model.json';
  const MODEL_NAME_MAP_URI = '/model/name_map.json';
  const TRASH_TYPE_TABLE_URI = '/classify/trash_classification.json';
  const TRASH_IMAGE_ID = 'trash';

  const [model, setModel] = useState<GraphModel<string | io.IOHandler> | null>(
    null,
  );
  const [nameMap, setNameMap] = useState(null);
  const [isLoaded, setIsLoaded] = useState<Boolean>(false);
  const [trashImg, setTrashImg] = useState<HTMLImageElement>(new Image());
  const [trashTypeTable, setTrashTypeTable] = useState<TrashTypeTable>();

  const [_, setAnaylzeInfo] = analyzeInfoState;

  function loadImage() {
    const image = new Image();
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.result) {
        image.src = fileReader.result as string;
      } else {
        CONSOLE.error('캡처 파일 읽기 실패...');
      }
    };

    fileReader.readAsDataURL(captureFile as File);

    image.onload = () => {
      image.id = TRASH_IMAGE_ID;
      setTrashImg(image);
    };
  }

  // 기존 trash-ai 함수의 load 기능
  // model과 nameMap을 indexedDB에 load 한다.
  useEffect(() => {
    async function load() {
      CONSOLE.info('[ts load] 1. load name map');
      const nameMap = await fetch(MODEL_NAME_MAP_URI)
        .then(response => response.json())
        .catch(error => {
          console.log(error);
        });
      CONSOLE.ok('[ts load] 1. load name map complete');
      CONSOLE.info('[ts load] 2. load model');
      let model;
      try {
        model = await loadGraphModel(INDEXED_DB_NAME);
        CONSOLE.ok('[ts load] 2. load model from indexedDB complete');
      } catch (error) {
        CONSOLE.error('[ts load] 2. no model found from indexedDB');
        model = await loadGraphModel(MODEL_URI);
        CONSOLE.ok('[ts load] 2. load model from file complete');
        model.save(INDEXED_DB_NAME); // save to indexedDB (비동기)
      }

      CONSOLE.info('[ts load] 3. load trashTypeTable');
      const trashTypeTableFromJson = await fetch(TRASH_TYPE_TABLE_URI)
        .then(response => response.json())
        .catch(error => {
          console.log(error);
        });
      CONSOLE.ok('[ts load] 3. load trashTypeTable complete');

      setModel(model);
      setNameMap(nameMap);
      setTrashTypeTable(trashTypeTableFromJson);
    }

    loadImage();
    load();
  }, []);

  useEffect(() => {
    if (model && nameMap && trashImg.id === TRASH_IMAGE_ID) {
      setIsLoaded(true);
    }
  }, [model, nameMap, trashImg]);

  useEffect(() => {
    async function processTrashImage() {
      const [modelWidth, modelHeight] = model!.inputs![0].shape!.slice(1, 3);
      const input = tidy(() => {
        return imgts
          .resizeBilinear(browser.fromPixels(trashImg), [
            modelWidth,
            modelHeight,
          ])
          .div(255.0)
          .expandDims(0);
      });

      const res: Tensor[] = (await model!.executeAsync(input)) as Tensor[];
      const [boxes, scores, classes, valid_detections] = res;
      const boxes_data = boxes.dataSync();
      const scores_data = scores.dataSync();
      const classes_data = classes.dataSync();
      const valid_detections_data = valid_detections.dataSync()[0];

      dispose(res);

      const result = processAnalyzeResult(classes_data);

      // TODO : 분석 데이터 마저 저장하기
      setAnaylzeInfo(prevState => {
        return {
          ...prevState,
          ...result,
          image: captureFile,
          classifyDetail: {
            boxes: boxes_data,
            scores: scores_data,
            classes: classes_data,
            validDetection: valid_detections_data,
          },
        } as TrashAnalyzeReport;
      });
    }
    if (isLoaded && trashTypeTable) {
      processTrashImage();
      setIsProcessingComplete(true);
    }
  }, [isLoaded]);

  function processAnalyzeResult(
    classData: Float32Array | Int32Array | Uint8Array,
  ) {
    let trashDetail: TrashDetail = {
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
    const result: AnalyzeResult = {
      gatheredTrash: 0,
      totalCoin: 0,
      trashDetail: trashDetail,
    };

    for (let i = 0; i < classData.length; i++) {
      if (classData[i] === -1) {
        break;
      }

      const type = trashTypeTable![classData[i]]['class-eng'];
      result.trashDetail![type]++;
      result.totalCoin += trashTypeTable![classData[i]].coin;
      result.gatheredTrash++;
    }

    return result;
  }

  return (
    <S.Wrap>
      <Loading />
    </S.Wrap>
  );
};

const S = {
  TrashImage: styled.div`
    width: 800px;
    height: 600px;
  `,
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
};

export default TrashPage;
