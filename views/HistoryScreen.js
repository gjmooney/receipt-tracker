import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import HistoryRow from "../components/HistoryRow";
import ItemDivider from "../components/Divider";

/**
 *
 * This screen shows the history of an individual item
 * @param {*} param0
 * @returns
 */
const HistoryScreen = ({ route, navigation }) => {
  const { item } = route.params;
  console.log("HS: ", item.history);
  return (
    <View style={styles.container}>
      <Text style={styles.headerRow}>Brand Store Price Date</Text>
      <ItemDivider />
      <FlatList
        data={item.history}
        renderItem={({ item }) => <HistoryRow history={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  headerRow: {
    textAlign: "center",
    padding: 10,
    fontSize: 28,
  },
});

export default HistoryScreen;
