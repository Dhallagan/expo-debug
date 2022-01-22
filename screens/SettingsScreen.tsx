import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { colors, h4 } from "../constants/appStyle";
import { TitledHeader } from "../components/TitledHeader";

export default function SettingsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary700 }}>
      <TitledHeader title={"Notifications"} showBackButton={true} />
      <ScrollView style={styles.scrollView}></ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.primary800,
    paddingHorizontal: 25,
  },
});
