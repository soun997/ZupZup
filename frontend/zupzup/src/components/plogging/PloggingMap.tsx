import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import { Marker, Polyline, TMap } from 'types/tmapv3';

interface Location {
  lat: number;
  lng: number;
}

interface MapProps {
  modalOn: boolean;
}

interface Props {
  exitOn: boolean;
  ploggingInfoOn: boolean;
  location: Location;
}

const PloggingMap = ({ exitOn, ploggingInfoOn, location }: Props) => {
  const mapRef = useRef(null);
  const [tmap, setTmap] = useState<TMap>();
  const [curMarker, setCurMarker] = useState<Marker>();
  const [polyline, setPolyline] = useState<Polyline>();

  const initMap = ({ lat, lng }: Location) => {
    const { Tmapv3 } = window;
    const latlng = new Tmapv3.LatLng(lat, lng);
    const map = new Tmapv3.Map(mapRef.current!, {
      center: latlng,
      width: '100%',
      height: '100%',
      zoom: 17,
    });

    const marker = new Tmapv3.Marker({
      position: latlng,
      map: map,
    }) as Marker;

    const polyline = new Tmapv3.Polyline({
      path: [latlng],
      strokeColor: '#dd00dd',
      strokeWeight: 6,
      direction: true,
      map: map,
    });
    setTmap(map);
    setCurMarker(marker);
    setPolyline(polyline);
  };

  useEffect(() => {
    // const updateMapCenter = ({ lat, lng }: Location) => {
    //   tmap?.setCenter(new window.Tmapv3.LatLng(lat, lng));
    // };

    const updateMarker = ({ lat, lng }: Location) => {
      if (curMarker) {
        curMarker.setPosition(new window.Tmapv3.LatLng(lat, lng));
      }
    };

    const updatePath = () => {
      const LOCATIONS_KEY = 'locations';
      const locations = JSON.parse(
        localStorage.getItem(LOCATIONS_KEY) as string,
      );
      if (locations === null || locations.length < 1) {
        return;
      }

      const { Tmapv3 } = window;

      if (tmap && polyline) {
        const newPolyline = new Tmapv3.Polyline({
          path: locations.map(
            (location: Location) =>
              new window.Tmapv3.LatLng(location.lat, location.lng),
          ),
          strokeColor: '#dd00dd',
          strokeWeight: 6,
          direction: true,
          map: tmap,
        });
        setPolyline(newPolyline);
      }
    };

    if (!(mapRef.current! as HTMLElement).firstChild) {
      initMap({
        lat: location.lat,
        lng: location.lng,
      });
    }

    if (tmap && curMarker && polyline) {
      updateMarker({
        lat: location.lat,
        lng: location.lng,
      });

      updatePath();
    }
  }, [curMarker, location, polyline, tmap]);

  return (
    <S.Wrap>
      <S.Map ref={mapRef} modalOn={exitOn || ploggingInfoOn}></S.Map>
    </S.Wrap>
  );
};

export default PloggingMap;

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
