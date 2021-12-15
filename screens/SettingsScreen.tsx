import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { colors, h4 } from "../constants/dogeStyle";
import { TitledHeader } from "../components/TitledHeader";

export default function SettingsScreen() {
  return (
    <>
      <TitledHeader title={"Settings"} showBackButton={true} />
      <ScrollView style={styles.scrollView}></ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.primary800,
    paddingHorizontal: 25,
  },
});
