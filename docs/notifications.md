# Expo notifications

[Expo API docs](https://docs.expo.io/versions/latest/sdk/notifications/)

This may be irrelevant; skip to [obtaining expo token](#obtaining-expo-token)

For notifications we need some external support which depends on the platform:
- iOS, *Apple Push Notification* service ([APN](https://developer.apple.com/library/archive/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/APNSOverview.html))
    - Cloud service, need to register the app
- Android, *Firebase Cloud Messaging* ([FCM](https://firebase.google.com/docs/cloud-messaging/))
    - Cloud service, just need a device-specific token (obtained by requesting permissions from user)

Expo has a [testing service](https://expo.io/notifications) for notifications. Here we still need the token explained under Android above.

## Obtaining Expo token
See `permissions/permissions.ts -> registerForPushNotifications()`. 

Due to the nature of these tokens, we may need to store these on the backend and handle notifications there (also makes more sense given that updates are detected on the backend.)
Although it is also possible to schedule notifications locally.

A token is on the form `ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]`.
Note that the `ExponentPushToken[]` bit should be included.

## Scheduling a push notification

[Docs](https://docs.expo.io/push-notifications/sending-notifications/)

Remember to login with an [Expo user](https://expo.io/signup) before trying to send a 
notification to a physical device while in develop mode, otherwise it will not work.

```shell
$ expo login
Username/Email Address: <username>
Password: hunter2

$ expo start
```

### Locally
See `permissions/permissions.ts -> schedulePushNotification()`.

Call the above function with the type below as input.

```typescript
type PushNotification = {
    title: string,
    body: string,
    data: PushNotificationData
}

type PushNotificationData = {
  data: string
}
```

e.g.,
```typescript
import {schedulePushNotification} from "../permissions/permissions";

<View
    onTouchEnd={() => {
      schedulePushNotification({
        title: 'hello',
        body: 'world',
        data: {data: 'yeet'}
      }).then(() => {console.log('hi')})
    }}
>
...
</View>
```

### Externally

#### curl

```shell
curl -H "Content-Type: application/json" -X POST "https://exp.host/--/api/v2/push/send" -d '{
  "to": "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]",
  "title":"hello",
  "body": "world"
}'

```

#### Rust

[Rust client](https://github.com/expo/expo-server-sdk-rust)

#### Expo testing tool

[Link](https://expo.io/notifications)

