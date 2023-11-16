import { useState, useEffect } from 'react';

import { GeoLocationType } from 'types';

const useGeolocation = () => {
  const [location, setLocation] = useState<GeoLocationType>({
    loaded: false,
    coordinates: { lat: 0, lng: 0 },
  });

  const onSuccess = (location: {
    coords: { latitude: number; longitude: number };
  }) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error: { code: number; message: string }) => {
    setLocation({
      loaded: false,
      error,
    });
  };

  useEffect(() => {
    const getLocation = setInterval(() => {
      if (!('geolocation' in navigator)) {
        onError({
          code: 0,
          message: 'Geolocation not supported',
        });
      }
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, 5000);

    return () => {
      clearInterval(getLocation);
    };
  }, []);

  return location;
};

export default useGeolocation;
