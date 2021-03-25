import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import {StyleSheet, FlatList, Dimensions} from 'react-native';

import {Text, View, TextInput, getTheme} from '../components/Themed';
import { smileyFromKey } from "../components/Smileys";
import { Restaurant } from "../types";
import i18n from "../i18n/i18n";
import { DataAPI } from "../api/api";
import debounce from "lodash.debounce";
import FavoriteStar from "../components/favorite";
import Colors from "../constants/Colors";

function Item({ restaurant }: { restaurant: Restaurant }) {
  let currSmiley = smileyFromKey(restaurant.cur_smiley).smiley;
  return (
    <View style={styles.listItem}>
      <View style={styles.iconCol}>
        <FavoriteStar restaurant={restaurant} />
      </View>
      <View style={styles.iconCol}>{currSmiley}</View>
      <View style={styles.textCol}>
        <Text style={styles.title}>{restaurant.name}</Text>
        <Text style={styles.addressField}>{restaurant.address}, {restaurant.zip_code} {restaurant.city}</Text>
      </View>
      <Text>6.1km</Text>
    </View>
  );
}

interface SearchState {
  restaurants: Restaurant[],
}

export default class SearchScreen extends React.Component<any, SearchState>{

  constructor(props: any) {
    super(props);

    this.state = { restaurants: [] };
  }

  debounced_textchange(value: string) {
    DataAPI().searchRestaurantByName(value).then(r => {
      this.setState({ restaurants: r });
    }).catch(_ => {
      //Do nothing
    })
  }

  reportChange = debounce((value) => this.debounced_textchange(value), 250);

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <FontAwesome
              name='search'
              color={Colors[getTheme()].tint}
              size={20}
          />
          <TextInput
              placeholder={i18n.t('search.placeholder')}
              style={styles.flex}
              onChangeText={e => { this.reportChange(e) }}
              placeholderTextColor={Colors[getTheme()].subText}
          />
        </View>
        <FlatList
          data={this.state.restaurants}
          renderItem={({ item }) => <Item restaurant={item} />}
          keyExtractor={(item, _) => item.id.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addressField: {
    fontSize: 12,
    color: Colors[getTheme()].subText,
  },
  listItem: {
    flex: 1,
    padding: 20,
    flexDirection: "row",
    alignContent: "center"
  },
  flex: {
    flex: 1,
  },
  search: {
    flexDirection: 'row',
    borderColor: Colors[getTheme()].inactiveTint,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  iconCol: {
    width: Dimensions.get('window').width * .1,
  },
  textCol: {
    width: Dimensions.get('window').width * .6,
    marginLeft: 10,
  }
});
