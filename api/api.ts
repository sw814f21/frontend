import { Restaurant } from "../types";
import { HTTPAPI } from "./http_api";
import { SampleAPI } from "./sample_api";
import Constants from 'expo-constants';

export interface FindSmileyAPI {
  /**
   * Fetches all the restaurants from the database
   */
  getRestaurants(): Promise<Restaurant[]>;
  /**
   * Fetches a single restaurant from the database
   */
  getRestaurant(id: number): Promise<Restaurant>;
}

const httpapi = new HTTPAPI();
const sampleapi = new SampleAPI();

export function GetAPI(): FindSmileyAPI {
  return Constants.manifest.extra.useSampledata === false ? httpapi : sampleapi;
}