import { Notification, Restaurant, SettingItem } from "../types";
import * as SQLite from "./sqlite";
import { FindSmileyStorage } from "./storage";

export class RealData implements FindSmileyStorage {

  enrichRestaurant(restaurant: Restaurant): Promise<Restaurant> {
    return new Promise((resolve, reject) => {
      this.enrichRestaurants([restaurant]).then(r => {
        resolve(r[0]);
      }).catch(err => {
        reject(err);
      });
    });
  }
  enrichRestaurants(restaurants: Restaurant[]): Promise<Restaurant[]> {
    return SQLite.enrichRestaurants(restaurants);
  }
  getFavoriteStoredRestaurants(): Promise<Restaurant[]> {
    return SQLite.getFavoriteStoredRestaurants();
  }
  getStoredNotifications(): Promise<Notification[]> {
    return SQLite.getStoredNotifications();
  }
  getAllSettings(): Promise<SettingItem[]> {
    return SQLite.getStoredSettings();
  }
  storeSettings(settings: SettingItem[]): Promise<void> {
    return SQLite.storeSettings(settings);
  }
  getSingleFavoriteRestaurant(id: number): Promise<Restaurant> {
    return SQLite.getSingleFavoriteRestaurant(id)
  }
  toggleFavoriteStoredRestaurant(id: number): Promise<unknown> {
    return SQLite.toggleFavoriteStoredRestaurant(id)
  }
  insertRestaurants(restaurants: Restaurant[]): Promise<void> {
    return SQLite.insertRestaurants(restaurants);
  }
}