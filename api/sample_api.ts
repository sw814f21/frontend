import { Restaurant, SparseRestaurant } from "../types";
import { FindSmileyAPI } from "./api";

/**
 * A function for delaying a promise to simulate a slow HTTP server.
 * @param timeout The timeout of the promise in milliseconds
 * @param value The value of which to return
 */
function delay<T>(timeout: number, value: T): Promise<T> {
    return new Promise((resolve, _) => {
        setTimeout(resolve.bind(null, value), timeout);
    });
}

/**
 * The API for sample data.
 */
export class SampleAPI implements FindSmileyAPI {

    private DELAY_VALUE: number = 250;

    getRestaurant(id: number): Promise<Restaurant> {
        return new Promise((resolve, reject) => {

            let elements: Restaurant[] = require('./sample/sample_restaurant.json');
            let element = elements.find(element => element.id === id);
            if (element)
                return resolve(element);
            reject('Element not found');
        })
    }
    getSparseRestaurants(): Promise<SparseRestaurant[]> {
        return delay<SparseRestaurant[]>(this.DELAY_VALUE, require('./sample/sample_sparse.json'));
    }

    searchRestaurantByName(name: string): Promise<Restaurant[]> {
        let restaurants: Restaurant[] = require('./sample/sample_restaurant.json');
        const normalstring = name.trim().toLowerCase();
        let result = restaurants.filter(s => s.name.trim().toLowerCase().includes(normalstring));
        return delay<Restaurant[]>(this.DELAY_VALUE, result);
    }
    searchRestaurantByLocation(northEast: number, southwest: number): Promise<Restaurant[]> {
        return delay<Restaurant[]>(this.DELAY_VALUE, require('./sample/sample_restaurant.json'));
    }
    subscribeToPushNotifications(token: string, restaurantid: number): Promise<void> {
        return delay<void>(this.DELAY_VALUE, undefined);
    }
    unsubscribeFromPushNotification(token: string, restaurantid: number): Promise<void> {
        return delay<void>(this.DELAY_VALUE, undefined);
    }
}