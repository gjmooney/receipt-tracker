import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ItemSubmitScreen } from "../views/ItemSubmitScreen";
import HomeScreen from "../views/HomeScreen";
import ItemScreen from "../views/ItemScreen";
import HistoryScreen from "../views/HistoryScreen";
import GraphScreen from "../views/GraphScreen";

const Stack = createNativeStackNavigator();

export default function UserStack() {
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
          name="Item"
          component={ItemScreen}
          options={{ title: "Item" }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={({ route, navigation }) => ({
            title: "chart",
            headerRight: () => (
              <Button
                onPress={() =>
                  navigation.navigate("Chart", route.params.history)
                }
                title="Graph"
                color="grey"
              />
            ),
          })}
        />
        <Stack.Screen
          name="Chart"
          component={GraphScreen}
          options={{ title: "Chart" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
