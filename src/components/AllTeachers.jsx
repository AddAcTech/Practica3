import { ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Teacher from "./Teacher";

export default function AllTeachers() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const local = await AsyncStorage.getItem("@teachers");
        const teachersJson = local ? JSON.parse(local) : null;
        setTeachers(teachersJson);
      } catch (e) {
        setTeachers([
          {
            name: "No hay profesores",
            office: "Sin asignar",
            contact: "Sin asignar",
          },
        ]);
      }
    };
    getData();
  }, []);

  const handleDelete = async (teacherToDelete) => {
    const updatedTeachers = teachers.filter(
      (teachers) => teachers !== teacherToDelete
    );
    setTeachers(updatedTeachers);
    const jsonValue = JSON.stringify(updatedTeachers);
    await AsyncStorage.setItem("@teachers", jsonValue);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {teachers &&
        teachers.map((teacher, index) => (
          <Teacher
            key={index}
            teacher={teacher}
            onDelete={() => handleDelete(teacher)}
          />
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    width: "100%",
  },
});
