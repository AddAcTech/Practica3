import React, { useState, useEffect } from "react";
import {
  Pressable,
  Text,
  View,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./Header";

function ScheduleForm() {
  const navigation = useNavigation();
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [prevSchedule, setPrevSchedule] = useState([]);
  const [schedule, setSchedule] = useState({
    day: "",
    subject: "",
    teacher: "",
    start: "",
    finish: "",
    room: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const subjectsJson = await AsyncStorage.getItem("@subjects");
        const scheduleJson = await AsyncStorage.getItem("@schedule");
        const teachersJson = await AsyncStorage.getItem("@teachers");

        return {
          schedule: scheduleJson != null ? JSON.parse(scheduleJson) : [],
          subjects: subjectsJson != null ? JSON.parse(subjectsJson) : [],
          teachers: teachersJson != null ? JSON.parse(teachersJson) : [],
        };
      } catch (e) {
        // Error reading value
      }
    };

    getData().then((response) => {
      if (response.subjects) {
        setSubjects(response.subjects);
      }
      if (response.schedule) {
        setPrevSchedule(response.schedule);
      }
      if (response.teachers) {
        setTeachers(response.teachers);
      }
    });
  }, [subjects]);

  const handleChange = (name, value) => {
    setSchedule({ ...schedule, [name]: value });
  };

  const handleSubmit = async () => {
    const { day, subject, teacher, start, finish, room } = schedule;
    if (
      day.trim() !== "" &&
      subject.trim() !== "" &&
      teacher.trim() !== "" &&
      start.trim() !== "" &&
      finish.trim() !== "" &&
      room.trim() !== ""
    ) {
      try {
        await AsyncStorage.setItem(
          "@schedule",
          JSON.stringify([...prevSchedule, schedule])
        );
        navigation.navigate("/");
      } catch (e) {
        // Saving error
      }
    } else {
      Alert.alert("Ups!", "Fields cannot be empty");
    }
  };

  return (
    <>
      <Header />
      <View
        style={{
          alignItems: "center",
          padding: 15,
        }}
      >
        <Text style={{ fontSize: 45, fontWeight: "bold", marginBottom: 20 }}>
          New Schedule
        </Text>
        <View style={styles.container}>
          <View style={styles.selectorContainer}>
            <Picker
              selectedValue={schedule.day}
              onValueChange={(itemValue) => handleChange("day", itemValue)}
              style={styles.selectors}
            >
              <Picker.Item label="Select Day" value="" />
              <Picker.Item label="Monday" value="Monday" />
              <Picker.Item label="Tuesday" value="Tuesday" />
              <Picker.Item label="Wednesday" value="Wednesday" />
              <Picker.Item label="Thursday" value="Thursday" />
              <Picker.Item label="Friday" value="Friday" />
              <Picker.Item label="Saturday" value="Saturday" />
              <Picker.Item label="Sunday" value="Sunday" />
            </Picker>
          </View>
          <View style={styles.selectorContainer}>
            <Picker
              selectedValue={schedule.subject}
              onValueChange={(itemValue) => handleChange("subject", itemValue)}
              style={styles.selectors}
            >
              <Picker.Item label="Select Subject" />
              {subjects.map((subject, index) => (
                <Picker.Item key={index} label={subject} value={subject} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.inputs}>
          <Picker
            selectedValue={schedule.teacher}
            onValueChange={(itemValue) => handleChange("teacher", itemValue)}
          >
            <Picker.Item label="Select Teacher" />
            {teachers.map((teacher, index) => (
              <Picker.Item
                key={index}
                label={teacher.name}
                value={teacher.name}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.container}>
          <TextInput
            placeholder="Starts"
            onChangeText={(text) => handleChange("start", text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Finish"
            onChangeText={(text) => handleChange("finish", text)}
            style={styles.input}
          />
        </View>
        <View style={styles.container}>
          <TextInput
            placeholder="Room"
            onChangeText={(text) => handleChange("room", text)}
            style={styles.input}
          />
        </View>
      </View>
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  inputs: {
    width: "100%",
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 2,
  },
  input: {
    flex: 1,
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    borderColor: "black",
    borderWidth: 2,
  },
  container: {
    width: "100%",
    flexDirection: "row",
    gap: 15,
    justifyContent: "center",
  },
  selectorContainer: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
    flex: 1,
  },
  selectors: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    borderColor: "black",
    borderWidth: 2,
  },
  button: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 5,
    width: "50%",
    alignSelf: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ScheduleForm;
