import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Assignment({ assignment, onUpdate, onDelete }) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.subject}>{assignment.subject}</Text>
        <Text style={styles.date}>{assignment.date}</Text>
        <Text>Description: {assignment.description}</Text>
        <Text
          style={
            assignment.done
              ? { color: "green", fontWeight: "bold" }
              : { color: "red", fontWeight: "bold" }
          }
        >
          {assignment.done ? "Done" : "Pending"}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable
          style={{ color: "red", fontWeight: "bold" }}
          onPress={onDelete}
        >
          <MaterialCommunityIcons name="delete" size={30} color="red" />
        </Pressable>
        <Pressable
          style={{ color: "red", fontWeight: "bold" }}
          onPress={onUpdate}
        >
          <MaterialCommunityIcons
            name={
              assignment.done
                ? "checkbox-marked-circle"
                : "checkbox-marked-circle-outline"
            }
            size={30}
            color="black"
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 15,
    gap: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subject: {
    fontSize: 20,
    fontWeight: "bold",
  },
  date: {
    fontSize: 15,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});
