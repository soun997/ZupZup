import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Marker, TMap } from 'types/tmapv3';

interface Location {
  lat: number;
  lng: number;
}

interface MapProps {
  $modalOn: boolean;
}

interface Props {
  location: Location;
  locationLoading: boolean;
}

const PloggingStartMap = ({ location, locationLoading }: Props) => {
  const mapRef = useRef(null);
  const [tmap, setTmap] = useState<TMap | null>(null);
  const [curMarker, setCurMarker] = useState<Marker | null>(null);

  const initMap = (location: Location) => {
    const { Tmapv3 } = window;
    const latlngBounds = new Tmapv3.LatLngBounds(
      new Tmapv3.LatLng(33.0, 124.5),
    );
    latlngBounds.extend(new Tmapv3.LatLng(38.9, 132.0));
    const map = new Tmapv3.Map(mapRef.current!, {
      bounds: latlngBounds,
      width: '100%',
      height: '100%',
    });

    const marker = new Tmapv3.Marker({
      position: new Tmapv3.LatLng(location.lat, location.lng),
      map: map,
    });

    setTmap(map);
    setCurMarker(marker);
  };

  const updateMarker = () => {
    if (!curMarker) {
      return;
    }

    curMarker.setPosition(new window.Tmapv3.LatLng(location.lat, location.lng));
  };

  useEffect(() => {
    if (!(mapRef.current! as HTMLElement).firstChild) {
      initMap({
        lat: location.lat,
        lng: location.lng,
      });
    }
    updateMarker();
  }, [location]);

  useEffect(() => {
    if (tmap && locationLoading) {
      tmap.setCenter(new window.Tmapv3.LatLng(location.lat, location.lng));
      tmap.setZoom(17);
      updateMarker();
    }
  }, [tmap, locationLoading]);

  return (
    <S.Wrap>
      <S.Map ref={mapRef} $modalOn={true}></S.Map>
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
    pointer-events: ${({ $modalOn }) => ($modalOn ? 'none' : 'auto')};
  `,
};
