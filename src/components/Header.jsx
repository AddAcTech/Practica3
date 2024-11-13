import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate("/")}
        style={styles.buttonContainer}
      >
        <MaterialCommunityIcons name="home" size={40} color="black" />
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("SubjectForm")}
        style={styles.buttonContainer}
      >
        <MaterialCommunityIcons name="plus-circle" size={40} color="black" />
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("Professors")}
        style={styles.buttonContainer}
      >
        <MaterialCommunityIcons name="badge-account" size={40} color="black" />
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("ScheduleForm")}
        style={styles.buttonContainer}
      >
        <MaterialCommunityIcons name="book-plus" size={40} color="black" />
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("Assignments")}
        style={styles.buttonContainer}
      >
        <MaterialCommunityIcons
          name="clipboard-text-multiple-outline"
          size={40}
          color="black"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "",
    padding: 16,
  },
  buttonContainer: {
    marginHorizontal: 4,
    flexDirection: "row",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginRight: 10,
  },
});

export default Header;
