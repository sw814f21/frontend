import {FontAwesome} from "@expo/vector-icons";
import * as React from "react";
import {storageAPI} from "../data/storage"
import {Restaurant} from "../types";
import {Component} from "react";
import Colors from "../constants/Colors";
import {getTheme} from "./Themed";

interface FavoriteStarProps {
    restaurant: Restaurant;
    size?: number;
    style?: {};
}

export default class FavoriteStar extends Component<FavoriteStarProps, any>{
    constructor(props: any) {
        super(props);
    }

    render() {
        return <FontAwesome
            name={this.props.restaurant.favorite ? 'star' : 'star-o'}
            color={Colors[getTheme()].tint}
            size={this.props.size ? this.props.size : 40}
            style={this.props.style ? this.props.style : {}}
            onPress={() => {
                storageAPI().toggleFavoriteStoredRestaurant(this.props.restaurant.id).then(() => {})
                let copy = this.props.restaurant;
                copy.favorite = !copy.favorite;
                console.log('changed favorite')
                this.setState( {restaurant: copy })
            }}
        />
    }
}