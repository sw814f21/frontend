import * as React from 'react';
import { StyleSheet, Dimensions, FlatList, Linking } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import { Restaurant, SmileyReport } from "../types";

import { Text, View } from '../components/Themed';
import { GetAPI } from "../api/api";
import { Component } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { smileyFromKey } from "../components/Smileys";


interface MapScreenProps {
    navigation: any
}

interface MapScreenState {
    region: Region,
    restaurantScreen: boolean
    restaurant?: Restaurant,
    markers: Restaurant[]
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

function ReportItem({ report }: { report: SmileyReport }) {
    let smiley = smileyFromKey(report.smiley)

    return (
        <View
            style={styles.listItem}
        >
            <View style={styles.iconCol}>
                {smiley.smiley}
            </View>
            <View style={styles.nameCol}>
                <Text >{report.date}</Text>
                <Text >{smiley.smileyText}</Text>
            </View>
            <View style={styles.iconCol}>
                <FontAwesome
                    name={"external-link"}
                    color={"#236683"}
                    size={40}
                    onPress={() => Linking.openURL(report.url)}
                />
            </View>
        </View>
    )
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
            restaurant: undefined,
            markers: [],
        }
    }

    componentDidMount() {
        GetAPI().getRestaurants().then(res => {
            this.setState({
                markers: res
            })
        })
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
            coordinate={{ latitude: obj.geo_lat, longitude: obj.geo_long }}
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
                    initialRegion={this.state.region}
                >
                    {
                        this.state.markers.map((smileyProps: Restaurant) => (
                            this.renderSmileyMarker(smileyProps)
                        ))
                    }
                </MapView>
            </View>
        );
    }

    renderRestaurant() {
        if (this.state.restaurant) {
            let smiley = smileyFromKey(this.state.restaurant.cur_smiley);

            return (
                <View style={styles.container}>
                    {this.renderMap(styles.restaurantMap)}
                    <View
                        style={styles.restaurant}

                    >
                        <View style={styles.listHeader}>
                            <View style={styles.iconCol}>
                                <FontAwesome name={'star-o'} color={"#236683"} size={40} />
                            </View>
                            <View style={styles.nameCol}>
                                <Text style={styles.title}>{this.state.restaurant.name}</Text>
                                <Text >{this.state.restaurant.address}</Text>
                                <Text >{this.state.restaurant.zip_code} {this.state.restaurant.city}</Text>
                            </View>
                            <View style={styles.iconCol}>
                                {smiley.smiley}
                            </View>
                        </View>

                        <FlatList
                            data={this.state.restaurant.reports}
                            renderItem={({ item }) => <ReportItem report={item} />}
                            keyExtractor={(item, _) => item.date.toString()}
                        />

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
    title: {
        fontSize: 20
    },
    listHeader: {
        padding: 20,
        marginHorizontal: 0,
        flexDirection: 'row',
        maxHeight: "30%"
    },
    listItem: {
        flex: 1,
        padding: 20,
        flexDirection: "row",
        alignContent: "center"
    },
    iconCol: {
        width: Dimensions.get('window').width * .2,
    },
    nameCol: {
        width: Dimensions.get('window').width * .5,
    }
});


