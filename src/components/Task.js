import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { FontAwesome } from "@expo/vector-icons";
import { useFonts, Lato_400Regular } from "@expo-google-fonts/lato";
import AppLoading from "expo-app-loading";

const Icon = FontAwesome;

import moment from "moment";
import "moment/locale/pt-br";

import commonStyles from "../commonStyles";

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

    const getRightContent = () => {
        return (
            <TouchableOpacity style={styles.right}>
                <Icon name="trash" size={30} color="#FFFFFF" />
            </TouchableOpacity>
        );
    };

    const getLeftContent = () => {
        return (
            <View style={styles.left}>
                <Icon
                    name="trash"
                    size={20}
                    color="white"
                    style={styles.excludeIcon}
                />
                <Text style={styles.excludeText}>Excluir</Text>
            </View>
        );
    };

    return (
        <Swipeable
            renderRightActions={getRightContent}
            renderLeftActions={getLeftContent}
        >
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={() => props.toggleTask(props.id)}
                >
                    <View style={styles.checkContainer}>
                        {getCheckView(props.doneAt)}
                    </View>
                </TouchableWithoutFeedback>

                <View>
                    <Text style={[styles.desc, doneOrNotStyle]}>
                        {props.desc}
                    </Text>
                    <Text style={[styles.date]}>{formattedDate} </Text>
                </View>
            </View>
        </Swipeable>
    );
};

function getCheckView(doneAt) {
    if (doneAt != null) {
        return (
            <View style={styles.done}>
                <Icon name="check" size={20} color="#FFF"></Icon>
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
        borderBottomWidth: 1,
        alignItems: "center",
        paddingVertical: 10,
        backgroundColor: "white",
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
    right: {
        backgroundColor: "red",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingHorizontal: 20,
    },
    left: {
        flex: 1,
        backgroundColor: "red",
        flexDirection: "row",
        alignItems: "center",
    },
    excludeIcon: {
        marginLeft: 10,
    },
    excludeText: {
        color: "white",
        fontSize: 20,
        margin: 10,
    },
});
