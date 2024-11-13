import React, { useState, useEffect } from "react";
import {
  Pressable,
  Text,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./Header";
import Assignment from "./Assignment";

function Assignments() {
  const navigation = useNavigation();
  const [subjects, setSubjects] = useState([]);
  const [prevAssignments, setPrevAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    subject: "",
    date: "",
    description: "",
    done: false,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const subjectsJson = await AsyncStorage.getItem("@subjects");
        const prevAssignmentsJson = await AsyncStorage.getItem("@assignments");
        return {
          subjects: subjectsJson != null ? JSON.parse(subjectsJson) : [],
          prevAssignments:
            prevAssignmentsJson != null ? JSON.parse(prevAssignmentsJson) : [],
        };
      } catch (e) {
        // Error reading value
      }
    };

    getData().then((response) => {
      if (response.subjects) {
        setSubjects(response.subjects);
      }
      if (response.prevAssignments) {
        setPrevAssignments(response.prevAssignments);
      }
    });
  }, []);

  const handleChange = (name, value) => {
    setNewAssignment({ ...newAssignment, [name]: value });
  };

  const handleSubmit = async () => {
    const { subject, date, description } = newAssignment;
    if (
      subject.trim() !== "" &&
      date.trim() !== "" &&
      description.trim() !== ""
    ) {
      try {
        await AsyncStorage.setItem(
          "@assignments",
          JSON.stringify([...prevAssignments, newAssignment])
        );
        setPrevAssignments([...prevAssignments, newAssignment]);
        // Limpiar los campos después de enviar el formulario
        setNewAssignment({
          subject: "",
          date: "",
          description: "",
          done: false,
        });
      } catch (e) {
        // Manejar error al guardar
      }
    } else {
      Alert.alert("Ups!", "Fields cannot be empty");
    }
  };

  const assignmentDone = (index) => {
    const newAssignments = [...prevAssignments];
    newAssignments[index].done = !newAssignments[index].done;
    setPrevAssignments(newAssignments);
    try {
      AsyncStorage.setItem("@assignments", JSON.stringify(newAssignments));
    } catch (e) {
      // Saving error
    }
  };

  const handleDelete = (index) => {
    const newAssignments = prevAssignments.filter((_, i) => i !== index);
    setPrevAssignments(newAssignments);
    try {
      AsyncStorage.setItem("@assignments", JSON.stringify(newAssignments));
    } catch (e) {
      // Saving error
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
          New Assignment
        </Text>
        <View style={styles.container}>
          <View style={styles.selectorContainer}>
            <Picker
              selectedValue={newAssignment.subject}
              onValueChange={(itemValue) => handleChange("subject", itemValue)}
              style={styles.selectors}
            >
              <Picker.Item label="Select Subject" />
              {subjects.map((subject, index) => (
                <Picker.Item key={index} label={subject} value={subject} />
              ))}
            </Picker>
          </View>
          <View style={styles.dateContainer}>
            <TextInput
              style={styles.selectors}
              placeholder="Date"
              onChangeText={(text) => handleChange("date", text)}
              value={newAssignment.date} // Agregar este valor
            />
          </View>
        </View>
        <View style={styles.container}>
          <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder="Assignment Description"
            onChangeText={(text) => handleChange("description", text)}
            style={styles.input}
            value={newAssignment.description} // Agregar este valor
          />
        </View>
      </View>
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create</Text>
      </Pressable>
      <ScrollView
        styles={styles.assignmentContainer}
        showsVerticalScrollIndicator={false}
      >
        {prevAssignments.map((assignment, index) => (
          <Assignment
            key={index}
            assignment={assignment}
            onUpdate={() => assignmentDone(index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </ScrollView>
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
  dateContainer: {
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
    marginHorizontal: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  assignmentContainer: {
    backgroundColor: "black",
    gap: 15,
    marginHorizontal: 15,
  },
});

export default Assignments;
