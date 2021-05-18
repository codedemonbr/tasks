import React, { Component } from "react";
import {
    ImageBackground,
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Alert,
} from "react-native";
import axios from "axios";

import backgroundImage from "../../assets/imgs/login.jpg";
import commonStyles from "../commonStyles";
import AuthInput from "../components/AuthInput";

import { server, showError, showSuccess } from "../common";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    stageNew: false,
};

export default class Auth extends Component {
    state = {
        ...initialState,
    };

    signinOrSignup = () => {
        if (this.state.stageNew) {
            this.signup();
        } else {
            this.signin();
        }
    };

    signup = async () => {
        try {
            await axios.post(`${server}/signup`, {
                name: this.state.name.trim(),
                email: this.state.email.trim(),
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
            });

            showSuccess("Registered User!");
            this.setState({ ...initialState });
        } catch (e) {
            showError(e);
        }
    };

    signin = async () => {
        try {
            const res = await axios.post(`${server}/signin`, {
                email: this.state.email.trim(),
                password: this.state.password,
            });

            AsyncStorage.setItem("userData", JSON.stringify(res.data));

            axios.defaults.headers.common[
                "Authorization"
            ] = `bearer ${res.data.token}`;
            this.props.navigation.navigate("Home", res.data);
        } catch (e) {
            showError(e);
        }
    };

    render() {
        const validations = [];
        validations.push(this.state.email && this.state.email.includes("@"));
        validations.push(
            this.state.password && this.state.password.length >= 6
        );

        if (this.state.stageNew) {
            validations.push(
                this.state.name && this.state.name.trim().length >= 3
            );
            validations.push(
                this.state.password === this.state.confirmPassword
            );
        }

        const validForm = validations.reduce((t, a) => t && a);

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
                        <AuthInput
                            icon="user"
                            placeholder="Name"
                            value={this.state.name}
                            style={styles.input}
                            onChangeText={(name) => this.setState({ name })}
                        />
                    )}
                    <AuthInput
                        icon="at"
                        placeholder="E-mail"
                        value={this.state.email}
                        style={styles.input}
                        onChangeText={(email) => this.setState({ email })}
                    />
                    <AuthInput
                        icon="lock"
                        placeholder="Password"
                        value={this.state.password}
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({ password })}
                    />
                    {this.state.stageNew && (
                        <AuthInput
                            icon="asterisk"
                            placeholder="Confirm password"
                            value={this.state.confirmPassword}
                            style={styles.input}
                            secureTextEntry={true}
                            onChangeText={(confirmPassword) =>
                                this.setState({ confirmPassword })
                            }
                        />
                    )}
                    <TouchableOpacity
                        onPress={this.signinOrSignup}
                        disabled={!validForm}
                    >
                        <View
                            style={[
                                styles.button,
                                validForm ? {} : { backgroundColor: "#AAA" },
                            ]}
                        >
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? "Register" : "Enter"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={{ padding: 10 }}
                    onPress={() =>
                        this.setState({ stageNew: !this.state.stageNew })
                    }
                >
                    <Text style={styles.buttonText}>
                        {this.state.stageNew
                            ? "Do you already have an account?"
                            : "Do not have any account yet?"}
                    </Text>
                </TouchableOpacity>
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
    subtitle: {
        color: "#FFF",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 10,
    },
    formContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 20,
        width: "90%",
        borderRadius: 20,
    },
    input: {
        marginTop: 10,
        backgroundColor: "#FFF",
    },
    button: {
        backgroundColor: "#080",
        marginTop: 10,
        padding: 10,
        alignItems: "center",
        borderRadius: 25,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 20,
    },
});
