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

export class Restaurant {
    id: number;
    name: string;
    address: string;
    zipcode: number;
    city: string;
    cur_smiley: number;
    reports: SmileyReport[];
    latitude: number;
    longitude: number;
    favorite?: boolean;

    /**
     *
     */
    constructor(other: RestRestaurant) {
      this.id = other.id;
      this.name = other.name;
      this.address = other.address;
      this.zipcode = parseInt(other.zipcode);
      this.city = other.city;
      this.latitude = other.latitude;
      this.longitude = other.longitude;
      var temp_reports = [];
      var newest_report = {
        value: 0,
        date: new Date(1900, 1),
      };
      for (const report of other.smileyreports) {
        let curr_report = new SmileyReport(report);
        if(curr_report.date > newest_report.date) {
          newest_report.value = curr_report.rating;
          newest_report.date = curr_report.date;
        }
        temp_reports.push(curr_report);
      }
      this.cur_smiley = newest_report.value;
      this.reports = temp_reports;
    }
}

export type SparseRestaurant = {
  id: number;
  lat: number;
  lng: number;
}

export class SmileyReport {
    rating: number;
    date: Date;
    report_id: string;

    /**
     *
     */
    constructor(report: RestSmileyReport) {
      this.rating = report.rating;
      this.date = new Date(report.date);
      this.report_id = report.report_id;
    }

    get url() {
      return 'https://www.findsmiley.dk/Sider/KontrolRapport.aspx?' + this.report_id;
    }
}

export type RestRestaurant = {
  id: number;
  smiley_restaurant_id: string;
  name: string;
  address: string;
  zipcode: string;
  city: string;
  cvr: string;
  pnr: string;
  latitude: number;
  longitude: number;
  version_number: number;
  smileyreports: RestSmileyReport[];
}

export type RestSmileyReport = {
  id: number;
  res_id: number;
  rating: number;
  report_id: string;
  date: string;
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