import * as React from 'react';
import { Dimensions, FlatList, StyleSheet, Switch, Button } from 'react-native';

import { Text, View } from '../components/Themed';
import { SettingItem, SettingType } from "../types";
import { storageAPI } from "../data/storage";
import {recreateTables, insertRestaurants, getFavoriteStoredRestaurants} from "../data/sqlite";
import { Component } from "react";
import Constants from "expo-constants";
import {schedulePushNotification} from "../permissions/permissions";

const DEFAULT_SETTINGS: SettingItem[] = [
    {
        id: 0,
        name: "Pushnotifikationer",
        description: "Få besked når der sker en opdatering på din favoritrestaurant",
        state: true,
        type: 0
    }
]

class ProfileItem extends Component<any, ProfileItemState> {
    constructor(props: any) {
        super(props);
        this.state = { setting: props.setting };
    }

    renderElement(): JSX.Element {
        let settingComponent: JSX.Element;
        switch (this.state.setting.type) {
            case SettingType.Switch:
                settingComponent = <Switch
                    trackColor={{ false: "#BDBDBD", true: "#236683" }}
                    thumbColor={"white"}
                    onValueChange={v => { this.updateSwitchSetting(v) }} // change setting state
                    value={this.state.setting.state}
                />
                break;
            default:
                settingComponent = <Switch
                    trackColor={{ false: "#BDBDBD", true: "#236683" }}
                    thumbColor={"white"}
                    onValueChange={() => { }}
                    value={this.state.setting.state}
                />
                break;
        }
        return settingComponent;
    }


    updateSwitchSetting(newvalue: boolean) {
        let copy = this.state.setting;
        copy.state = newvalue;
        storageAPI(true).storeSettings([copy]).then(() => {
            this.setState({ setting: copy });
        });
    }


    render() {

        return <View
            style={styles.listItem}
        >
            <View style={styles.textCol}>
                <Text style={styles.settingName}>{this.state.setting.name}</Text>
                <Text style={styles.settingDescription}>{this.state.setting.description}</Text>
            </View>
            <View style={styles.settingCol}>{this.renderElement()}</View>
        </View>
    }
}
function DevTools() {
    return <View>
        <Button title='Recreate local database' onPress={recreateTables} />
        <Button title='Load sample favorites' onPress={loadFavorites} />
        <Button title='Load sample notifications' onPress={test_something} />
        <Button title={'Print restaurants'} onPress={() => storageAPI().getFavoriteStoredRestaurants().then(res => console.log(res))} />
        <Button title={'Test notification'} onPress={testNotification} />
    </View>
}

function test_something() {
    console.log('hello world');
}


function loadFavorites() {
    const restaurants = require('../data/sample_data/sample_favorite.json');
    storageAPI().insertRestaurants(restaurants);
}

function testNotification() {
    schedulePushNotification({
        title: 'hello',
        body: 'world',
        data: {data: 'yeet'}
    }).then(() => {console.log('hi')})
}

interface ProfileScreenState {
    settings: SettingItem[],
    devmode: boolean,
}
interface ProfileItemState {
    setting: SettingItem,
}

export default class ProfileScreen extends Component<any, ProfileScreenState> {

    constructor(props: any) {
        super(props);
        let newDevmode = !(Constants.manifest.extra.useSampledata === false);
        this.state = { settings: DEFAULT_SETTINGS, devmode: newDevmode };
    }

    componentDidMount() {
        storageAPI(true).getAllSettings().then(res => {

            if (res.length !== 0) {
                let modified = false;
                let newsettings: SettingItem[] = [];
                for (const setting of res) {
                    let foundsetting = DEFAULT_SETTINGS.find(element => { return element.id === setting.id });

                    if (foundsetting !== undefined) {
                        if (foundsetting.state !== setting.state) {
                            modified = true;
                        }
                        foundsetting.state = setting.state;
                        newsettings.push(foundsetting)
                    }
                }

                if (modified) {

                    this.setState({ settings: newsettings });
                }
            };
        });
    }

    render() {

        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.settings}
                    renderItem={({ item }) => <ProfileItem setting={item} />}
                    keyExtractor={(item, _) => item.id.toString()}
                />
                {this.state.devmode && <DevTools></DevTools>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    settingName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    settingDescription: {
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
    settingCol: {
        width: Dimensions.get('window').width * .1,
    },
    textCol: {
        width: Dimensions.get('window').width * .8,
    }
});
