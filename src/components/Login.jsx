import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [saveSession, setSaveSession] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    console.log("Login está montado");
    const checkUser = async () => {
      try {
        const localUser = JSON.parse(await AsyncStorage.getItem("user"));
        if (localUser) {
          navigation.navigate("UserScreen");
        }
      } catch (error) {
        Alert.alert("Error", "Error al cargar el perfil");
      }
    };
    checkUser();
  }, []);

  const sendLogin = async () => {
    try {
      const response = await fetch("http://172.100.93.52:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (response.ok) {
        if (saveSession) {
          await AsyncStorage.setItem("user", JSON.stringify(data.user));
        }
        Alert.alert("Éxito", data.message);
        navigation.navigate("UserScreen");
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      Alert.alert("Error", "Error al iniciar sesión");
    }
  };

  const handleSubmit = () => {
    sendLogin();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={user.email}
        onChangeText={(text) => setUser({ ...user, email: text })}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={user.password}
        onChangeText={(text) => setUser({ ...user, password: text })}
        secureTextEntry
      />
      <View style={styles.checkboxContainer}>
        <Text>Recordarme</Text>
        <TouchableOpacity onPress={() => setSaveSession(!saveSession)}>
          <Text style={{ marginLeft: 8 }}>{saveSession ? "☑️" : "⬜️"}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 10 },
  checkboxContainer: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  button: { backgroundColor: "blue", padding: 15, alignItems: "center", borderRadius: 5 },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default Login;
