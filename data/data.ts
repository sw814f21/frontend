import { Notification, Restaurant, SettingItem } from "../types";
import { getFavoriteStoredRestaurants } from "./sqlite";
import { FindSmileyStorage } from "./storage";

export class RealData implements FindSmileyStorage {
  getFavoriteStoredRestaurants(): Promise<Restaurant[]> {
    return getFavoriteStoredRestaurants();
  }
  functiongetStoredNotifications(): Promise<Notification[]> {
    throw new Error("Method not implemented.");
  }
  getAllSettings(): Promise<SettingItem[]> {
    throw new Error("Method not implemented.");
  }

}