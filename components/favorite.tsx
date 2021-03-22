import {FontAwesome} from "@expo/vector-icons";
import * as React from "react";
import {storageAPI} from "../data/storage"
import {Restaurant} from "../types";
import {Component} from "react";

interface FavoriteStarState {
    restaurant: Restaurant;
}

interface FavoriteStarProps {
    restaurant: Restaurant;
}

export default class FavoriteStar extends Component<FavoriteStarProps, FavoriteStarState>{
    constructor(props: any) {
        super(props);
        this.state = { restaurant: props.restaurant }
        console.log(this.state.restaurant)
    }

    render() {
        const name = this.state.restaurant.favorite ? 'star' : 'star-o';
        return <FontAwesome
            name={name}
            color='#236683'
            size={30}
            onPress={() => {
                storageAPI().toggleFavoriteStoredRestaurant(this.state.restaurant.id).then(() => {})
                let copy = this.state.restaurant;
                copy.favorite = !copy.favorite;
                this.setState( {restaurant: copy })
            }}
        />
    }
}