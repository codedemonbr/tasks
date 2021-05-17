import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";

import Auth from "./screens/Auth";
import TaskList from "./screens/TasksList";

const menuRoutes = {
    Today: {
        name: "Today",
        screen: (props) => <TaskList title="Today" daysAhead={0} {...props} />,
        navigationOptions: {
            title: "Today",
        },
    },
    Tomorrow: {
        name: "Tomorrow",
        screen: (props) => (
            <TaskList title="Tomorrow" daysAhead={1} {...props} />
        ),
        navigationOptions: {
            title: "Tomorrow",
        },
    },
    Week: {
        name: "Week",
        screen: (props) => <TaskList title="Week" daysAhead={7} {...props} />,
        navigationOptions: {
            title: "Week",
        },
    },
    FortNight: {
        name: "FortNight",
        screen: (props) => (
            <TaskList title="FortNight" daysAhead={15} {...props} />
        ),
        navigationOptions: {
            title: "FortNight",
        },
    },
    Month: {
        name: "Month",
        screen: (props) => <TaskList title="Month" daysAhead={30} {...props} />,
        navigationOptions: {
            title: "Month",
        },
    },
};

const menuNavigator = createDrawerNavigator(menuRoutes);

const mainRoutes = {
    Auth: {
        name: "Auth",
        screen: Auth,
    },
    Home: {
        name: "Home",
        screen: menuNavigator,
    },
};

const mainNavigator = createSwitchNavigator(mainRoutes, {
    initialRouteName: "Auth",
});
export default createAppContainer(mainNavigator);
