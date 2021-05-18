import { Notification, Restaurant, SettingItem } from "../types";
import { FindSmileyStorage } from "./storage";

export class SampleStorage implements FindSmileyStorage {
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
    toggleFavoriteStoredRestaurant(res: Restaurant): Promise<void> {
        return new Promise<void>((resolve, _) => {
            console.log(`Simulating favorite of restaurant with id ${res.id} into the local sample database.`)
            resolve();
        });
    }
    insertRestaurants(restaurants: Restaurant[]): Promise<void> {
        return new Promise<void>((resolve, _) => {
            console.log(`Simulating insertion of ${restaurants.length} restaurants into the local sample database.`)
            resolve();
        });
    }
    enrichRestaurants(restaurants: Restaurant[]): Promise<Restaurant[]> {
        return new Promise((resolve, _) => {
            let favoriterestaurants = require('./sample/sample_favorite.json');
            for (const fav of favoriterestaurants) {
                let index = restaurants.findIndex(r => fav.id === r.id);
                if (index !== -1) {
                    restaurants[index].favorite = fav.favorite;
                }
            }
            resolve(restaurants);
        })
    }
    enrichRestaurant(restaurant: Restaurant): Promise<Restaurant> {
        return new Promise((resolve, reject) => {
            this.enrichRestaurants([restaurant]).then(r => {
                resolve(r[0]);
            }).catch(err => {
                reject(err);
            });
        });
    }
}