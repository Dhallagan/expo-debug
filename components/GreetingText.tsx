import * as React from "react";
import { Text, StyleSheet } from "react-native";
import { fonts } from "react-native-elements/dist/config";
import { colors, fontSize, radius } from "../constants/appStyle";

export function GreetingText(props) {
  return <Text style={styles.greeting}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  greeting: {
    padding: 10,
    fontWeight: "bold",
    fontSize: fontSize.h1,
    color: colors.text,
  },
});
