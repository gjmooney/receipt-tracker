import { Text, View, StyleSheet } from "react-native";

const HistoryRow = ({ history }) => {
  //console.log("HIST ROW: ", item.history);
  console.log("in hist row");
  const date = new Date(history.date).toLocaleDateString();
  return (
    <View style={styles.row}>
      <Text style={styles.item}>
        {history.brand} {history.store} €{history.price} {date}
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
    fontSize: 20,
    padding: 10,
  },
});
