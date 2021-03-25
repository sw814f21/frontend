import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Search: {
            screens: {
              Search: 'search',
            },
          },
          Notifications: {
            screens: {
              Notifications: 'notifications'
            },
          },
          Map: {
            screens: {
              Map: 'map'
            },
          },
          Favorites: {
            screens: {
              Favorites: 'favorites'
            },
          },
          Profile: {
            screens: {
              Profile: 'profile'
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
