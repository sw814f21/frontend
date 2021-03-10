import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import SearchScreen from "../screens/SearchScreen";
import { BottomTabParamList, SearchParamList, NotificationParamList, MapParamList,
    FavoriteParamList, ProfileParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();
    Colors[colorScheme].tint = "#236683"

    return (
        <BottomTab.Navigator
            initialRouteName="Map"
            tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
            <BottomTab.Screen
                name="Search"
                component={SearchNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
                    tabBarLabel: () => null,
                }}
            />
            <BottomTab.Screen
                name="Notification"
                component={NotificationNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
                    tabBarLabel: () => null,
                }}
            />
            <BottomTab.Screen
                name="Map"
                component={MapNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name="map-marker" color={color} />,
                    tabBarLabel: () => null,
                }}
            />
            <BottomTab.Screen
                name="Favorite"
                component={FavoriteNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
                    tabBarLabel: () => null,
                }}
            />
            <BottomTab.Screen
                name="Profile"
                component={ProfileNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
                    tabBarLabel: () => null,
                }}
            />
        </BottomTab.Navigator>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const SearchStack = createStackNavigator<SearchParamList>();

function SearchNavigator() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerTitle: 'Search' }}
      />
    </SearchStack.Navigator>
  );
}

const NotificationStack = createStackNavigator<NotificationParamList>();

function NotificationNavigator() {
  return (
    <NotificationStack.Navigator>
      <NotificationStack.Screen
        name="NotificationScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Notifications' }}
      />
    </NotificationStack.Navigator>
  );
}

const MapStack = createStackNavigator<MapParamList>();

function MapNavigator() {
    return (
        <MapStack.Navigator>
            <MapStack.Screen
                name="MapScreen"
                component={TabTwoScreen}
                options={{ headerTitle: 'Map' }}
            />
        </MapStack.Navigator>
    );
}

const FavoriteStack = createStackNavigator<FavoriteParamList>();

function FavoriteNavigator() {
    return (
        <FavoriteStack.Navigator>
            <FavoriteStack.Screen
                name="FavoriteScreen"
                component={TabTwoScreen}
                options={{ headerTitle: 'Favorites' }}
            />
        </FavoriteStack.Navigator>
    );
}

const ProfileStack = createStackNavigator<ProfileParamList>();

function ProfileNavigator() {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen
                name="ProfileScreen"
                component={TabTwoScreen}
                options={{ headerTitle: 'Profile' }}
            />
        </ProfileStack.Navigator>
    );
}
