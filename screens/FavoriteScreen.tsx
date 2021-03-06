import * as React from 'react';
import { Component } from "react";
import { FlatList, StyleSheet } from 'react-native';
import ListRestaurantItem from "../components/RestaurantListItem";
import { View } from '../components/Themed';
import { storageAPI } from "../data/storage";
import { Restaurant } from "../types";


interface FavoriteScreenState {
    favorites: Restaurant[],
}

export default class FavoriteScreen extends Component<any, FavoriteScreenState> {
    constructor(props: any) {
        super(props);
        this.state = { favorites: [], }
    }

    componentDidMount() {
        storageAPI().getFavoriteStoredRestaurants().then((res: any) => {
            this.setState({
                favorites: res
            })
        })
    }

    loadFavorites = () => {
        storageAPI().getFavoriteStoredRestaurants().then((res: any) => {
            this.setState({
                favorites: res
            })
        })
    }

    render() {
        this.loadFavorites()
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.favorites}
                    renderItem={({ item }) => <ListRestaurantItem restaurant={item} />}
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
});
