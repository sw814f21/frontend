export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};


/*
  data structures
 */

export enum Smiley {
    Elite = 0,
    Good = 1,
    Decent = 2,
    Neutral = 3,
    Bad = 4,
}

export type Restaurant = {
    id: number;
    name: string;
    address: string;
    zip_code: number;
    city: string;
    cur_smiley: number;  // map to enum Smiley
    reports: SmileyReport[];
    geo_lat: string;
    geo_long: string;
}

export type SmileyReport = {
    smiley: number;
    date: Date;
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
    date: Date;
    new_data: any;
}
