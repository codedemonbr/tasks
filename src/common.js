import { Alert, Platform } from "react-native";

const server =
    Platform.OS === "ios"
        ? "http://localhost:3000"
        : "http://192.168.0.12:3000";

function showError(err) {
    Alert.alert("Oops! There was a problem!", `Message: ${err}`);
}

function showSuccess(msg) {
    Alert.alert("Success!", msg);
}

export { server, showSuccess, showError };
