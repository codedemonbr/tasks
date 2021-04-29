import React, { Component } from "react";
import { View, Text, StatusBar } from "react-native";

export default class TaskList extends Component {
    render() {
        return (
            <View>
                <StatusBar />
                <Text>TaskList</Text>
            </View>
        );
    }
}
