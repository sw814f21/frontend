import * as React from 'react';
import {Dimensions, FlatList, StyleSheet} from 'react-native';

import { Text, View } from '../components/Themed';
import {getFavoriteStoredRestaurants} from "../data/sample_data";
import {Favorite, Notification, NotificationType} from "../types";
import {smileyFromKey} from "../components/Smileys";
import i18n from "../i18n/i18n";
import {FontAwesome} from "@expo/vector-icons";

function FavoriteItem({ fave }: { fave: Favorite }) {
    let smiley = smileyFromKey(fave.restaurant.cur_smiley).smiley;

    return <View
        style={styles.listItem}
    >
        <View style={styles.iconCol}>
            <FontAwesome name='star' color='#236683' size={30} />
        </View>
        <View style={styles.iconCol}>{smiley}</View>
        <View style={styles.textCol}>
            <Text style={styles.restaurantName}>{fave.restaurant.name}</Text>
            <Text style={styles.restaurantAddress}>{fave.restaurant.address}, {fave.restaurant.zip_code} {fave.restaurant.city}</Text>
        </View>
        <Text>6.1km</Text>
    </View>

}

export default function FavoriteScreen() {
    let faves = getFavoriteStoredRestaurants();
    return (
        <View style={styles.container}>
            <FlatList
                data={faves}
                renderItem={({item}) => <FavoriteItem fave={item}/>}
                keyExtractor={(item, _) => item.restaurant.id.toString()}
            />
        </View>
    );
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
