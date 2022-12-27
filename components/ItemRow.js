import { Text, View, StyleSheet } from "react-native";

const ItemRow = ({ item, onPress }) => {
  const lastIndex = item.history.length - 1;

  return (
    <View style={styles.row}>
      <Text style={styles.item} onPress={onPress}>
        {item.type} €{item.history[lastIndex].price}{" "}
        {item.history[lastIndex].store}
      </Text>
    </View>
  );
};
export default ItemRow;

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
