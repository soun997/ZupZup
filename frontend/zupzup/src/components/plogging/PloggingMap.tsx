import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import { TrashInfo } from 'types';
import * as utils from 'utils';
import { Marker, Polyline, TMap } from 'types/tmapv3';
import { useAppDispatch } from 'hooks';
import { setCenterLat, setCenterLng } from 'hooks/store/useMap';

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
  locationLoading: boolean;
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
  locationLoading,
}: Props) => {
  const mapRef = useRef(null);
  const [tmap, setTmap] = useState<TMap | null>(null);
  const [curMarker, setCurMarker] = useState<Marker | null>(null);
  const [polyline, setPolyline] = useState<Polyline | null>(null);
  const [trashMarkers, setTrashMarkers] = useState<Array<Marker>>([]);
  const dispatch = useAppDispatch();

  const initMap = ({ lat, lng }: { lat: number; lng: number }) => {
    const { Tmapv3 } = window;
    const latlng = new Tmapv3.LatLng(lat, lng);
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
      position: latlng,
      map: map,
    });

    const polyline = new Tmapv3.Polyline({
      path: [latlng],
      strokeColor: '#00C4B8',
      strokeWeight: 8,
      direction: true,
      map: map,
    });

    setTmap(map);
    setCurMarker(marker);
    setPolyline(polyline);
  };

  useEffect(() => {
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

      const locations = JSON.parse(
        localStorage.getItem(utils.COORDINATE.LOCATIONS_KEY) as string,
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
        strokeColor: '#00C4B8',
        strokeWeight: 8,
        direction: true,
        map: tmap,
      });
      setPolyline(newPolyline);
    };

    if (!(mapRef.current! as HTMLElement).firstChild) {
      initMap({
        lat: 37.715133,
        lng: 126.734086,
      });
    }
    updateMarker();
    updatePath();
    if (fixCenter) {
      updateMapCenter();
    }
  }, [location]);

  useEffect(() => {
    if (tmap && locationLoading) {
      tmap.setCenter(new window.Tmapv3.LatLng(location.lat, location.lng));
      tmap.setZoom(17);
    }
  }, [locationLoading]);

  useEffect(() => {
    dispatch(setCenterLat(tmap?.getCenter()._lat));
    dispatch(setCenterLng(tmap?.getCenter()._lng));
  }, [tmap?.getCenter()]);

  useEffect(() => {
    const updateTrashMarkers = () => {
      if (!tmap) {
        return;
      }
      const markers = [...trashs].map(trash => {
        let trashIcon = `${import.meta.env.VITE_S3_URL}/general_trash.png`;

        if (trash.trashcanType === '재활용') {
          trashIcon = `${import.meta.env.VITE_S3_URL}/recycle_trash.png`;
        } else if (trash.trashcanType === '담배꽁초') {
          trashIcon = `${import.meta.env.VITE_S3_URL}/cigarette_trash.png`;
        }

        return new window.Tmapv3.Marker({
          position: new window.Tmapv3.LatLng(trash.latitude, trash.longitude),
          icon: trashIcon,
          iconSize: new window.Tmapv3.Size(30, 40),
          offset: new window.Tmapv3.Point(-10, 0),
          map: tmap,
        });
      });
      setTrashMarkers([...markers]);
    };

    const removeTrashMarkers = () => {
      trashMarkers.forEach(marker => {
        marker.setMap(null);
      });
    };

    if (trashOn) {
      updateTrashMarkers();
    } else {
      removeTrashMarkers();
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
