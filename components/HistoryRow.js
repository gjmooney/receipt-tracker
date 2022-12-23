import { Text, View, StyleSheet } from "react-native";

const HistoryRow = (item) => {
  console.log("ROW: ", item);
  return (
    <View style={styles.row}>
      <Text>{item.type}</Text>
    </View>
  );
};
export default HistoryRow;

const styles = StyleSheet.create({
  row: { flex: 1 },
});
