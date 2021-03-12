import { Restaurant } from "../types";
import { FindSmileyAPI } from "./api";

export class SampleAPI implements FindSmileyAPI {

    private FILENAME = './sample_data/sample_restaurant.json';
    
    getRestaurant(id: number): Promise<Restaurant> {
        return new Promise((resolve, reject) => {
            let elements: Restaurant[] = require(this.FILENAME);
            let element = elements.find(element => element.id === id);
            if (element)
                return resolve(element);
            reject('Element not found');
        })
    }
    getRestaurants(): Promise<Restaurant[]> {
        return new Promise((resolve, _) => {
            resolve(require(this.FILENAME));
        });
    }
}