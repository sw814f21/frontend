import { FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';
import debounce from "lodash.debounce";
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { UrlTile } from 'react-native-maps';
import { DataAPI } from "../api/api";
import RestaurantListItem from '../components/RestaurantListItem';
import { getTheme, TextInput, View } from '../components/Themed';
import Colors from "../constants/Colors";
import { storageAPI } from "../data/storage";
import i18n from "../i18n/i18n";
import { GeoCoordinate, Restaurant } from '../types';
import { fillSearchData } from '../util/util';


interface SearchState {
  restaurants: Restaurant[],
  location: GeoCoordinate,
}

export default class SearchScreen extends React.Component<any, SearchState>{

  constructor(props: any) {
    super(props);

    this.state = { restaurants: [], location: {lat: 0, lng: 0}};
  }

  updateLocation = () => {
    Location.getCurrentPositionAsync().then(res => { 
      this.setState({location: {lat: res.coords.latitude, lng: res.coords.longitude}});
     }).catch(e => {console.log("Cant get location"); console.log(e)});
  }

  componentDidMount() {
    Location.requestPermissionsAsync()
      .then(this.updateLocation)
      .catch(() => console.log('couldnt get permission'));
  }

  debounced_textchange(value: string) {
    // DataAPI().searchRestaurantByName(value)
    // .then(restaurants => {
    //   return storageAPI().enrichRestaurants(restaurants, this.state.location);
    // })
    // .then(enriched => {
    //   this.setState({ restaurants: enriched.slice(0,5) }); })
    // .catch(e => {
    //   console.error(e);
    // });
    fillSearchData(value, this.state.location, DataAPI(), storageAPI()).then(res => {
      this.setState({restaurants: res});
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
          renderItem={({ item }) => <RestaurantListItem restaurant={item} />}
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
