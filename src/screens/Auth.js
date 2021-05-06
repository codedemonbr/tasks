import React, { Component } from "react";
import {
    ImageBackground,
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Platform,
} from "react-native";

import backgroundImage from "../../assets/imgs/login.jpg";
import commonStyles from "../commonStyles";

export default class Auth extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        stageNew: true,
    };

    render() {
        return (
            <ImageBackground source={backgroundImage} style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {this.state.stageNew
                            ? "Create your account"
                            : "Insert your data"}
                    </Text>

                    {this.state.stageNew && (
                        <TextInput
                            placeholder="Name"
                            value={this.state.name}
                            style={styles.input}
                            onChange={(name) => this.setState({ name })}
                        />
                    )}
                    <TextInput
                        placeholder="E-mail"
                        value={this.state.email}
                        style={styles.input}
                        onChangeText={(email) => this.setState({ email })}
                    />
                    <TextInput
                        placeholder="Password"
                        value={this.state.password}
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({ password })}
                    />
                    {this.state.stageNew && (
                        <TextInput
                            placeholder="Confirm password"
                            value={this.state.confirmPassword}
                            style={styles.input}
                            secureTextEntry={true}
                            onChangeText={(confirmPassword) =>
                                this.setState({ confirmPassword })
                            }
                        />
                    )}
                    <TouchableOpacity>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? "Register" : "Enter"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: commonStyles.colors.secondary,
        fontSize: 70,
        marginBottom: 10,
    },
    input: {
        backgroundColor: "#FFF",
        marginTop: 10,
        padding: Platform.OS == "ios" ? 15 : 10,
    },
    formContainer: {
        backgroundColor: "rgba(0,0,0,0.8)",
        padding: 20,
        width: "90%",
    },
    button: {
        backgroundColor: "#080",
        marginTop: 10,
        padding: 10,
        alignItems: "center",
    },
    buttonText: { color: "#FFF", fontSize: 20 },
    subtitle: {
        color: "#FFF",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 10,
    },
});
