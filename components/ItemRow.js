import { Text, View, StyleSheet } from "react-native";

const ItemRow = ({ item, onPress }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.item} onPress={onPress}>
        {item.type} €{item.history.price}
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
