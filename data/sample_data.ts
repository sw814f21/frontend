import {Notification} from "../types";


export function getStoredNotifications() {
    return require('../api/sample_data/sample_notification.json');
}

export function getAllSettings() {
    return require('../api/sample_data/sample_setting.json')
}