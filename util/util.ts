import getDistance from "geolib/es/getDistance";
import { FindSmileyAPI } from "../api/api";
import { FindSmileyStorage } from "../data/storage";
import { GeoCoordinate, Restaurant } from "../types";

export function fillSearchData(name: string,
                               location: GeoCoordinate,
                               data_api: FindSmileyAPI,
                               storage_api: FindSmileyStorage,
                               limit: number,
                               offset: number): Promise<Restaurant[]> {
  return new Promise((resolve, _) => {
    data_api.searchRestaurantByName(name).then(r => {
      resolve(Promise.all(r.slice(offset, limit).map(r => abba(r, location, storage_api))));
    })
  })
}

function abba(res: Restaurant, loc: GeoCoordinate, storapi: FindSmileyStorage): Promise<Restaurant> {
  return new Promise((resolve, _) => {

    let a = getDistString(res, loc);
    let b = getFavorite(res, storapi);
    Promise.all([a, b]).then(r => {
      res.distance = r[0];
      res.favorite = r[1];
      resolve(res);
    });
  })
}

function getDistString(res: Restaurant, loc: GeoCoordinate): Promise<string> {
  return new Promise((resolve, _) => {
    let tmep = res as any;
    let coords = { lat: tmep.longitude, lng: tmep.latitude };
    let dist = getDistance(coords, loc, 100);
    resolve(dist >= 1000 ? `${dist / 1000} km` : `${dist} m`);
  })
}
function getFavorite(res: Restaurant, storapi: FindSmileyStorage): Promise<boolean> {
  return new Promise((resolve, _) => {
    resolve(storapi.isFavoriteRestaurant(res.id));
  })
}