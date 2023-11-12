import styled from 'styled-components';

import {
  PloggingStartBackground,
  PloggingStartMap,
  Navigation,
} from 'components';
import { useGeolocation } from 'hooks';

const PloggingStart = () => {
  const location = useGeolocation();

  return (
    <S.Wrap>
      <PloggingStartBackground />
      {location.loaded && (
        <PloggingStartMap
          location={{
            lat: location.coordinates!.lat,
            lng: location.coordinates!.lng,
          }}
        />
      )}
      <Navigation />
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
