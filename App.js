import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import ItemForm from "./components/ItemForm";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <ItemForm />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItem: "center",
    justifyContent: "center",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "fff",
  },
});
