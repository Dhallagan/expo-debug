import * as React from "react";
import { View, StyleSheet } from "react-native";
import { colors, radius } from "../constants/appStyle";

export function CardDivider(props) {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  divider: {
    marginHorizontal: 10,
    borderColor: colors.primary700,
    borderWidth: 1,
  },
});
