import { FavoriteRestaurant, GeoCoordinate, Notification, Restaurant, SettingItem } from "../types";
import { FindSmileyStorage } from "./storage";
import getDistance from "geolib/es/getDistance";

export class SampleStorage implements FindSmileyStorage {
    isFavoriteRestaurant(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    storeSettings(settings: SettingItem[]): Promise<void> {
        return new Promise((resolve, _) => {
            console.log(`Simulating insertion of ${settings.length} settings`);
            resolve();
        });
    }

    getFavoriteStoredRestaurants(): Promise<Restaurant[]> {
        return new Promise((resolve, _) => {
            console.log('got sample favorites');
            resolve(require('./sample/sample_favorite.json'));
        });
    }
    getStoredNotifications(): Promise<Notification[]> {
        return new Promise((resolve, _) => {
            console.log('got sample notifications');
            resolve(require('./sample/sample_notification.json'));
        })
    }
    getAllSettings(): Promise<SettingItem[]> {
        return new Promise((resolve, _) => {
            console.log('got sample settings');
            resolve(require('./sample/sample_setting.json'));
        });
    }
    getSingleFavoriteRestaurant(id: number): Promise<Restaurant> {
        throw new Error("Method not implemented")
    }
    toggleFavoriteStoredRestaurant(id: number): Promise<void> {
        return new Promise<void>((resolve, _) => {
            console.log(`Simulating favorite of restaurant with id ${id} into the local sample database.`)
            resolve();
        });
    }
    insertRestaurants(restaurants: Restaurant[]): Promise<void> {
        return new Promise<void>((resolve, _) => {
            console.log(`Simulating insertion of ${restaurants.length} restaurants into the local sample database.`)
            resolve();
        });
    }
    getFavoriteRestaurants(ids: number[]): Promise<FavoriteRestaurant[]> {
        return new Promise((resolve, _) => {
            let restaurants: Restaurant[] = require('./sample/sample_favorite.json');
            let result: FavoriteRestaurant[] = [];
            for (const res of restaurants) {
                if (ids.includes(res.id)) {
                    result.push({ id: res.id, favorite: true })
                }
            }
            resolve(result);
        })
    }
}