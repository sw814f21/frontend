import {FontAwesome} from "@expo/vector-icons";
import * as React from "react";
import {storageAPI} from "../data/storage"
import {Restaurant} from "../types";

export default function FavoriteStar({ restaurant }: { restaurant: Restaurant }) {
    const name = restaurant.favorite ? 'star' : 'star-o';
    return <FontAwesome
        name={name}
        color='#236683'
        size={30}
        onPress={() => storageAPI().toggleFavoriteStoredRestaurant(restaurant.id).then(() => {})}
    />
}