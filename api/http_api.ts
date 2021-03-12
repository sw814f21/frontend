import { Restaurant } from "../types";
import { FindSmileyAPI } from "./api";
import _axios from "axios";
import Constants from 'expo-constants';

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

  getRestaurants(): Promise<Restaurant[]> {
    return new Promise<Restaurant[]>((resolve, reject) => {
      this.axios.get('/restaurant/').then(res => {
        resolve(res.data);
      }).catch(res => {
        reject(res);
      })
    });
  }
}



