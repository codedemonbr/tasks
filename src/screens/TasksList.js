import React, { Component } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StatusBar,
    ImageBackground,
    StyleSheet,
} from "react-native";

import todayImage from "../../assets/imgs/today.jpg";
import commonStyles from "../commonStyles";

import moment from "moment";
import "moment/locale/pt-br";

import * as Font from "expo-font";
import {
    Lato_100Thin,
    Lato_300Light,
    Lato_400Regular,
    Lato_900Black_Italic,
} from "@expo-google-fonts/lato";

let customFonts = {
    Lato_100Thin,
    Lato_300Light,
    Lato_400Regular,
    Lato_900Black_Italic,
};

export default class TaskList extends Component {
    state = {
        fontsLoaded: false,
    };

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
        this._loadFontsAsync();
    }

    render() {
        const today = moment().locale("pt-br").format("ddd, D [de] MMMM YYYY");

        if (this.state.fontsLoaded) {
            return (
                <SafeAreaView style={styles.container}>
                    <StatusBar />
                    <ImageBackground
                        source={todayImage}
                        style={styles.background}
                    >
                        <View style={styles.titleBar}>
                            <Text style={[styles.title]}>Hoje</Text>
                            <Text style={[styles.subtitle]}>{today}</Text>
                        </View>
                    </ImageBackground>
                    <View style={styles.taskList}>
                        <Text>Tarefa #1</Text>
                        <Text>Tarefa #2</Text>
                        <Text>Tarefa #3</Text>
                        <Text>Tarefa #4</Text>
                    </View>
                </SafeAreaView>
            );
        } else {
            return (
                <View>
                    <Text>Fontes não carregaram</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 3,
    },
    taskList: {
        flex: 7,
    },
    titleBar: {
        flex: 1,
        justifyContent: "flex-end",
    },
    title: {
        fontFamily: "Lato_400Regular",
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20,
    },
    subtitle: {
        fontFamily: "Lato_300Light",
        color: commonStyles.colors.secondary,
        fontSize: 30,
        marginLeft: 20,
        marginBottom: 30,
    },
});
