import * as React from 'react';
import { StyleSheet, TextInput, FlatList, SectionList, Image } from 'react-native';

import { Text, View } from '../components/Themed';

const DATA = [
  {
    id: 1,
    favorite: true,
    current_smiley: "elite",
    title: 'McDonald\'s Aalborg',
    distance: 5900
  },
  {
    id: 2,
    favorite: true,
    current_smiley: "elite",
    title: 'Kings Pizza',
    distance: 12100
  },
  {
    id: 3,
    favorite: true,
    current_smiley: "elite",
    title: 'Jettes Vafler',
    distance: 5900
  },
  {
    id: 4,
    favorite: true,
    current_smiley: "elite",
    title: 'Café hygge',
    distance: 14000
  },
  {
    id: 5,
    favorite: true,
    current_smiley: "elite",
    title: 'Jensens Fiskehus',
    distance: 14100
  },
  {
    id: 6,
    favorite: true,
    current_smiley: "elite",
    title: 'Burger King Aalborg',
    distance: 15000
  },
  {
    id: 7,
    favorite: true,
    current_smiley: "elite",
    title: 'Bella Italia',
    distance: 16000
  },
];

function Item({ title, distance }: {title: string, distance: number}) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Image
        style={{ width: 50, height: 50 }}
        source={{ uri: 'https://www.findsmiley.dk/Hjaelp/Symbolforklaring/PublishingImages/Sider/default/EliteSm.jpg' }}
      />
      <Text style={styles.title}>{distance}</Text>
    </View>
  );
}

export default function SearchScreen() {
  const [value, onChangeText] = React.useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ost er bare mælkeyeet</Text>
      <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white'}} onChangeText={text => onChangeText(text)} value={value}  placeholder={"Søgeord"} />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} distance={item.distance} />}
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
