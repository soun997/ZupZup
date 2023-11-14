import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import {
  ExitModal,
  OnPloggingHeader,
  PloggingMap,
  OnPloggingBackground,
  PloggingInfo,
  Camera,
} from 'components';

import {
  useGeolocation,
  useStopWatch,
  useDistance,
  calculateCalories,
  useAppDispatch,
  useHistory,
  store,
} from 'hooks';
import * as utils from 'utils';

import { PloggingApis, TrashApis } from 'api';
import { TrashInfo } from 'types';
import { format } from 'date-fns';
import {
  setCalories,
  setDistance,
  setEndDateTime,
  setTime,
} from 'hooks/store/usePlogging';

const OnPlogging = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useGeolocation();
  const stopwatch = useStopWatch();
  const [exitOn, setExitOn] = useState<boolean>(false);
  const [ploggingInfoOn, setPloggingInfoOn] = useState<boolean>(true);
  const [cameraOn, setCameraOn] = useState<boolean>(false);
  const [trashOn, setTrashOn] = useState<boolean>(false);
  const [totalDistance, setTotalDistance] = useState<number>(0.0);
  const [onCalories, setCalorie] = useState<number>(0);
  const [fixCenter, setFixCenter] = useState<boolean>(false);
  const [locationLoading, setLocationLoading] = useState<boolean>(false);

  const [trashs, setTrashs] = useState<Array<TrashInfo>>([]);

  const exitPlogging = async () => {
    dispatch(setEndDateTime(format(new Date(), "yyyy-MM-dd'T'HH:mm:ss")));
    dispatch(setCalories(onCalories));
    dispatch(setDistance(totalDistance));
    dispatch(setTime(stopwatch));

    await PloggingApis.stopPlogging();
    navigate(utils.URL.PLOGGING.REPORT);
  };

  const getTrashInfo = async (trashStatus: boolean) => {
    const centerLat: number | null = store.getState().map.centerLat;
    const centerLng: number | null = store.getState().map.centerLng;
    if (!centerLat || !centerLng) {
      return;
    }

    if (trashStatus && location.loaded) {
      const trashcanRequest = {
        currentLatitude: centerLat,
        currentLongitude: centerLng,
      };

      try {
        const response = await TrashApis.getTrashCans(trashcanRequest);
        setTrashs(response.data.results);
        console.log(response.data.results);
        setTrashOn(trashStatus);
      } catch (err) {
        console.log(err);
      }
    } else {
      setTrashOn(trashStatus);
    }
  };

  const refreshTrashInfo = () => {
    getTrashInfo(false);
    getTrashInfo(true);
  };

  useEffect(() => {
    const listenBackEvent = () => {
      if (
        confirm('페이지를 나가면 플로깅이 종료됩니다. 정말 종료하시겠습니까?')
      ) {
        exitPlogging();
      } else {
        useHistory.push(utils.URL.PLOGGING.ON);
      }
    };

    const unlistenHistoryEvent = useHistory.listen(({ action }) => {
      if (action === 'POP') {
        listenBackEvent();
      }
    });

    return unlistenHistoryEvent;
  });

  useEffect(() => {
    const recordLocation = () => {
      if (!location.loaded) {
        return;
      }

      setLocationLoading(true);
      const lat = location.coordinates!.lat;
      const lng = location.coordinates!.lng;

      const maxLatitude = JSON.parse(
        localStorage.getItem(utils.COORDINATE.MAX_LATITUDE) as string,
      );
      localStorage.setItem(
        utils.COORDINATE.MAX_LATITUDE,
        JSON.stringify(Math.max(maxLatitude, lat)),
      );
      const minLatitude = JSON.parse(
        localStorage.getItem(utils.COORDINATE.MIN_LATITUDE) as string,
      );
      localStorage.setItem(
        utils.COORDINATE.MIN_LATITUDE,
        JSON.stringify(
          Math.min(minLatitude ? minLatitude : Number.MAX_VALUE, lat),
        ),
      );
      const maxLongitude = JSON.parse(
        localStorage.getItem(utils.COORDINATE.MAX_LONGITUDE) as string,
      );
      localStorage.setItem(
        utils.COORDINATE.MAX_LONGITUDE,
        JSON.stringify(Math.max(maxLongitude, lng)),
      );
      const minLongitude = JSON.parse(
        localStorage.getItem(utils.COORDINATE.MIN_LONGITUDE) as string,
      );
      localStorage.setItem(
        utils.COORDINATE.MIN_LONGITUDE,
        JSON.stringify(
          Math.min(minLongitude ? minLongitude : Number.MAX_VALUE, lng),
        ),
      );

      const locations = JSON.parse(
        localStorage.getItem(utils.COORDINATE.LOCATIONS_KEY) as string,
      );
      if (!locations) {
        localStorage.setItem(
          utils.COORDINATE.LOCATIONS_KEY,
          JSON.stringify([{ lat, lng }]),
        );
        return;
      }

      const distance = useDistance.fromLocation({
        prevLat: locations[locations.length - 1].lat,
        prevLng: locations[locations.length - 1].lng,
        curLat: lat,
        curLng: lng,
      });

      if (distance >= 1) {
        setTotalDistance(totalDistance => totalDistance + distance);

        const calorie = calculateCalories(stopwatch, totalDistance + distance);
        setCalorie(calorie);
        locations.push({ lat, lng });
        localStorage.setItem(
          utils.COORDINATE.LOCATIONS_KEY,
          JSON.stringify(locations),
        );
      }
    };

    recordLocation();
  }, [location, stopwatch]);

  return (
    <S.Wrap>
      {exitOn && (
        <ExitModal setExitOn={setExitOn} exitPlogging={exitPlogging} />
      )}
      {cameraOn && <Camera setCameraOn={setCameraOn} />}
      <OnPloggingHeader exitOn={exitOn} setExitOn={setExitOn} />
      {ploggingInfoOn && (
        <PloggingInfo
          time={stopwatch}
          distance={totalDistance}
          calorie={onCalories}
          exitOn={exitOn}
          setExitOn={setExitOn}
          setPloggingInfoOn={setPloggingInfoOn}
          setCameraOn={setCameraOn}
        />
      )}
      <OnPloggingBackground
        exitOn={exitOn}
        ploggingInfoOn={ploggingInfoOn}
        setPloggingInfoOn={setPloggingInfoOn}
        cameraOn={cameraOn}
        setCameraOn={setCameraOn}
        trashOn={trashOn}
        getTrashInfo={getTrashInfo}
        fixCenter={fixCenter}
        setFixCenter={setFixCenter}
        refreshTrashInfo={refreshTrashInfo}
      />
      {}
      <PloggingMap
        exitOn={exitOn}
        ploggingInfoOn={ploggingInfoOn}
        cameraOn={cameraOn}
        location={{
          lat: location.coordinates!.lat,
          lng: location.coordinates!.lng,
        }}
        locationLoading={locationLoading}
        fixCenter={fixCenter}
        setFixCenter={setFixCenter}
        trashs={trashs}
        trashOn={trashOn}
      />
    </S.Wrap>
  );
};

export default OnPlogging;

const S = {
  Wrap: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100dvh;
    background-color: ${({ theme }) => theme.color.background};
  `,
};
