import { useRef, useEffect } from 'react';
import styled from 'styled-components';

import { GeoLocationType } from 'types';

interface Location {
  lat: number;
  lng: number;
}

interface MapProps {
  modalOn: boolean;
}

interface Props {
  location: GeoLocationType;
}

const PloggingStartMap = ({ location }: Props) => {
  const mapRef = useRef(null);

  const initMap = (location: Location) => {
    const { Tmapv3 } = window;
    const map = new Tmapv3.Map(mapRef.current!, {
      center: new Tmapv3.LatLng(location.lat + 0.0008, location.lng),
      width: '100%',
      height: '100%',
      zoom: 17,
    });

    new Tmapv3.Marker({
      position: new Tmapv3.LatLng(location.lat, location.lng),
      map: map,
    });
  };

  useEffect(() => {
    if (!(mapRef.current! as HTMLElement).firstChild && location.loaded) {
      initMap({
        lat: location.coordinates!.lat,
        lng: location.coordinates!.lng,
      });
    }
  }, [location]);

  return (
    <S.Wrap>
      <S.Map ref={mapRef} modalOn={true}></S.Map>
    </S.Wrap>
  );
};

export default PloggingStartMap;

const S = {
  Wrap: styled.div`
    width: 100%;
    height: 100%;
  `,
  Map: styled.div<MapProps>`
    width: 100%;
    height: 100%;
    pointer-events: ${({ modalOn }) => (modalOn ? 'none' : 'auto')};
  `,
};
