import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Subject from "./Subject";
import Header from "./Header";
import EmptySchedule from "./EmptySchedule";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import ScheduleFilter from "./ScheduleFilter";

function Principal() {
  const [subjects, setSubjects] = useState([]);
  const [today, setToday] = useState([]);
  const [fecha, setFecha] = useState(new Date());
  const [dia, setDia] = useState("");

  const [dias, setDias] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);

  useEffect(() => {
    setDia(dias[fecha.getDay() - 1]);
  }, [fecha]);

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem("@schedule");
          return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (e) {
          // Error reading value
        }
      };

      getData().then((response) => {
        if (response) {
          setSubjects(response);
        }
      });
    }, [])
  );

  // Filtramos los subjects por el día de hoy
  useEffect(() => {
    setToday(subjects.filter((subject) => subject.day === dia));
  }, [subjects, dia]);

  const handleDelete = (subjectToDelete) => {
    const updatedSubjects = subjects.filter(
      (subject) => subject !== subjectToDelete
    );
    setSubjects(updatedSubjects);
    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("@schedule", jsonValue);
      } catch (error) {
        console.log(error);
      }
    };
    storeData(updatedSubjects);
  };

  const handleChange = (value) => {
    setDia(value);
  };

  if (today.length === 0 || !today) {
    return (
      <>
        <Header />
        <ScheduleFilter
          dia={dia}
          handleChange={(inputValue) => handleChange(inputValue)}
        />
        <EmptySchedule />
      </>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <ScheduleFilter
        dia={dia}
        handleChange={(inputValue) => handleChange(inputValue)}
      />
      <ScrollView style={styles.subjects} showsVerticalScrollIndicator={false}>
        {today.map((subject, index) => (
          <Subject
            key={index}
            subject={subject}
            onDelete={() => handleDelete(subject)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subjects: {
    width: "100%",
    paddingHorizontal: 15,
  },
});

export default Principal;
