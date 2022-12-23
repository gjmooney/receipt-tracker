import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Constants from "expo-constants";

import { ItemSubmitScreen } from "./views/ItemSubmitScreen";
import HomeScreen from "./views/HomeScreen";
import HistoryScreen from "./views/HistoryScreen";

const Stack = createNativeStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={"ReceiptTracker/assets/icon.png"}
    />
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="ItemSubmit"
          component={ItemSubmitScreen}
          options={{ title: "Add Item" }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ title: "History" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    alignItem: "center",
    justifyContent: "center",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "fff",
    //paddingTop: Constants.statusBarHeight,
    padding: 50,
    alignItem: "center",
    justifyContent: "center",
  },
});
