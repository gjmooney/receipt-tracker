import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../firebase";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { getAllItems } from "../controllers/dbService";

import HistoryRow from "../components/HistoryRow";

const HistoryScreen = () => {
  const [items, setItems] = useState();
  //getAllItems();

  useEffect(() => {
    getAllItems().then((items) => setItems(items));
    console.log("ITEMS: ", items);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <HistoryRow item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default HistoryScreen;
