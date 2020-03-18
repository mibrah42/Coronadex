import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { darkBlueLight, darkBlue } from "../../utils/colors";

export const TabItem = ({ title, selected = false, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={{
        ...styles.badge,
        backgroundColor: selected ? darkBlueLight : darkBlue
      }}
    >
      <Text style={styles.badgeText}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  badge: {
    padding: 8,
    borderRadius: 20
  },
  badgeText: {
    color: "white",
    marginHorizontal: 8,
    fontSize: 12,
    fontWeight: "bold"
  }
});
