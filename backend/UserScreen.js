import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function UserScreen() {
  const [user, setUser] = useState(null);

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
});

export default UserScreen;
