import { FontAwesome } from "@expo/vector-icons";
import React, { Component } from "react";
import Colors from "../constants/Colors";
import { storageAPI } from "../data/storage";
import { Restaurant } from "../types";
import { getTheme } from "./Themed";

interface FavoriteStarProps {
    restaurant: Restaurant;
    size?: number;
    style?: {};
    onToggleFavorite?: Function;
}

export default class FavoriteStar extends Component<FavoriteStarProps, any>{
    toggleFavorite() {
        console.log(this.props.restaurant.id)
        storageAPI().toggleFavoriteStoredRestaurant(this.props.restaurant).then(() => {
            if (this.props.onToggleFavorite !== undefined) {
                this.props.onToggleFavorite();
            }
        });
    }

    render() {
        return <FontAwesome
            name={this.props.restaurant.favorite ? 'star' : 'star-o'}
            color={Colors[getTheme()].tint}
            size={this.props.size ? this.props.size : 40}
            style={this.props.style ? this.props.style : {}}
            onPress={() => { this.toggleFavorite() }}
        />
    }
}