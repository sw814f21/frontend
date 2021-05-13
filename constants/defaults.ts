import {MapRegion, SettingItem} from "../types";

export const DEFAULT_SETTINGS: SettingItem[] = [
    {
        id: 0,
        name: "Pushnotifikationer",
        description: "Få besked når der sker en opdatering på din favoritrestaurant",
        state: true,
        type: 0
    }
]

export const DEFAULT_REGION: MapRegion = {
    latitude: 56.1915,
    longitude: 11.6345,
    latitudeDelta: 1.9585,
    longitudeDelta: 6.0695,
}

export const BOTTOM_TAB_HEIGHT: number = 70;
export const NAVIGATOR_HEADER_HEIGHT: number = 100;