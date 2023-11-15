export interface Location {
  latitude: number;
  longitude: number;
}
export interface RouteSaveRequest {
  locations: Array<Location>;
}
