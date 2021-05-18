import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { Dimensions, Pressable, StyleSheet } from 'react-native';
import Colors from "../constants/Colors";
import { formatDistance } from "../data/LocationUtil";
import { Restaurant } from "../types";
import FavoriteStar from "./FavoriteStar";
import { smileyFromKey } from "./Smileys";
import { getTheme, Text, View } from './Themed';

interface RestaurantItemListState {
  restaurant: Restaurant,
}

interface RestaurantItemListProps {
  restaurant: Restaurant,
}
interface RestaurantItemListNavigationProps extends RestaurantItemListProps {
  navigation: any,
}
class RestaurantItemList extends Component<RestaurantItemListNavigationProps, RestaurantItemListState> {

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
  navigate_restaurant() {
    this.props.navigation.navigate('Map', {
      screen: "MapScreen",
      params: {
        restaurantid: this.state.restaurant.id
      }
    });
  }

  render() {

    let smiley = smileyFromKey(this.state.restaurant.cur_smiley).smiley;

    return <Pressable onPress={() => this.navigate_restaurant()}>
      <View style={styles.listItem} >
        <View style={styles.iconCol}>
          <FavoriteStar restaurant={this.state.restaurant} onToggleFavorite={() => { this.favoriteToggled() }} />
        </View>
        <View style={styles.iconCol}>{smiley}</View>
        <View style={styles.textCol}>
          <Text style={styles.restaurantName}>{this.state.restaurant.name}</Text>
          <Text style={styles.restaurantAddress}>{this.state.restaurant.address}, {this.state.restaurant.zipcode} {this.state.restaurant.city}</Text>
        </View>
        <Text>{formatDistance(this.state.restaurant.distance)}</Text>
      </View>
    </Pressable>
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


export default function (props: RestaurantItemListProps) {
  const navigation = useNavigation();

  return <RestaurantItemList {...props} navigation={navigation} />;
}