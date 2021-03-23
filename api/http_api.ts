import { Restaurant, SparseRestaurant } from "../types";
import { FindSmileyAPI } from "./api";
import _axios from "axios";
import Constants from 'expo-constants';

/**
 * Provides the actual HTTP API for communicating with the server.
 */
export class HTTPAPI implements FindSmileyAPI {

  private axios = _axios.create({
    baseURL: Constants.manifest.extra.apiUrl,
    headers: {
      "Content-Type": "application/json"
    }
  });

  getRestaurant(id: number): Promise<Restaurant> {
    return new Promise<Restaurant>((resolve, reject) => {
      this.axios.get(`/restaurant/${id}`).then(res => {
        resolve(res.data);
      }).catch(res => {
        reject(res);
      })
    });
  }

  getSparseRestaurants(): Promise<SparseRestaurant[]> {
    return new Promise<SparseRestaurant[]>((resolve, reject) => {
      this.axios.get('/restaurant').then(res => {
        resolve(res.data);
      }).catch(res => {
        reject(res);
      })
    });
  }

  searchRestaurantByName(searchName: string): Promise<Restaurant[]> {
    return new Promise<Restaurant[]>((resolve, reject) => {
      const parameters = {
        params: {
          name: searchName
        }
      };
      this.axios.get('/restaurant/search', parameters).then(res => {
        resolve(res.data);
      }).catch(res => {
        reject(res);
      })
    });
  }

  searchRestaurantByLocation(searchNorthEast: number, searchSouthWest: number): Promise<Restaurant[]> {

    return new Promise<Restaurant[]>((resolve, reject) => {
      const parameters = {
        params: {
          northEast: searchNorthEast,
          southWest: searchSouthWest
        }
      };
      this.axios.get('/restaurant/search', parameters).then(res => {
        resolve(res.data);
      }).catch(res => {
        reject(res);
      })
    });
  }

  subscribeToPushNotifications(notificationToken: string, subRestaurantid: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const data = {
        token: notificationToken,
        restaurant: subRestaurantid
      }
      this.axios.post('/subscribe', data).then(_ => {
        resolve();
      }).catch(res => {
        reject(res);
      })
    });
  }

  unsubscribeFromPushNotification(notificationToken: string, subRestaurantid: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const data = {
        token: notificationToken,
        restaurant: subRestaurantid
      }
      this.axios.post('/unsubscribe', data).then(_ => {
        resolve();
      }).catch(res => {
        reject(res);
      })
    });
  }
}



