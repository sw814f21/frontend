import Constants from 'expo-constants';
import { Notification, Restaurant, SettingItem } from "../types";
import { RealData } from "./data";
import { SampleStorage } from "./sample_data";

export interface FindSmileyStorage {
  getFavoriteStoredRestaurants(): Promise<Restaurant[]>;

  functiongetStoredNotifications(): Promise<Notification[]>;

  getAllSettings(): Promise<SettingItem[]>;
}

const sample_storage = new SampleStorage();
const data = new RealData();

export function storageAPI() {
  return Constants.manifest.extra.useSampledata === false ? data : sample_storage;
}