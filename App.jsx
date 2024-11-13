import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import Principal from "./src/components/Principal";
import SubjectForm from "./src/components/SubjectForm";
import ScheduleForm from "./src/components/ScheduleForm";
import Professors from "./src/components/Professors";
import Assignments from "./src/components/Assignments";

const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="/"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="/" component={Principal} />
          <Stack.Screen name="SubjectForm" component={SubjectForm} />
          <Stack.Screen name="ScheduleForm" component={ScheduleForm} />
          <Stack.Screen name="Professors" component={Professors} />
          <Stack.Screen name="Assignments" component={Assignments} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
