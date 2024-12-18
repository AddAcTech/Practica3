import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

function Profile() {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  // Función para cerrar sesión
  const logOut = async () => {
    try {
      // Si manejas el usuario con token:
      await AsyncStorage.removeItem('token');
      setUser(null);
      Alert.alert('Sesión cerrada correctamente');
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al cerrar sesión');
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          // Si no hay token, el usuario no está logueado
          navigation.replace('Login');
          return;
        }

        const response = await fetch('http://192.168.1.100:3000/user/profile', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          Alert.alert('Error', errorData.message || 'No se pudo cargar el perfil');
          navigation.replace('Login');
          return;
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        Alert.alert('Error', 'No se pudo cargar el perfil del usuario');
        console.error(error);
        navigation.replace('Login');
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar} />
        </View>
        <Text style={styles.title}>Perfil de Usuario</Text>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Nombre</Text>
          <Text style={styles.value}>{user.username}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Correo Electrónico</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditProfile')} // Ajusta el nombre de la ruta si es necesario
          >
            <Feather name="settings" size={20} color="#1E40AF" style={{ marginRight: 8 }} />
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={logOut}>
            <Feather name="log-out" size={20} color="#0369A1" style={{ marginRight: 8 }} />
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  avatarContainer: {
    marginVertical: 16,
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: '#3B82F6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 24,
    textAlign: 'center',
  },
  infoBlock: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0284C7',
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E3A8A',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 24,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#93C5FD',
    padding: 8,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#1E40AF',
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#0369A1',
    fontWeight: '500',
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
  },
});
