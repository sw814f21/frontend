import { FavoriteRestaurant, GeoCoordinate, Notification, Restaurant, SettingItem } from "../types";
import * as SQLite from "./sqlite";
import { FindSmileyStorage } from "./storage";

export class RealData implements FindSmileyStorage {
  
  getFavoriteRestaurants(ids: number[]): Promise<FavoriteRestaurant[]> {
    return SQLite.getFavoriteRestaurants(ids);
  }
  getFavoriteStoredRestaurants(): Promise<Restaurant[]> {
    return SQLite.getFavoriteStoredRestaurants();
  }
  getStoredNotifications(): Promise<Notification[]> {
    throw new Error("Method not implemented.");
  }
  getAllSettings(): Promise<SettingItem[]> {
    return SQLite.getStoredSettings();
  }
  storeSettings(settings: SettingItem[]): Promise<void> {
    return SQLite.storeSettings(settings);
  }
  isFavoriteRestaurant(id: number): Promise<boolean> {
    return SQLite.isFavoriteRestaurant(id)
  }
  toggleFavoriteStoredRestaurant(id: number): Promise<unknown> {
    return SQLite.toggleFavoriteStoredRestaurant(id)
  }
  insertRestaurants(restaurants: Restaurant[]): Promise<void> {
    return SQLite.insertRestaurants(restaurants);
  }
}