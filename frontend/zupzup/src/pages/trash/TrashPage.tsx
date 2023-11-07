import { loadGraphModel } from '@tensorflow/tfjs';
import { Console } from 'console';
import { useState, useEffect } from 'react';
import { GraphModel } from '@tensorflow/tfjs-converter';
import CONSOLE from 'utils/ColorConsoles';
import { io } from '@tensorflow/tfjs-core';

const TrashPage = () => {
  const INDEXED_DB_NAME = 'indexeddb://tf-model';
  const MODEL_URI = '/model/model.json';
  const MODEL_NAME_MAP_URI = '/model/name_map.json';

  // const [tsInstance, setTsInstance] = useState();
  const [model, setModel] = useState<GraphModel<string | io.IOHandler> | null>(
    null,
  );
  const [nameMap, setNameMap] = useState(null);
  const [isLoaded, setIsLoaded] = useState<Boolean>(false);

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
    }

    CONSOLE.useEffectIn('Trash init');
    load();
  }, []);

  useEffect(() => {
    CONSOLE.useEffectIn('model & nameMap');
    if (model && nameMap) {
      CONSOLE.info('model & nameMap all loaded');
      setIsLoaded(true);
    }
  }, [model, nameMap]);

  return (
    <div>
      <h1>TrashPage 입니다.</h1>
    </div>
  );
};

export default TrashPage;
