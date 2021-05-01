import React, { Component } from "react";
import {
    Modal,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Text,
    TextInput,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import commonStyles from "../commonStyles";

const initialState = { desc: "", date: new Date() };
export default class AddTask extends Component {
    state = {
        ...initialState,
    };

    getDatePicker = () => {
        return (
            <DateTimePicker
                value={this.state.date}
                onChange={(_, date) => this.setState({ date })}
                mode="date"
            />
        );
    };

    render() {
        return (
            <Modal
                transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType="slide"
            >
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Informe a Descrição..."
                        onChangeText={(desc) => this.setState({ desc })}
                        value={this.state.desc}
                    />
                    {this.getDatePicker()}
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    container: {
        backgroundColor: "#fff",
    },
    header: {
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,
        textAlign: "center",
        padding: 15,
        fontSize: 18,
    },
    input: {
        height: 40,
        margin: 15,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#e3e3e3",
        borderRadius: 6,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.today,
    },
});
