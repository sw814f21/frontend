import { Restaurant, Favorite, Notification, SettingItem } from "../types";

export function getRestaurants(): { restaurants: Restaurant[] } {
    return require('../sample_data/sample_restaurant.json');
}

export function getFavorites(): { favorites: Favorite[] } {
    return require('../sample_data/sample_favorite.json');
}

export function getNotifications(): { notifications: Notification[] } {
    return require('../sample_data/sample_notification.json');
}

export function getSettings(): { settings: SettingItem[] } {
    return require('../sample_data/sample_setting.json');
}