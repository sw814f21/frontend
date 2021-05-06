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

const PAGE = 20;

interface SearchState {
  restaurants: Restaurant[],
  location: GeoCoordinate,
  offset: number;
  limit: number;
  searchQuery: string;
}

export default class SearchScreen extends React.Component<any, SearchState>{

  constructor(props: any) {
    super(props);

    this.state = { restaurants: [], location: {lat: 0, lng: 0}, offset: 0, limit: PAGE, searchQuery: ''};
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
    this.setState({restaurants: []})
    fillSearchData(value, this.state.location, DataAPI(), storageAPI(), PAGE, 0).then(res => {
      this.setState({restaurants: res, searchQuery: value, limit: PAGE, offset: 0});
    })
  }

  updateSearchItems = (count: number) => {
    if (count > (PAGE / 2)) {
      fillSearchData(this.state.searchQuery, this.state.location, DataAPI(), storageAPI(), this.state.limit, this.state.offset).then(res => {
        this.setState({
          restaurants: Array.from(new Set([...this.state.restaurants, ...res])),
          offset: this.state.offset + PAGE,
          limit: this.state.limit + PAGE
        });
      })
  }
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
          data={this.state.restaurants.sort((a, b) => {
            if (a.distance === undefined) a.distance = "0"
            if (b.distance === undefined) b.distance = "0"
            return parseInt(a.distance) - parseInt(b.distance)
          })}
          renderItem={({ item }) => <RestaurantListItem restaurant={item} />}
          keyExtractor={(item, _) => item.id.toString()}
          onEndReached={() => {this.updateSearchItems(this.state.restaurants.length)}}
          onEndReachedThreshold={0.7}
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
