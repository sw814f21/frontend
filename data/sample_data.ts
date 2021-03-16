import {Notification} from "../types";

export function getFavoriteStoredRestaurants() {
    return require('../api/sample_data/sample_favorite.json');
}

export function getStoredNotifications() {
    return require('../api/sample_data/sample_notification.json');
}

export function getAllSettings() {
    return require('../api/sample_data/sample_setting.json');
}