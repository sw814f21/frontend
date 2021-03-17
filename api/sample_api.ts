import { Restaurant } from "../types";
import { FindSmileyAPI } from "./api";

export class SampleAPI implements FindSmileyAPI {


    getRestaurant(id: number): Promise<Restaurant> {
        return new Promise((resolve, reject) => {

            let elements: Restaurant[] = require('./sample_data/sample_restaurant.json');
            let element = elements.find(element => element.id === id);
            if (element)
                return resolve(element);
            reject('Element not found');
        })
    }
    getRestaurants(): Promise<Restaurant[]> {
        return new Promise((resolve, _) => {
            resolve(require('./sample_data/sample_restaurant.json'));
        });
    }
}