import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function EmptySchedule() {
  return (
    <View style={styles.container}>
      <View style={styles.emptyContainer}>
        <Text style={styles.title}>No schedule yet</Text>
        <MaterialCommunityIcons
          name="emoticon-sad-outline"
          size={80}
          color="grey"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "grey",
  },
});

export default EmptySchedule;
