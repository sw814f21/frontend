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

export type Restaurant = GeoCoordinate & {
    id: number;
    name: string;
    address: string;
    zip_code: number;
    city: string;
    cur_smiley: number;  // map to enum Smiley
    reports: SmileyReport[];
    favorite?: boolean;
    distance?: string;
}

export type FavoriteRestaurant = {
  id: number;
  favorite: boolean;
}

export type GeoCoordinate = {
  lat: number;
  lng: number;
}

export type SparseRestaurant = GeoCoordinate & {
  id: number;
}

export type SmileyReport = {
    smiley: number;
    date: string;
    url: string;
}

export enum SettingType {
    Switch = 0,
    // ... e.g., number input, text input, etc
}

export type SettingItem = {
    id: number;
    name?: string;
    description?: string;
    type?: number;
    state: any;  // change to bool if we only have switch settings
}

export enum NotificationType {
    SmileyChange = 0,
    // ... e.g., RestaurantClosed etc
}

export type Notification = {
    id: number;
    type: number;  // map to enum NotificationType
    date: string;
    new_data: any;
    restaurant: Restaurant;
}

export type PushNotification = {
    title: string,
    body: string,
    data: PushNotificationData
}

export type PushNotificationData = {
    data: string
}

export type MapRegion = {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number
}