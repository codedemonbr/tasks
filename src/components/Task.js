import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import commonStyles from "../commonStyles";
import { useFonts, Lato_400Regular } from "@expo-google-fonts/lato";
import AppLoading from "expo-app-loading";

import moment from "moment";
import "moment/locale/pt-br";

export default (props) => {
    let [fontsLoaded] = useFonts({ Lato_400Regular });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    const doneOrNotStyle =
        props.doneAt != null ? { textDecorationLine: "line-through" } : {};

    const date = props.doneAt ? props.doneAt : props.estimateAt;
    const formattedDate = moment(date)
        .locale("pt-br")
        .format("ddd, D [de] MMMM");

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback
                onPress={() => props.toggleTask(props.id)}
            >
                <View style={styles.checkContainer}>
                    {getCheckView(props.doneAt)}
                </View>
            </TouchableWithoutFeedback>

            <View>
                <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                <Text style={[styles.date]}>{formattedDate} </Text>
            </View>
        </View>
    );
};

function getCheckView(doneAt) {
    if (doneAt != null) {
        return (
            <View style={styles.done}>
                <FontAwesome name="check" size={20} color="#FFF"></FontAwesome>
            </View>
        );
    } else {
        return <View style={styles.pending}></View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderColor: "#AAA",
        borderWidth: 1,
        alignItems: "center",
        paddingVertical: 10,
    },
    checkContainer: {
        width: "20%",
        alignItems: "center",
        justifyContent: "center",
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: "#555",
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        backgroundColor: "#4d7031",
        alignItems: "center",
        justifyContent: "center",
    },
    desc: {
        fontFamily: "Lato_400Regular",
        color: commonStyles.colors.mainText,
        fontSize: 15,
    },
    date: {
        fontFamily: "Lato_400Regular",
        color: commonStyles.colors.subText,
        fontSize: 12,
    },
});
