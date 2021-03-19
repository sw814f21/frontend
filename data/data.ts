import { Notification, Restaurant, SettingItem } from "../types";
import {
  getFavoriteStoredRestaurants,
  getSingleFavoriteRestaurant,
  toggleFavoriteStoredRestaurant
} from "./sqlite";
import { FindSmileyStorage } from "./storage";

export class RealData implements FindSmileyStorage {
  getFavoriteStoredRestaurants(): Promise<Restaurant[]> {
    return getFavoriteStoredRestaurants();
  }
  getStoredNotifications(): Promise<Notification[]> {
    throw new Error("Method not implemented.");
  }
  getAllSettings(): Promise<SettingItem[]> {
    throw new Error("Method not implemented.");
  }
  getSingleFavoriteRestaurant(id: number): Promise<Restaurant> {
    return getSingleFavoriteRestaurant(id)
  }
  toggleFavoriteStoredRestaurant(id: number): Promise<unknown> {
    return toggleFavoriteStoredRestaurant(id)
  }
}