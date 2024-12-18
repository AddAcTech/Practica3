import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Usamos íconos de Ionicons para los iconos
import Toast from 'react-native-toast-message';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

const Edit = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUser(user[0]);
        setNombre(user[0].username);
        setEmail(user[0].email);
      } else {
        // Redirigir si no se encuentra usuario
      }
    };
    getUserData();
  }, []);
  

  const updateName = async () => {
    try {
      const response = await fetch("http://172.100.77.25:3000/username", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user.id, username: nombre }),
      });
      if (!response.ok) {
        const data = await response.json(); // Extraer mensaje de error si existe
        Toast.show({
          type: 'error',
          text1: data.message || 'Error al actualizar el nombre',
        });
      } else {
        Toast.show({
          type: 'success',
          text1: 'Nombre actualizado correctamente',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
    }
  };
  

  const updateEmail = async () => {
    try {
      const response = await fetch("http://172.100.77.25:3000/email", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user.id, email }),
      });
      if (!response.ok) {
        Toast.show({
          type: 'error',
          text1: 'Error al actualizar el correo',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
    }
  };

  const updatePassword = async () => {
    try {
      if (password !== confirmPassword) {
        Toast.show({
          type: 'error',
          text1: 'Las contraseñas no coinciden',
        });
        return;
      }
      const response = await fetch("http://172.100.77.25:3000/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user.id, password }),
      });
      if (!response.ok) {
        Toast.show({
          type: 'error',
          text1: 'Error al actualizar la contraseña',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.avatar} />
          <Text style={styles.title}>Editar Perfil</Text>
          <Text style={styles.subtitle}>Actualiza tu información personal</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
            />
            <TouchableOpacity style={styles.button} onPress={updateName}>
              <Ionicons name="save-outline" size={24} color="white" />
              <Text style={styles.buttonText}>Guardar Nombre</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Correo Electrónico</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity style={styles.button} onPress={updateEmail}>
              <Ionicons name="save-outline" size={24} color="white" />
              <Text style={styles.buttonText}>Guardar Correo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nueva Contraseña</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirmar Nueva Contraseña</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity style={styles.button} onPress={updatePassword}>
              <Ionicons name="save-outline" size={24} color="white" />
              <Text style={styles.buttonText}>Guardar Contraseña</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => {  }} style={styles.cancelButton}>
            <Ionicons name="arrow-back-outline" size={24} color="#4F80E1" />
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#E0F7FA',
  },
  card: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4F80E1',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4F80E1',
  },
  subtitle: {
    fontSize: 16,
    color: '#4F80E1',
  },
  form: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4F80E1',
  },
  input: {
    borderWidth: 1,
    borderColor: '#4F80E1',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#4F80E1',
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#4F80E1',
    marginLeft: 5,
  },
});

export default Edit;
