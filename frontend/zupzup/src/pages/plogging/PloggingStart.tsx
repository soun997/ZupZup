import { useState, useEffect } from 'react';
import styled from 'styled-components';

import {
  PloggingStartBackground,
  PloggingStartMap,
  Navigation,
} from 'components';
import { useGeolocation } from 'hooks';

const PloggingStart = () => {
  const location = useGeolocation();
  const [locationLoading, setLocationLoading] = useState<boolean>(false);

  useEffect(() => {
    if (location.loaded) {
      setLocationLoading(true);
    }
  }, [location]);

  return (
    <S.Wrap>
      <PloggingStartBackground />
      <PloggingStartMap
        location={{
          lat: location.coordinates!.lat,
          lng: location.coordinates!.lng,
        }}
        locationLoading={locationLoading}
      />
      <Navigation currentPage="main" />
    </S.Wrap>
  );
};

export default PloggingStart;

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
