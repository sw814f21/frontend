import { Notification, Restaurant, SettingItem } from "../types";
import { FindSmileyStorage } from "./storage";

export class SampleStorage implements FindSmileyStorage {

    getFavoriteStoredRestaurants(): Promise<Restaurant[]> {
        return new Promise((resolve, _) => {
            console.log('got favorites');
            resolve(require('./sample/sample_favorite.json'));
        });
    }
    functiongetStoredNotifications(): Promise<Notification[]> {
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
}