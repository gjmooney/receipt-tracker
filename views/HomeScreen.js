import { View, Button } from "react-native";

import HomeSplash from "../components/HomeSplash";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <HomeSplash />
      <Button
        title="Add new item"
        onPress={() => navigation.navigate("ItemSubmit")}
      />
      <Button title="View Items" />
      <Button
        title="View History"
        onPress={() => navigation.navigate("History")}
      />
    </View>
  );
}

export default HomeScreen;
