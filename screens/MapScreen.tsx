import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import {Restaurant} from "../types";

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { getRestaurants } from "../api/sample_api";
import { SmileyMarker } from "../components/Smileys";


function getInitialState() {
    return {
        region: {
            latitude: 56.1915,
            longitude: 11.6345,
            latitudeDelta: 1.9585,
            longitudeDelta: 6.0695,
        }
    }
}

function getMarkers() {
    let data = getRestaurants();
}

export default function MapScreen() {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                showsUserLocation={true}
                initialRegion={ getInitialState().region }
            >
                {getRestaurants().restaurants.map((smileyProps: Restaurant) => (
                    SmileyMarker(smileyProps)
                ))}
            </MapView>
        </View>
    );
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
});
