import {FontAwesome} from "@expo/vector-icons";
import * as React from "react";
import {storageAPI} from "../data/storage"
import {Restaurant} from "../types";
import {Component} from "react";
import Colors from "../constants/Colors";
import {getTheme} from "./Themed";

interface FavoriteStarState {
    restaurant: Restaurant;
    size?: number;
    style?: {};
}

interface FavoriteStarProps {
    restaurant: Restaurant;
}

export default class FavoriteStar extends Component<FavoriteStarProps, FavoriteStarState>{
    constructor(props: any) {
        super(props);
        this.state = { restaurant: props.restaurant, ...props }
    }

    render() {
        const name = this.state.restaurant.favorite ? 'star' : 'star-o';
        const size = this.state.size? this.state.size : 30;
        const style = this.state.style? this.state.style : {}
        return <FontAwesome
            name={name}
            color={Colors[getTheme()].tint}
            size={size}
            style={style}
            onPress={() => {
                storageAPI().toggleFavoriteStoredRestaurant(this.state.restaurant.id).then(() => {})
                let copy = this.state.restaurant;
                copy.favorite = !copy.favorite;
                this.setState( {restaurant: copy })
            }}
        />
    }
}