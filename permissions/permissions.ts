import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export const registerForPushNotifications = async () => {
    try {
        const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if (!permission.granted) return;
        const token = await Notifications.getExpoPushTokenAsync();
        console.log(token);
        return token;
        // TODO: save token
    } catch (error) {
        console.log('Error getting token', error)
    }
}

