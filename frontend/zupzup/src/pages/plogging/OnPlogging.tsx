import { useEffect, useState } from 'react';
import styled from 'styled-components';

import {
  ExitModal,
  OnPloggingHeader,
  PloggingMap,
  OnPloggingBackground,
  PloggingInfo,
  Camera,
} from 'components';

import { useGeolocation, useStopWatch, useDistance } from 'hooks';

const OnPlogging = () => {
  const location = useGeolocation();
  const stopwatch = useStopWatch();
  const [exitOn, setExitOn] = useState<boolean>(false);
  const [ploggingInfoOn, setPloggingInfoOn] = useState<boolean>(false);
  const [cameraOn, setCameraOn] = useState<boolean>(false);
  const [totalDistance, setTotalDistance] = useState<number>(0.0);
  const [fixCenter, setFixCenter] = useState<boolean>(false);
  const LOCATIONS_KEY = 'locations';

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
      {exitOn && <ExitModal setExitOn={setExitOn} />}
      {cameraOn && <Camera setCameraOn={setCameraOn} />}
      <OnPloggingHeader exitOn={exitOn} setExitOn={setExitOn} />
      {ploggingInfoOn && (
        <PloggingInfo
          time={stopwatch}
          distance={totalDistance}
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
