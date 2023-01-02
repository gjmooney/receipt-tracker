import { View, Text, StyleSheet } from "react-native";

const HomeSplash = () => {
  return (
    <View>
      <Text style={styles.text}>HOME CREEN</Text>
    </View>
  );
};

export default HomeSplash;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
});
