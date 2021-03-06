import { FontAwesome } from "@expo/vector-icons";
import * as React from 'react';
import { Component } from "react";
import { Dimensions, FlatList, Linking, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { DataAPI } from "../api/api";
import FavoriteStar from "../components/FavoriteStar";
import { smileyFromKey } from "../components/Smileys";
import { getTheme, Text, View } from '../components/Themed';
import Colors from "../constants/Colors";
import { DEFAULT_REGION, BOTTOM_TAB_HEIGHT, NAVIGATOR_HEADER_HEIGHT } from "../constants/defaults";
import { storageAPI } from "../data/storage";
import { MapParamRestaurant, MapRegion, Restaurant, SmileyReport, SparseRestaurant } from "../types";
import * as Location from 'expo-location';
import { formatDateISO } from "../data/LocationUtil";



interface MapScreenProps {
    navigation: any,
    route: any,
}

interface MapScreenState {
    region: MapRegion,
    restaurantScreen: boolean
    restaurant?: Restaurant,
    markers: SparseRestaurant[]
}

interface MapStyle {
    width: number,
    height: number
}

function ReportItem({ report }: { report: SmileyReport }) {
    let smiley = smileyFromKey(report.rating)

    return (
        <View
            style={styles.listItem}
        >
            <View style={styles.iconCol}>
                {smiley.smiley}
            </View>
            <View style={styles.nameCol}>
                <Text >{formatDateISO(report.date)}</Text>
                <Text >{smiley.smileyText}</Text>
            </View>
            <View style={styles.iconCol}>
                <FontAwesome
                    name={"external-link"}
                    color={Colors[getTheme()].tint}
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
            region: DEFAULT_REGION,
            restaurantScreen: false,
            restaurant: undefined,
            markers: [],
        }
    }

    componentDidMount() {
        DataAPI().getSparseRestaurants().then(res => {
            this.setState({
                markers: res
            })
        })
        Location.getCurrentPositionAsync(
            {
                accuracy: Location.LocationAccuracy.Balanced
            }
        ).then((location) => {
            this.setState({
                region: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05
                }
            })
        }).catch(_ => { });
    }

    render_restaurant_params() {
        const params: MapParamRestaurant = this.props.route.params;
        if (params == undefined) {
            return;
        }
        if (params.restaurantid == undefined) {
            return;
        }
        const resid: number = params.restaurantid;
        this.props.route.params = undefined;
        this.openRestaurant({
            id: params.restaurantid,
            lng: 0,
            lat: 0,
        });
    }

    openRestaurant(markerData: SparseRestaurant) {
        DataAPI().getRestaurant(markerData.id).then(res => {
            storageAPI().enrichRestaurant(res).then((r: any) => {
                this.setState({
                    region: {
                        latitude: res.latitude,
                        longitude: res.longitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05
                    },
                    restaurantScreen: true,
                    restaurant: r
                });
            }
            ).catch((_: any) => {
                //Do nothing
            });
        }).then(_ => {
            //Do nothing
        });
    }

    renderSmileyMarker(obj: SparseRestaurant) {
        return (<Marker
            coordinate={{ latitude: obj.lat, longitude: obj.lng }}
            key={obj.id}
            onPress={() => this.openRestaurant(obj)}
        >
        </Marker>)
    }

    favoriteToggled() {
        if (this.state.restaurant !== undefined) {
            let copy = this.state.restaurant;
            copy.favorite = !copy.favorite;
            this.setState({ restaurant: copy });
        }
    }

    renderMap(mapStyle: MapStyle = styles.map) {
        return (
            <View style={styles.container}>
                <MapView
                    style={mapStyle}
                    showsUserLocation={true}
                    initialRegion={this.state.region}
                    region={this.state.region}  // android
                >
                    {
                        this.state.markers.map((markerData: SparseRestaurant) => (
                            this.renderSmileyMarker(markerData)
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
                        <View
                            style={styles.closeBtn}
                        >
                            <FontAwesome
                                name={"chevron-down"}
                                color={Colors[getTheme()].tint}
                                size={30}
                                onPress={() => this.setState({
                                    restaurant: undefined,
                                    restaurantScreen: false
                                })}
                            />
                        </View>
                        <View style={styles.listHeader}>
                            <View style={styles.iconCol}>
                                <FavoriteStar restaurant={this.state.restaurant} size={40} onToggleFavorite={() => { this.favoriteToggled() }} />
                            </View>
                            <View style={styles.nameCol}>
                                <Text style={styles.title}>{this.state.restaurant.name}</Text>
                                <Text >{this.state.restaurant.address}</Text>
                                <Text >{this.state.restaurant.zipcode} {this.state.restaurant.city}</Text>
                            </View>
                            <View style={styles.iconCol}>
                                {smiley.smiley}
                            </View>
                        </View>

                        <FlatList
                            data={this.state.restaurant.reports}
                            renderItem={({ item }) => <ReportItem report={item} />}
                            keyExtractor={(item, _) => item.id.toString()}
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
        this.render_restaurant_params();

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
        height: Dimensions.get('window').height - BOTTOM_TAB_HEIGHT - NAVIGATOR_HEADER_HEIGHT,
    },
    restaurantMap: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * .4,
    },
    restaurant: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * .6,
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
    },
    closeBtn: {
        alignItems: "center",
    }
});


