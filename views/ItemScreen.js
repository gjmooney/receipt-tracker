import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../firebase";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { getAllItems } from "../controllers/dbService";

import ItemRow from "../components/ItemRow";
import ItemDivider from "../components/Divider";

const ItemScreen = ({ navigation }) => {
  const [items, setItems] = useState();

  useEffect(() => {
    getAllItems().then((items) => setItems(items));
    //console.log("ITEMS: ", items);
  }, []);

  const onItemPress = (item) => {
    console.log("IS ", item);
    const jsonItem = JSON.stringify(item);
    navigation.navigate("History", { jsonItem });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerRow}>TYPE PRICE</Text>
      <ItemDivider />
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ItemRow
            item={item}
            onPress={() => navigation.navigate("History", { item })}
            ItemSeparatorComponent={<ItemDivider />}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  headerRow: {
    textAlign: "center",
    padding: 10,
    fontSize: 28,
  },
});

export default ItemScreen;
