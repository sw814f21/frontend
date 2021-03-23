import * as React from 'react';
import { Component } from "react";
import { Dimensions, FlatList, StyleSheet } from 'react-native';
import { smileyFromKey } from "../components/Smileys";
import { Text, View } from '../components/Themed';
import { storageAPI } from "../data/storage";
import { Restaurant } from "../types";
import FavoriteStar from "../components/favorite";


function FavoriteItem({ fave }: { fave: Restaurant }) {
    let smiley = smileyFromKey(fave.cur_smiley).smiley;

    return <View
        style={styles.listItem}
    >
        <View style={styles.iconCol}>
            <FavoriteStar restaurant={fave} />
        </View>
        <View style={styles.iconCol}>{smiley}</View>
        <View style={styles.textCol}>
            <Text style={styles.restaurantName}>{fave.name}</Text>
            <Text style={styles.restaurantAddress}>{fave.address}, {fave.zip_code} {fave.city}</Text>
        </View>
        <Text>6.1km</Text>
    </View>

}

interface FavoriteScreenState {
    favorites: Restaurant[],
}

export default class FavoriteScreen extends Component<any, FavoriteScreenState> {
    constructor(props: any) {
        super(props);
        this.state = { favorites: [], }
    }

    componentDidMount() {
        storageAPI().getFavoriteStoredRestaurants().then(res => {
            this.setState({
                favorites: res
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.favorites}
                    renderItem={({ item }) => <FavoriteItem fave={item} />}
                    keyExtractor={(item, _) => item.id.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    restaurantName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    restaurantAddress: {
        fontSize: 12,
        color: "gray",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    listItem: {
        flex: 1,
        padding: 20,
        flexDirection: "row",
        alignContent: "center"
    },
    iconCol: {
        width: Dimensions.get('window').width * .1,
    },
    textCol: {
        width: Dimensions.get('window').width * .6,
        marginLeft: 10,
    }
});
