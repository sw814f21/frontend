import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import {Restaurant} from "../types";

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { getRestaurants } from "../api/sample_api";
import {Component} from "react";


interface MapScreenProps {
    navigation: any
}

interface MapScreenState {
    region: Region,
    restaurantScreen: boolean
    restaurant?: Restaurant
}

interface Region {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number
}

interface MapStyle {
    width: number,
    height: number
}


export default class MapScreen extends Component<MapScreenProps, MapScreenState>{

    constructor(props: any) {
        super(props);
        this.state = {
            region: {
                latitude: 56.1915,
                longitude: 11.6345,
                latitudeDelta: 1.9585,
                longitudeDelta: 6.0695,
            },
            restaurantScreen: false,
            restaurant: undefined
        }
    }

    openRestaurant(obj: Restaurant) {
        this.setState({
            region: {
                latitude: obj.geo_lat,
                longitude: obj.geo_long,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05
            },
            restaurantScreen: true,
            restaurant: obj
        })
    }

    renderSmileyMarker(obj: Restaurant) {
        return (<Marker
            coordinate={{latitude: obj.geo_lat, longitude: obj.geo_long}}
            key={obj.id}
            //image={require('../assets/images/favicon.png')}
            onPress={() => this.openRestaurant(obj)}
        >
        </Marker>)
    }

    renderMap(mapStyle: MapStyle = styles.map) {
        return (
            <View style={styles.container}>
                <MapView
                    style={mapStyle}
                    showsUserLocation={true}
                    initialRegion={ this.state.region }
                >
                    {getRestaurants().restaurants.map((smileyProps: Restaurant) => (
                        this.renderSmileyMarker(smileyProps)
                    ))}
                </MapView>
            </View>
        );
    }

    renderRestaurant() {
        if (this.state.restaurant) {
            return (
                <View style={styles.container}>
                    {this.renderMap(styles.restaurantMap)}
                    <View
                        style={styles.restaurant}
                    >
                        <Text>{this.state.restaurant.name}</Text>

                    </View>
                </View>
            );
        }
        else {
            return this.renderMap()
        }
    }

    render() {
        if (this.state.restaurantScreen) return this.renderRestaurant();
        else return this.renderMap()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    restaurantMap: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * .4,
    },
    restaurant: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * .6,
        backgroundColor: "white"
    },
});
