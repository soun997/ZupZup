import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import { TrashInfo } from 'types';
import { Marker, Polyline, TMap } from 'types/tmapv3';

import TrashMarkerSvg from 'assets/icons/trash_can.svg?react';

interface Location {
  lat: number;
  lng: number;
}

interface MapProps {
  $modalOn: boolean;
}

interface Props {
  exitOn: boolean;
  ploggingInfoOn: boolean;
  cameraOn: boolean;
  location: Location;
  fixCenter: boolean;
  setFixCenter: (fixCenter: boolean) => void;
  trashs: Array<TrashInfo>;
  trashOn: boolean;
}

const PloggingMap = ({
  exitOn,
  ploggingInfoOn,
  cameraOn,
  location,
  fixCenter,
  setFixCenter,
  trashs,
  trashOn,
}: Props) => {
  const mapRef = useRef(null);
  const [tmap, setTmap] = useState<TMap | null>(null);
  const [curMarker, setCurMarker] = useState<Marker | null>(null);
  const [polyline, setPolyline] = useState<Polyline | null>(null);

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
    });

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
    if (!(mapRef.current! as HTMLElement).firstChild) {
      initMap({
        lat: location.lat,
        lng: location.lng,
      });
    }

    const updateMapCenter = () => {
      tmap?.setCenter(new window.Tmapv3.LatLng(location.lat, location.lng));
    };

    const updateMarker = () => {
      if (!curMarker) {
        return;
      }

      const LOCATIONS_KEY = 'locations';
      const locations = JSON.parse(
        localStorage.getItem(LOCATIONS_KEY) as string,
      );

      if (locations === null || locations.length < 1) {
        return;
      }

      curMarker.setPosition(
        new window.Tmapv3.LatLng(location.lat, location.lng),
      );
    };

    const updatePath = () => {
      if (!tmap || !polyline) {
        return;
      }

      const LOCATIONS_KEY = 'locations';
      const locations = JSON.parse(
        localStorage.getItem(LOCATIONS_KEY) as string,
      );

      if (!locations || locations.length < 1) {
        return;
      }

      const paths = locations.map(
        (location: Location) =>
          new window.Tmapv3.LatLng(location.lat, location.lng),
      );

      const newPolyline = new window.Tmapv3.Polyline({
        path: paths,
        strokeColor: '#dd00dd',
        strokeWeight: 6,
        direction: true,
        map: tmap,
      });
      setPolyline(newPolyline);
    };

    updateMarker();
    updatePath();
    if (fixCenter) {
      updateMapCenter();
    }
  }, [location]);

  useEffect(() => {
    const updateTrashMarkers = () => {
      if (!tmap) {
        return;
      }

      [...trashs].forEach(
        trash =>
          new window.Tmapv3.Marker({
            position: new window.Tmapv3.LatLng(trash.latitude, trash.longitude),
            icon: '/assets/images/trash_can.png',
            iconSize: new window.Tmapv3.Size(40, 40),
            map: tmap,
          }),
      );
    };

    if (trashOn) {
      updateTrashMarkers();
    } else {
      initMap({
        lat: location.lat,
        lng: location.lng,
      });
    }
  }, [trashs, trashOn]);

  return (
    <S.Wrap>
      <S.Map
        ref={mapRef}
        $modalOn={exitOn || ploggingInfoOn || cameraOn}
        onTouchStart={() => setFixCenter(false)}
      ></S.Map>
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
    pointer-events: ${({ $modalOn }) => ($modalOn ? 'none' : 'auto')};
  `,
};
