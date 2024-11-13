import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

export default function Teacher({ teacher, onDelete }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{teacher.name}</Text>
        <Text>Contact: {teacher.contact}</Text>
        <Text>Office: {teacher.office}</Text>
      </View>
      <Pressable style={styles.button} onPress={onDelete}>
        <MaterialCommunityIcons name="delete" size={30} color="red" />
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginBottom: 15,
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
});
