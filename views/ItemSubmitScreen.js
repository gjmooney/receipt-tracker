import ItemForm from "../components/ItemForm";
import { Button, View, Text } from "react-native";

export function ItemSubmitScreen({ route, navigation }) {
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go again"
        onPress={() =>
          navigation.push("ItemSubmit", {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button
        title="Go all the way back"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}
