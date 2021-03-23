import { Notification, Restaurant, SettingItem } from "../types";
import { FindSmileyStorage } from "./storage";

export class SampleStorage implements FindSmileyStorage {
    storeSettings(settings: SettingItem[]): Promise<void> {
        throw new Error("Method not implemented.");
    }

    getFavoriteStoredRestaurants(): Promise<Restaurant[]> {
        return new Promise((resolve, _) => {
            console.log('got favorites');
            resolve(require('./sample/sample_favorite.json'));
        });
    }
    getStoredNotifications(): Promise<Notification[]> {
        return new Promise((resolve, _) => {
            console.log('got notifications');
            resolve(require('./sample/sample_notification.json'));
        })
    }
    getAllSettings(): Promise<SettingItem[]> {
        return new Promise((resolve, _) => {
            console.log('got settings');
            resolve(require('./sample/sample_setting.json'));
        });
    }
    getSingleFavoriteRestaurant(id: number): Promise<Restaurant> {
        throw new Error("Method not implemented")
    }
    toggleFavoriteStoredRestaurant(id: number): Promise<unknown> {
        throw new Error("Method not implemented")
    }
    insertRestaurants(restaurants: Restaurant[]) {
        throw new Error("Method not implemented")
    }
}