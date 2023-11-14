interface LatLng {
  name: string;
  _lat: number;
  _lng: number;
  _object_: object;
}

interface TMap {
  setCenter: (latLng: LatLng) => void;
  setZoom: (zoom: number) => void;
  getCenter: () => LatLng;
  on: (type: string, callbackfunc: () => void) => void;
}

interface TmapOptions {
  center?: object;
  width: string;
  height: string;
  zoom?: number;
  bounds?: LatLngBounds;
}

interface Marker {
  setPosition: (LatLng) => void;
  setMap: (map: Map) => void;
}

interface Polyline {
  getPath: () => PolylinePath;
  setMap: (map: Map) => void;
}

interface PolylineOptions {
  path: Array;
  strokeColor: string;
  strokeWeight: number;
  direction: boolean;
  map: Map;
}

interface PolylinePath {
  path: Array<LatLng>;
}

interface MapLocation {
  lat: number;
  lng: number;
}

interface MarkerOptions {
  position: LatLng;
  icon?: object | string;
  iconSize?: object;
  offset?: Point;
  map: Map;
}

interface Size {}

interface LatLngBounds {
  extend: (latlng: LatLng) => void;
}

interface Point {}

export declare global {
  interface Window {
    Tmapv3: {
      Map: {
        new (container: HTMLElement, options: TmapOptions): TMap;
      };
      LatLng: {
        new (lat: number, lon: number): LatLng;
      };
      Marker: {
        new (options: MarkerOptions): Marker;
      };
      Polyline: {
        new (options: PolylineOptions): Polyline;
      };
      Size: {
        new (width: number, height: number): Size;
      };
      LatLngBounds: {
        new (latlng: LatLng): LatLngBounds;
      };
      Point: {
        new (x: number, y: number): Point;
      };
    };
  }
}
