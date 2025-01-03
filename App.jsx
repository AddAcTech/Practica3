import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import Login from "./src/components/Login";
import UserScreen from "./src/components/UserScreen";
import Principal from "./src/components/Principal";
import SubjectForm from "./src/components/SubjectForm";
import ScheduleForm from "./src/components/ScheduleForm";
import Professors from "./src/components/Professors";
import Assignments from "./src/components/Assignments";
import Edit from "./src/components/Edit";
import AuthScreen from "./src/components/AuthScreen"; // Importa AuthScreen
import Toast from "react-native-toast-message";
import Profile from "./src/components/Profile";

const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="AuthScreen" // Configura AuthScreen como inicial si es necesario
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Edit" component={Edit} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
