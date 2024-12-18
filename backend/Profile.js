import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native"; // Importa el hook

function Profile() {
  const [user, setUser] = useState(null);
  const navigation = useNavigation(); // Obtiene el objeto navigation

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch("http://192.168.1.100:3000/user/profile", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          Alert.alert("Error", errorData.message);
          return;
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        Alert.alert("Error", "No se pudo cargar el perfil del usuario");
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <View style={styles.container}>
      {/* Botón para volver atrás */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>

      {user ? (
        <Text style={styles.text}>Bienvenido, {user.email}</Text>
      ) : (
        <Text style={styles.text}>Cargando perfil...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 24, fontWeight: "bold" },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: "#000",
  },
});

export default Profile;
