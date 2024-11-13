import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./Header";
import AllSubjects from "./AllSubjects";

function SubjectForm() {
  const navigation = useNavigation();
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@subjects");
        return jsonValue != null ? JSON.parse(jsonValue) : [];
      } catch (e) {
        setSubjects(["No se cargaron los datos"]);
      }
    };

    getData().then((response) => {
      if (response) {
        setSubjects(response);
      }
    });
  }, []);

  const handleSubmit = async () => {
    if (subject.trim() !== "") {
      setSubjects([...subjects, subject]);
      try {
        const jsonValue = JSON.stringify([...subjects, subject]);
        await AsyncStorage.setItem("@subjects", jsonValue);
        navigation.navigate("/");
      } catch (e) {
        // Error al guardar
      }
    } else {
      Alert.alert("Ups!", "Subject cannot be empty");
    }
  };

  return (
    <>
      <Header />
      <Text style={styles.title}>New Subject</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Algorithms"
          onChangeText={setSubject}
        />
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add Subject</Text>
        </Pressable>
      </View>
      <AllSubjects />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    gap: 15,
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    flex: 1,
    borderColor: "black",
    borderWidth: 2,
    paddingLeft: 16,
    borderRadius: 10,
    fontSize: 20,
  },
  button: {
    backgroundColor: "black",
    borderWidth: 2,
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default SubjectForm;
