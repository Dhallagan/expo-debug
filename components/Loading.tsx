import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors, fontSize } from "../constants/dogeStyle";

export function Loading() {
  return (
    <View style={styles.containerLoad}>
      <Text style={styles.titleText}>
        <ActivityIndicator size="large" color="#fff" />
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  containerLoad: {
    flex: 1,
    backgroundColor: colors.primary800,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: fontSize.h3,
    color: colors.text,
    padding: 5,
  },
});
