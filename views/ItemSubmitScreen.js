import ItemForm from "../components/ItemForm";
import { Button, View, Text } from "react-native";

export function ItemSubmitScreen({ route, navigation }) {
  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <ItemForm />
    </View>
  );
}
