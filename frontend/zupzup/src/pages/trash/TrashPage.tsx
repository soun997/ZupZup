import {
  loadGraphModel,
  image as imgts,
  browser,
  tidy,
  Tensor,
  dispose,
} from '@tensorflow/tfjs';
import { Console } from 'console';
import { useState, useEffect, useRef } from 'react';
import { GraphModel } from '@tensorflow/tfjs-converter';
import CONSOLE from 'utils/ColorConsoles';
import { io } from '@tensorflow/tfjs-core';
import styled from 'styled-components';
import { CanvasElementContainer } from 'html2canvas/dist/types/dom/replaced-elements/canvas-element-container';

const TrashPage = () => {
  const INDEXED_DB_NAME = 'indexeddb://tf-model';
  const MODEL_URI = '/model/model.json';
  const MODEL_NAME_MAP_URI = '/model/name_map.json';
  const TRASH_IMAGE_ID = 'trash';

  // const [tsInstance, setTsInstance] = useState();
  const [model, setModel] = useState<GraphModel<string | io.IOHandler> | null>(
    null,
  );
  const [nameMap, setNameMap] = useState(null);
  const [isLoaded, setIsLoaded] = useState<Boolean>(false);
  const [trashImg, setTrashImg] = useState<HTMLImageElement>(new Image());
  const canvasRef = useRef() as React.MutableRefObject<HTMLCanvasElement>;

  function loadImage() {
    const image = new Image();
    image.src = '/public/sampleTrashImage/sample01.jpg';
    canvasRef.current.width = image.width;
    canvasRef.current.height = image.height;
    image.width = 800;
    image.height = 600;
    const context = canvasRef.current?.getContext('2d');

    image.onload = () => {
      context?.drawImage(image, 0, 0, 300, 250);
    };
    image.id = TRASH_IMAGE_ID;
    setTrashImg(image);
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
      console.log(nameMap);

      CONSOLE.info('[ts load] 2. load model');
      let model;
      try {
        model = await loadGraphModel(INDEXED_DB_NAME);
        CONSOLE.ok('[ts load] 2. load model from indexedDB complete');
      } catch (error) {
        CONSOLE.error('[ts load] 2. no model found from indexedDB');
        model = await loadGraphModel(MODEL_URI);
        CONSOLE.ok('[ts load] 2. load model from file complete');
        console.log(model);
        model.save(INDEXED_DB_NAME); // save to indexedDB
      }

      setModel(model);
      setNameMap(nameMap);
      loadImage();
    }

    CONSOLE.useEffectIn('Trash init');
    load();
  }, []);

  useEffect(() => {
    CONSOLE.useEffectIn('model & nameMap');
    if (model && nameMap && trashImg.id === TRASH_IMAGE_ID) {
      CONSOLE.info('model & nameMap & trashImg all loaded');
      setIsLoaded(true);
    }
  }, [model, nameMap]);

  useEffect(() => {
    async function processTrashImage() {
      CONSOLE.useEffectIn('isLoaded');
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

      console.info('Analyze Result');
      console.log('boxes', boxes_data);
      console.log('scores', scores_data);
      console.log('classes', classes_data);
      console.log('valid_detections', valid_detections_data);
      dispose(res);

      console.info('Classify Result');
      for (let i = 0; i < valid_detections_data; ++i) {
        // let [x1, y1, x2, y2] = boxes_data.slice(i * 4, (i + 1) * 4);
        // x1 *= canvas.width;
        // x2 *= canvas.width;
        // y1 *= canvas.height;
        // y2 *= canvas.height;
        const score = scores_data[i].toFixed(2);
        const label = nameMap![classes_data[i]];
        // const meta = new Rect({
        //   area: new Bound({ x1, y1, x2, y2 }),
        //   score,
        //   label,
        //   is_tf: true,
        // });
        // if (!meta.tooSmall()) {
        //   jarr.push(meta);
        // }
        console.info(`${i} - label : ${label} (score ${score})`);
      }
    }
    processTrashImage();
  }, [isLoaded]);

  return (
    <div>
      <h1>TrashPage 입니다.</h1>
      <S.TrashImage>
        <canvas ref={canvasRef} width="350" height="250"></canvas>
      </S.TrashImage>
    </div>
  );
};

const S = {
  TrashImage: styled.div`
    width: 800px;
    height: 600px;
  `,
};

export default TrashPage;
