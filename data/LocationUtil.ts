const haversine = require("fast-haversine");

import { Location } from "../types";

export const DEFAULT_LOCATION: Location = {
  lat: 56.1504185,
  lon: 10.2046389
}

export function getDistance(fromLocation: Location, toLocation: Location): number {
  return haversine(fromLocation, toLocation);
}

export function formatDistance(distance_in_m: number): String {
  let result: String = "";
  switch (true) {
    case (distance_in_m == 0):
      result = "";
      break;
    case (distance_in_m < 1050):
      // 0-1049 rounded and printed to nearest 100 meters. Eg. 100 m, 500 m, 1000 m
      result = `${Math.round(distance_in_m / 100) * 100} m`;
      break;
    case (distance_in_m < 10000):
      // 1050-9999 rounded and printed with 1 decimal. Eg. 1.2 km, 5.5 km 9.9 km
      result = `${(Math.round(distance_in_m / 100) / 10).toFixed(1)} km`;
      break;
    default:
      // From 10000 meters and up, rounded to nearest km and printed w/o decimal. Eg. 12 km, 55 km, 112 km
      result = `${Math.round(distance_in_m / 1000).toFixed(0)} km`;
      break;
  }

  return result;
}