import React, { Component } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StatusBar,
    ImageBackground,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Platform,
    Alert,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import Task from "../components/Task";

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
import AddTask from "./AddTask";

let customFonts = {
    Lato_100Thin,
    Lato_300Light,
    Lato_400Regular,
    Lato_900Black_Italic,
};

export default class TaskList extends Component {
    state = {
        showDoneTasks: true,
        showAddTask: true,
        visibleTasks: [],
        fontsLoaded: false,
        tasks: [
            {
                id: Math.random(),
                desc: "Comprar livro de react native",
                estimateAt: new Date(),
                doneAt: new Date(),
            },
            {
                id: Math.random(),
                desc: "Ler livro de react native",
                estimateAt: new Date(),
                doneAt: null,
            },
        ],
    };

    toggleFilter = () => {
        this.setState(
            { showDoneTasks: !this.state.showDoneTasks },
            this.filterTasks
        );
    };

    filterTasks = () => {
        let visibleTasks = null;
        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks];
        } else {
            const pending = (task) => task.doneAt === null;
            visibleTasks = this.state.tasks.filter(pending);
        }

        this.setState({ visibleTasks });
    };

    toggleTask = (taskId) => {
        const tasks = [...this.state.tasks];
        tasks.forEach((task) => {
            if (task.id === taskId) {
                task.doneAt = task.doneAt ? null : new Date();
            }
        });

        this.setState({ tasks }, this.filterTasks);
    };

    addTask = (newTask) => {
        if (!newTask.desc || !newTask.desc.trim()) {
            Alert.alert("Dados Inválidos", "Descrição não informada!");
            return;
        }

        const tasks = [...this.state.tasks];
        tasks.push({
            id: Math.random(),
            desc: newTask.desc,
            estimateAt: newTask.date,
            doneAt: null,
        });

        this.setState({ tasks, showAddTask: false }, this.filterTasks);
    };

    deleteTask = (id) => {
        const tasks = this.state.tasks.filter((task) => task.id !== id);
        this.setState({ tasks }, this.filterTasks);
    };

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }

    componentDidMount = () => {
        this.filterTasks();
        this._loadFontsAsync();
    };

    render() {
        const today = moment().locale("pt-br").format("ddd, D [de] MMMM YYYY");

        if (this.state.fontsLoaded) {
            return (
                <SafeAreaView style={styles.container}>
                    <StatusBar />
                    <AddTask
                        isVisible={this.state.showAddTask}
                        onCancel={() => this.setState({ showAddTask: false })}
                        onSave={this.addTask}
                    />
                    <ImageBackground
                        source={todayImage}
                        style={styles.background}
                    >
                        <View style={styles.iconBar}>
                            <TouchableOpacity onPress={this.toggleFilter}>
                                <FontAwesome
                                    name={
                                        this.state.showDoneTasks
                                            ? "eye"
                                            : "eye-slash"
                                    }
                                    color="aqua"
                                    size={20}
                                    color={commonStyles.colors.secondary}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.titleBar}>
                            <Text style={[styles.title]}>Hoje</Text>
                            <Text style={[styles.subtitle]}>{today}</Text>
                        </View>
                    </ImageBackground>
                    <View style={styles.taskList}>
                        <FlatList
                            data={this.state.visibleTasks}
                            keyExtractor={(item) => `${item.id}`}
                            renderItem={({ item }) => (
                                <Task
                                    {...item}
                                    onToggleTask={this.toggleTask}
                                    onDelete={this.deleteTask}
                                />
                            )}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.addButton}
                        activeOpacity={0.7}
                        onPress={() => this.setState({ showAddTask: true })}
                    >
                        <FontAwesome
                            name="plus"
                            size={20}
                            color={commonStyles.colors.secondary}
                        />
                    </TouchableOpacity>
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
    iconBar: {
        flexDirection: "row",
        marginHorizontal: 20,
        justifyContent: "flex-end",
        marginTop: Platform.OS === "ios" ? 40 : 20,
    },
    addButton: {
        position: "absolute",
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: "center",
        alignItems: "center",
    },
});
