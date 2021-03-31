import React, { Component } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Colors from "../constants/Colors";
import { Restaurant } from '../types';
import FavoriteStar from "./FavoriteStar";
import { smileyFromKey } from "./Smileys";
import { getTheme, Text, View } from './Themed';

interface RestaurantItemListState {
  restaurant: Restaurant,
}

interface RestaurantItemListProps {
  restaurant: Restaurant,
}
export default class RestaurantItemList extends Component<RestaurantItemListProps, RestaurantItemListState> {

  constructor(props: any) {
    super(props);
    this.state = {
      restaurant: props.restaurant
    }
  }

  favoriteToggled() {
    if (this.state.restaurant !== undefined) {
      let copy = this.state.restaurant;
      copy.favorite = !copy.favorite;
      this.setState({ restaurant: copy });
    }
  }

  render() {

    let smiley = smileyFromKey(this.state.restaurant.cur_smiley).smiley;

    return <View style={styles.listItem} >
      <View style={styles.iconCol}>
        <FavoriteStar restaurant={this.state.restaurant} onToggleFavorite={() => { this.favoriteToggled() }} />
      </View>
      <View style={styles.iconCol}>{smiley}</View>
      <View style={styles.textCol}>
        <Text style={styles.restaurantName}>{this.state.restaurant.name}</Text>
        <Text style={styles.restaurantAddress}>{this.state.restaurant.address}, {this.state.restaurant.zip_code} {this.state.restaurant.city}</Text>
      </View>
      <Text>{this.state.restaurant.distance}</Text>
    </View>
  }

}

const styles = StyleSheet.create({
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  restaurantAddress: {
    fontSize: 12,
    color: Colors[getTheme()].inactiveTint,
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