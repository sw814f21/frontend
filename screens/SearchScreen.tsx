import * as React from 'react';
import { StyleSheet, FlatList, Image } from 'react-native';

import { Text, View, TextInput } from '../components/Themed';
import { getRestaurants } from "../api/sample_api";
import { SmileyHappy, SmileyNeutral, SmileyOkay, SmileySad } from "../components/Smileys";
import { Smiley } from "../types";

const test_data = getRestaurants();

const DATA = getRestaurants()['restaurants'];

function Item({ title, address, smiley}: {title: string, address: string, smiley: number}) {
  let currSmiley;
  switch (smiley) {
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
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      {currSmiley()}
      <Text style={styles.title}>{address}</Text>
    </View>
  );
}

export default function SearchScreen() {
  const [value, onChangeText] = React.useState("");
  return (
    <View style={styles.container}>
      <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1}} placeholder={"Søgeord"} />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.name} address={item.address} smiley={item.cur_smiley} />}
      />
    </View>
  );
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  item: {
    backgroundColor: 'hotpink',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
