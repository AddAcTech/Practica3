import { View, StyleSheet } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ScheduleFilter({ dia, handleChange }) {
  return (
    <View style={styles.pickerContainer}>
      <MaterialCommunityIcons name="calendar-clock" size={30} color="black" />
      <Picker onValueChange={handleChange} style={styles.inputs}>
        <Picker.Item label={dia} value="" />
        <Picker.Item label="Monday" value="Monday" />
        <Picker.Item label="Tuesday" value="Tuesday" />
        <Picker.Item label="Wednesday" value="Wednesday" />
        <Picker.Item label="Thursday" value="Thursday" />
        <Picker.Item label="Friday" value="Friday" />
        <Picker.Item label="Saturday" value="Saturday" />
        <Picker.Item label="Sunday" value="Sunday" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  inputs: {
    width: "30%",
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
