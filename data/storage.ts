import Constants from 'expo-constants';
import { FavoriteRestaurant, GeoCoordinate, Notification, Restaurant, SettingItem } from "../types";
import { RealData } from "./data";
import { SampleStorage } from "./sample_data";

export interface FindSmileyStorage {
  /**
   * Gets the favorited restaurants.
   */
  getFavoriteStoredRestaurants(): Promise<Restaurant[]>;

  /**
   * Gets the stored notifications.
   */
  getStoredNotifications(): Promise<Notification[]>;

  /**
   * Gets the stored settings.
   */
  getAllSettings(): Promise<SettingItem[]>;

  /**
   * Gets a single favorited restaurant.
   * @param id The ID of the restaurant
   */
  isFavoriteRestaurant(id: number): Promise<boolean>;

  /**
   * Toggles favorite of the specific restaurant
   * @param id ID of the restaurant to toggle favorite on
   */
  toggleFavoriteStoredRestaurant(id: number): Promise<unknown>;

  /**
   * Saves the settings.
   * @param settings The list of settings to store
   */
  storeSettings(settings: SettingItem[]): Promise<void>;

  /**
   * Stores a list of restaurants for later usage.
   * @param restaurants List of restaurants to store
   */
  insertRestaurants(restaurants: Restaurant[]): Promise<void>;

  /**
   * Enriches restaurants with data from storage. Currently only "favorite"-field.
   * @param restaurants The list of restaurants to enrich.
   */
  getFavoriteRestaurants(ids: number[]): Promise<FavoriteRestaurant[]>;
}

const sample_storage = new SampleStorage();
const data = new RealData();

export function storageAPI(useProd?: boolean) {
  if (useProd === true) {
    return data;
  }
  return Constants.manifest.extra.useSampledata === false ? data : sample_storage;
}