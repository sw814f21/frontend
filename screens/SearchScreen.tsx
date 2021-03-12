import { FontAwesome } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, FlatList, Image } from 'react-native';

import { Text, View, TextInput } from '../components/Themed';
import { SmileyHappy, SmileyNeutral, SmileyOkay, SmileySad } from "../components/Smileys";
import { Restaurant, Smiley } from "../types";
import i18n from "../i18n/i18n";
import { getAllStoredRestaurants } from "../data/data";

function Item({ restaurant }: { restaurant: Restaurant }) {
  let currSmiley;
  switch (restaurant.cur_smiley) {
    case Smiley.Bad:
      currSmiley = SmileySad;
      break;
    case Smiley.Decent:
      currSmiley = SmileyOkay;
      break
    case Smiley.Good:
      currSmiley = SmileyHappy;
      break;
    case Smiley.Neutral:
      currSmiley = SmileyNeutral;
      break;
    default:
      currSmiley = SmileyHappy;
      break;
  }
  return (
    <View style={styles.listitem}>
      <FontAwesome name='star-o' color='white' size={30} style={styles.icon} />
      {currSmiley({ width: '10%' })}
      <View>
        <Text style={styles.title}>{restaurant.name}</Text>
        <Text>{restaurant.address}</Text>
      </View>
      <View style={{ marginLeft: 'auto' }}>
        <Text>6.1km</Text>
      </View>
    </View>
  );
}

interface SearchState {
  restaurants: Restaurant[],
  isLoading: boolean
}

export default class SearchScreen extends React.Component<{}, SearchState> {

  constructor(props: any) {
    super(props);
    this.state = { restaurants: [], isLoading: false, };
  }

  updateList() {
    this.setState({ isLoading: true })
    getAllStoredRestaurants().then((result: any) => {
      let newrows = result[0].rows;
      console.log(newrows);
      this.setState({ restaurants: newrows, isLoading: false });
    });
  }

  componentDidMount() {
    this.updateList();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <FontAwesome name='search' color='white' size={20} style={styles.icon} />
          <TextInput placeholder={i18n.t('search.placeholder')} style={styles.flex} />
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
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
