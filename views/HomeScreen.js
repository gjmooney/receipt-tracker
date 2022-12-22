import { View, Button } from "react-native";

import HomeSplash from "../components/HomeSplash";

export function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <HomeSplash />
      <Button
        title="Add new item"
        onPress={() =>
          navigation.navigate("ItemSubmit", {
            itemId: 86,
            otherParam: "anything you want here",
          })
        }
      />
      <Button
        title="Update the title"
        onPress={() => navigation.setOptions({ title: "Updated!" })}
      />
    </View>
  );
}
