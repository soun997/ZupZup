interface Location {
  prevLat: number;
  prevLng: number;
  curLat: number;
  curLng: number;
}

const toRadians = (degrees: number) => {
  return (degrees * Math.PI) / 180;
};

const fromLocation = (location: Location): number => {
  const EARTH_R_KM = 6371;
  const distanceLat = toRadians(location.prevLat - location.curLat);
  const distanceLng = toRadians(location.prevLng - location.curLng);

  const a =
    Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
    Math.cos(toRadians(location.prevLat)) *
      Math.cos(toRadians(location.curLat)) *
      Math.sin(distanceLng / 2) *
      Math.sin(distanceLng / 2);

  const centralAngle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = EARTH_R_KM * centralAngle;
  const distanceMeter = distance * 1000; // to Meter

  return distanceMeter;
};

const useDistance = {
  fromLocation,
};

export default useDistance;
