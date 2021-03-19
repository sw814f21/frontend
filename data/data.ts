import { Notification, Restaurant, SettingItem } from "../types";
import * as SQLite from "./sqlite";
import { FindSmileyStorage } from "./storage";

export class RealData implements FindSmileyStorage {
  getFavoriteStoredRestaurants(): Promise<Restaurant[]> {
    return SQLite.getFavoriteStoredRestaurants();
  }
  functiongetStoredNotifications(): Promise<Notification[]> {
    throw new Error("Method not implemented.");
  }
  getAllSettings(): Promise<SettingItem[]> {
    return SQLite.getStoredSettings();
  }
  storeSettings(settings: SettingItem[]): Promise<void> {
    return SQLite.storeSettings(settings);
  }


}