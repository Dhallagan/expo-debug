import * as React from "react";
import { View, StyleSheet } from "react-native";
import { colors, radius } from "../constants/appStyle";

export function Card(props) {
  return <View style={styles.container}>{props.children}</View>;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.m,
    flex: 1,
    marginVertical: 5,
    backgroundColor: colors.primary800,

    margin: 5,
  },
});
