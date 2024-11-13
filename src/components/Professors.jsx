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
import AllTeachers from "./AllTeachers";

function Professors() {
  const navigation = useNavigation();
  const [prevTeachers, setPrevTeachers] = useState([]);
  const [teacher, setTeacher] = useState({
    name: "",
    office: "",
    contact: "",
  });

  useEffect(() => {
    try {
      const getData = async () => {
        const local = await AsyncStorage.getItem("@teachers");
        const teachersJson = local ? JSON.parse(local) : [];
        setPrevTeachers(teachersJson);
      };
      getData();
    } catch (e) {}
  }, []);

  const handleTeacherChange = (name, value) => {
    console.log(name, value);
    setTeacher({ ...teacher, [name]: value });
  };

  const handleSubmit = async () => {
    const { name, office, contact } = teacher;
    if (name.trim() !== "" && office.trim() !== "" && contact.trim() !== "") {
      try {
        const jsonValue = JSON.stringify([...prevTeachers, teacher]);
        await AsyncStorage.setItem("@teachers", jsonValue);
        navigation.navigate("/");
      } catch (e) {}
    } else {
      Alert.alert("Ups!", "Fields cannot be empty");
    }
  };

  return (
    <>
      <Header />
      <Text style={styles.title}>Teachers</Text>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Teacher Name"
            onChangeText={(itemValue) => handleTeacherChange("name", itemValue)}
          />
          <TextInput
            style={styles.input}
            placeholder="Contact"
            onChangeText={(itemValue) =>
              handleTeacherChange("contact", itemValue)
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Office"
            onChangeText={(itemValue) =>
              handleTeacherChange("office", itemValue)
            }
          />
        </View>
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add Teacher</Text>
        </Pressable>
      </View>
      <AllTeachers />
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
    marginBottom: 15,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 15,
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderColor: "black",
    borderWidth: 2,
    padding: 15,
    borderRadius: 10,
    fontSize: 20,
  },
  button: {
    backgroundColor: "black",
    justifyContent: "center",
    padding: 16,
    borderRadius: 10,
    fontWeight: "bold",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Professors;
