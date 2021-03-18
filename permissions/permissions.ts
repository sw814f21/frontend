import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import {PushNotification, PushNotificationData} from "../types";
import {Platform} from "react-native";

export const registerForPushNotifications = async () => {
    let token = '';
    if (Constants.isDevice) {
        const { status: curStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = curStatus;

        if (curStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync({
                // https://docs.expo.io/versions/latest/sdk/notifications/#arguments-8
                ios: {
                    allowAlert: true,
                    allowBadge: true,
                }
            });
            finalStatus = status
        }

        if (finalStatus !== 'granted') {
            alert('Could not retrieve token for push notifications.')
            return;
        }

        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Can\' retrieve token on virtual device.');
    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#BDBDBD"
        })
    }

    return token
}

export async function schedulePushNotification(notif: PushNotification) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: notif.title,
            body: notif.body,
            data: notif.data,
        },
        trigger: {seconds: 2}
    })
}