import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Subject({ subject, onDelete }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{subject.subject}</Text>
        <Text>Instructor: {subject.teacher}</Text>
        <Text>
          Time: {subject.start} - {subject.finish}
        </Text>
        <Text>Location: {subject.room}</Text>
      </View>
      <Pressable style={styles.button} onPress={onDelete}>
        <MaterialCommunityIcons name="delete" size={30} color="red" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderColor: "gray",
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
});

export default Subject;
