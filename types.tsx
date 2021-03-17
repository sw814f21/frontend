export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Search: undefined;
  Notification: undefined;
  Map: undefined;
  Favorite: undefined;
  Profile: undefined;
};

export type SearchParamList = {
  SearchScreen: undefined;
};

export type NotificationParamList = {
  NotificationScreen: undefined;
};

export type MapParamList = {
  MapScreen: undefined;
};

export type FavoriteParamList = {
  FavoriteScreen: undefined;
};

export type ProfileParamList = {
  ProfileScreen: undefined;
};

/*
  data structures
 */

export type Restaurant = {
    id: number;
    name: string;
    address: string;
    zip_code: number;
    city: string;
    cur_smiley: number;  // map to enum Smiley
    reports: SmileyReport[];
    geo_lat: number;
    geo_long: number;
}

export type SmileyReport = {
    smiley: number;
    date: string;
    url: string;
}

export type Favorite = {
    restaurant_id: number;
}

export type SettingItem = {
    name: string;
    description: string;
    state: any;  // change to bool if we only have slider settings
}

export enum NotificationType {
    SmileyChange = 0,
    // ... e.g., RestaurantClosed etc
}

export type Notification = {
    restaurant_id: number;
    type: number;  // map to enum NotificationType
    date: string;
    new_data: any;
}

export enum PermissionType {
    Notifications = 0,
}

export type Permission = {
    id: number;
    type: number;
    granted: boolean;
}

export type PushNotification = {
    title: string,
    body: string,
    data: PushNotificationData
}

export type PushNotificationData = {
    data: string
}