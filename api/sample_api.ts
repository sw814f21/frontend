import { Restaurant } from "../types";
import { FindSmileyAPI } from "./api";
import restaurants from './sample_data/sample_restaurant.json';

export class SampleAPI implements FindSmileyAPI {

    
    getRestaurant(id: number): Promise<Restaurant> {
        return new Promise((resolve, reject) => {
            let elements: Restaurant[] = restaurants;
            let element = elements.find(element => element.id === id);
            if (element)
                return resolve(element);
            reject('Element not found');
        })
    }
    getRestaurants(): Promise<Restaurant[]> {
        return new Promise((resolve, _) => {
            resolve(restaurants);
        });
    }
}