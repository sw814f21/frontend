import * as React from 'react';
import {Dimensions, FlatList, StyleSheet, Switch} from 'react-native';

import { Text, View } from '../components/Themed';
import {SettingItem, SettingType} from "../types";
import {smileyFromKey} from "../components/Smileys";
import i18n from "../i18n/i18n";
import {FontAwesome} from "@expo/vector-icons";
import {getAllSettings} from "../data/sample_data";

function ProfileItem({ setting }: { setting: SettingItem }) {
    let settingComponent;

    switch (setting.type) {
        case SettingType.Switch:
            settingComponent = <Switch
                    trackColor={ {false: "#BDBDBD", true: "#236683"} }
                    thumbColor={"white"}
                    onValueChange={() => {}} // change setting state
                    value={setting.state}
                />
            break;
        default:
            settingComponent = <Switch
                trackColor={ {false: "#BDBDBD", true: "#236683"} }
                thumbColor={"white"}
                onValueChange={() => {}}
                value={setting.state}
            />
            break;
    }

    return <View
        style={styles.listItem}
    >
        <View style={styles.textCol}>
            <Text style={styles.settingName}>{setting.name}</Text>
            <Text style={styles.settingDescription}>{setting.description}</Text>
        </View>
        <View style={styles.settingCol}>{settingComponent}</View>
    </View>

}

export default function ProfileScreen() {
    let settings = getAllSettings();
    return (
        <View style={styles.container}>
            <FlatList
                data={settings}
                renderItem={({item}) => <ProfileItem setting={item}/>}
                keyExtractor={(item, _) => item.id.toString()}
            />
        </View>
    );
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
