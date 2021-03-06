import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import MapScreen from "../screens/MapScreen";
import SearchScreen from "../screens/SearchScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import {BOTTOM_TAB_HEIGHT, NAVIGATOR_HEADER_HEIGHT} from "../constants/defaults";

import { BottomTabParamList, SearchParamList, NotificationParamList, MapParamList,
    FavoriteParamList, ProfileParamList } from '../types';

import i18n from "../i18n/i18n";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="Map"
            tabBarOptions={{
                activeTintColor: Colors[colorScheme].tint,
                inactiveTintColor: Colors[colorScheme].inactiveTint,
                keyboardHidesTabBar: true,
                style: {height: BOTTOM_TAB_HEIGHT},
            }}
            backBehavior={'history'}
        >
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
        options={{ headerTitle: i18n.t('nav.search_title'),
            headerStyle: {height: NAVIGATOR_HEADER_HEIGHT} }}
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
        component={NotificationScreen}
        options={{ headerTitle: i18n.t('nav.notifications_title'),
            headerStyle: {height: NAVIGATOR_HEADER_HEIGHT} }}
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
                component={MapScreen}
                options={{ headerTitle: i18n.t('nav.map_title'),
                    headerStyle: {height: NAVIGATOR_HEADER_HEIGHT} }}
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
                component={FavoriteScreen}
                options={{ headerTitle: i18n.t('nav.favorite_title'),
                    headerStyle: {height: NAVIGATOR_HEADER_HEIGHT} }}
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
                component={ProfileScreen}
                options={{ headerTitle: i18n.t('nav.profile_title'),
                    headerStyle: {height: NAVIGATOR_HEADER_HEIGHT} }}
            />
        </ProfileStack.Navigator>
    );
}
