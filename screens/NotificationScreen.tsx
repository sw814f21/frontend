import * as React from 'react';
import { Dimensions, FlatList, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { storageAPI } from "../data/storage";
import { Notification, NotificationType } from "../types";
import { smileyFromKey } from "../components/Smileys";
import i18n from "../i18n/i18n";
import { Component } from "react";

function NotificationItem({ notif }: { notif: Notification }) {
    let visualItem;
    let text;

    switch (notif.type) {
        case NotificationType.SmileyChange:
            visualItem = smileyFromKey(notif.new_data).smiley;
            text = i18n.t('notification.new_smiley');
            break;
        default:
            visualItem = smileyFromKey(notif.new_data).smiley;
            text = i18n.t('notification.new_smiley');
            break;
    }

    return <View
        style={styles.listItem}
    >
        <Text style={styles.col}>{notif.restaurant.name} {text}</Text>
        <View style={styles.col}>{visualItem}</View>
        <Text style={styles.col}>{notif.date}</Text>
    </View>

}

interface NotificationScreenState {
    notifications: Notification[]
}

export default class NotificationScreen extends Component<any, NotificationScreenState> {

    constructor(props: any) {
        super(props);
        this.state = { notifications: [] };
    }

    componentDidMount() {
        storageAPI().getStoredNotifications().then(res => {
            this.setState({
                notifications: res
            })
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.notifications}
                    renderItem={({ item }) => <NotificationItem notif={item} />}
                    keyExtractor={(item, _) => item.id.toString()}
                />
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
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
    col: {
        width: Dimensions.get('window').width * .33,
    }
});
