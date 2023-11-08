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
  store,
  calculateCalories,
} from 'hooks';
import * as utils from 'utils';
import { PloggingApis } from 'api';
import { PloggingLogRequest, TrashRequest } from 'types';
import { format } from 'date-fns';

const OnPlogging = () => {
  const navigate = useNavigate();
  const location = useGeolocation();
  const stopwatch = useStopWatch();
  const [exitOn, setExitOn] = useState<boolean>(false);
  const [ploggingInfoOn, setPloggingInfoOn] = useState<boolean>(false);
  const [cameraOn, setCameraOn] = useState<boolean>(false);
  const [totalDistance, setTotalDistance] = useState<number>(0.0);
  const [onCalories, setCalorie] = useState<number>(0);
  const [fixCenter, setFixCenter] = useState<boolean>(false);
  const LOCATIONS_KEY = 'locations';

  const exitPlogging = async () => {
    const ploggingData: PloggingLogRequest = {
      calories: onCalories,
      startDateTime: store.getState().plogging.startDateTime!,
      endDateTime: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
      distance: totalDistance,
      durationTime: stopwatch,
      coin: store.getState().plogging.coin,
      gatheredTrash: store.getState().plogging.gatheredTrash,
      routeImageUrl: 'assets/images/route.png',
    };

    const trashData: TrashRequest = store.getState().plogging.trashDetail;
    console.log(ploggingData, trashData);
    const response = await PloggingApis.postPloggingLog({
      ploggingLogRequest: ploggingData,
      trashRequest: trashData,
    });
    console.log(response);
    navigate(utils.URL.PLOGGING.REPORT);
  };

  useEffect(() => {
    const recordLocation = () => {
      if (!location.loaded) {
        return;
      }

      const lat = location.coordinates!.lat;
      const lng = location.coordinates!.lng;
      const locations = JSON.parse(
        localStorage.getItem(LOCATIONS_KEY) as string,
      );
      if (!locations) {
        localStorage.setItem(LOCATIONS_KEY, JSON.stringify([{ lat, lng }]));
        return;
      }

      const distance = useDistance.fromLocation({
        prevLat: locations[locations.length - 1].lat,
        prevLng: locations[locations.length - 1].lng,
        curLat: lat,
        curLng: lng,
      });

      if (distance >= 0.5) {
        setTotalDistance(totalDistance => totalDistance + distance);

        const calorie = calculateCalories();
        setCalorie(calorie);
        locations.push({ lat, lng });
        localStorage.setItem(LOCATIONS_KEY, JSON.stringify(locations));
      }
    };

    recordLocation();
  }, [location]);

  useEffect(() => {
    return () => {
      localStorage.removeItem(LOCATIONS_KEY);
      localStorage.clear();
    };
  }, []);

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
        fixCenter={fixCenter}
        setFixCenter={setFixCenter}
      />
      {}
      {location.loaded && (
        <PloggingMap
          exitOn={exitOn}
          ploggingInfoOn={ploggingInfoOn}
          cameraOn={cameraOn}
          location={{
            lat: location.coordinates!.lat,
            lng: location.coordinates!.lng,
          }}
          fixCenter={fixCenter}
          setFixCenter={setFixCenter}
        />
      )}
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
    height: 100vh;
    background-color: ${({ theme }) => theme.color.background};
  `,
};
