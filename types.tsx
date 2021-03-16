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

export enum SettingType {
    Switch = 0,
    // ... e.g., number input, text input, etc
}

export type SettingItem = {
    id: number;
    name: string;
    description: string;
    type: number;
    state: any;  // change to bool if we only have switch settings
}

export enum NotificationType {
    SmileyChange = 0,
    // ... e.g., RestaurantClosed etc
}

export type Notification = {
    type: number;  // map to enum NotificationType
    date: string;
    new_data: any;
    restaurant: Restaurant;
}
