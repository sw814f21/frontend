import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import {Text, View, TextInput, getTheme} from '../components/Themed';
import { smileyFromKey } from "../components/Smileys";
import { Restaurant } from "../types";
import i18n from "../i18n/i18n";
import { DataAPI } from "../api/api";
import debounce from "lodash.debounce";
import FavoriteStar from "../components/favorite";
import Colors from "../constants/Colors";

function Item({ restaurant }: { restaurant: Restaurant }) {
  let currSmiley = smileyFromKey(restaurant.cur_smiley, { width: '10%' }).smiley;
  return (
    <View style={styles.listitem}>
      <FavoriteStar
          restaurant={restaurant}
          size={40}
          style={styles.icon}
      />
      {currSmiley}
      <View>
        <Text style={styles.title}>{restaurant.name}</Text>
        <Text style={styles.addressField}>{restaurant.address}</Text>
      </View>
      <View style={{ marginLeft: 'auto' }}>
        <Text>6.1km</Text>
      </View>
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
              style={styles.icon}
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  addressField: {
    color: Colors[getTheme()].subText
  },
  listitem: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
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
});
