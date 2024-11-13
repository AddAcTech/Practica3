import { View, ScrollView, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AllSubjects() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const local = await AsyncStorage.getItem("@subjects");
        const subjectsJson = JSON.parse(local);
        setSubjects(subjectsJson);
      } catch (e) {
        setSubjects(["No hay materias"]);
      }
    };
    getData();
  }, []);

  const handleDelete = async (subjectToDelete) => {
    const updatedSubjects = subjects.filter(
      (subject) => subject !== subjectToDelete
    );
    setSubjects(updatedSubjects);
    const jsonValue = JSON.stringify(updatedSubjects);
    await AsyncStorage.setItem("@subjects", jsonValue);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {subjects &&
        subjects.map((subject, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.subject}>{subject}</Text>
            <MaterialCommunityIcons
              name="delete"
              size={30}
              color="red"
              onPress={() => handleDelete(subject)}
            />
          </View>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingHorizontal: 15,
    gap: 5,
    width: "100%",
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  subject: {
    fontSize: 20,
    fontWeight: "500",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderWidth: 2,
    marginBottom: 15,
    borderRadius: 10,
  },
});
