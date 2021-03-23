import { Restaurant, SparseRestaurant } from "../types";
import { HTTPAPI } from "./http_api";
import { SampleAPI } from "./sample_api";
import Constants from 'expo-constants';

/**
 * The interface for getting data from the API.
 * Makes it easier swap out the backend if necessary.
 */
export interface FindSmileyAPI {
  /**
   * Fetches sparse restaurants from the database
   */
  getSparseRestaurants(): Promise<SparseRestaurant[]>;

  /**
   * Fetches a single restaurant from the database
   */
  getRestaurant(id: number): Promise<Restaurant>;

  /**
   * Searches for restaurants with a given name.
   * @param name the name to search for
   */
  searchRestaurantByName(name: string): Promise<Restaurant[]>;

  /**
   * Searches for restaurants in a given rectangular area.
   * @param northEast North-east point of the area to search in
   * @param southwest South-west point of the area to search in
   */
  searchRestaurantByLocation(northEast: number, southwest: number): Promise<Restaurant[]>;

  /**
   * Subscribes the user to notifications on a given restaurant.
   * @param token The token to use on the server to send the user a push notification.
   * @param restaurantid The ID of the restaurant for which the user wants push notification.
   */
  subscribeToPushNotifications(token: string, restaurantid: number): Promise<void>;

  /**
   * Unsubscribes the user from notifications of a given restaurant.
   * @param token The token which the user has used to subscribe to push notifications.
   * @param restaurantid The ID of the restaurant for which the user wants to unsubscribe from notifications from.
   */
  unsubscribeFromPushNotification(token: string, restaurantid: number): Promise<void>;
}

const httpapi = new HTTPAPI();
const sampleapi = new SampleAPI();

export function DataAPI(useProd: boolean): FindSmileyAPI {
  if (useProd === true) {
    return httpapi;
  }
  return Constants.manifest.extra.useSampledata === false ? httpapi : sampleapi;
}