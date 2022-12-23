import { Text, View, StyleSheet } from "react-native";

const HistoryRow = ({ item }) => {
  console.log("ROW: ", item.type);
  return (
    <View style={styles.row}>
      <Text style={styles.item}>
        {item.type} {item.store} €{item.price}
      </Text>
    </View>
  );
};
export default HistoryRow;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  item: {
    fontSize: 24,
    padding: 10,
  },
});
