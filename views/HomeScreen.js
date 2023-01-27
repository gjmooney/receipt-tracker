import { View, Text, StyleSheet, Pressable } from "react-native";
import { useAuthentication } from "../controllers/useAuthentication";

import HomeSplash from "../components/HomeSplash";
import { getAuth, signOut } from "@firebase/auth";

function HomeScreen({ navigation }) {
  const { user } = useAuthentication();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HomeSplash />
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("ItemSubmit")}
        >
          <Text style={styles.buttonText}>Add new item</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Item")}
        >
          <Text style={styles.buttonText}>View Items</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => signOut(getAuth())}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 22,
  },
  header: {
    flex: 1,
    padding: 30,
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    margin: 10,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "black",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
