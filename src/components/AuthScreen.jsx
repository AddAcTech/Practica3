import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function AuthScreen() {
    const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre login y registro
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [registerData, setRegisterData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const response = await fetch("http://192.168.1.81:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
            });
            const data = await response.json();
            if (response.ok) {
                Alert.alert("Éxito", "Inicio de sesión exitoso");
                navigation.navigate("Profile");
            } else {
                Alert.alert("Error", data.message);
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo iniciar sesión");
        }
    };
    

    const handleRegister = async () => {
        if (
            !registerData.username ||
            !registerData.email ||
            !registerData.password
        ) {
            Alert.alert("Error", "Por favor, completa todos los campos.");
            return;
        }
        try {
            const response = await fetch("http://192.168.1.81:3000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registerData),
            });
            const data = await response.json();
            if (response.ok) {
                Alert.alert("Éxito", "Registro exitoso");
                setIsLogin(true); // Cambiar a la pantalla de login después del registro
            } else {
                Alert.alert("Error", data.message);
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo completar el registro");
        }
    };

    return (
        <View style={styles.container}>
            {isLogin ? (
                <View>
                    <Text style={styles.title}>Iniciar Sesión</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Correo Electrónico"
                        value={loginData.email}
                        onChangeText={(text) =>
                            setLoginData({ ...loginData, email: text })
                        }
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        value={loginData.password}
                        onChangeText={(text) =>
                            setLoginData({ ...loginData, password: text })
                        }
                        secureTextEntry
                    />
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.link}
                        onPress={() => setIsLogin(false)}
                    >
                        <Text style={styles.linkText}>¿No tienes cuenta? Regístrate aquí</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View>
                    <Text style={styles.title}>Registrarse</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre de Usuario"
                        value={registerData.username}
                        onChangeText={(text) =>
                            setRegisterData({ ...registerData, username: text })
                        }
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Correo Electrónico"
                        value={registerData.email}
                        onChangeText={(text) =>
                            setRegisterData({ ...registerData, email: text })
                        }
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        value={registerData.password}
                        onChangeText={(text) =>
                            setRegisterData({ ...registerData, password: text })
                        }
                        secureTextEntry
                    />
                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Registrarse</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.link}
                        onPress={() => setIsLogin(true)}
                    >
                        <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión aquí</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: "center" },
    title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
    input: { borderBottomWidth: 1, marginBottom: 15, padding: 10 },
    button: { backgroundColor: "blue", padding: 15, alignItems: "center", borderRadius: 5 },
    buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
    link: { marginTop: 10, alignItems: "center" },
    linkText: { color: "blue", textDecorationLine: "underline" },
});
