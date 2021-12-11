import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProgressAvatar from "../components/ProgressAvatar";
import { TitledHeader } from "../components/TitledHeader";
import TitledGradientHeader from "../components/TitleGradientHeader";
import { colors } from "../constants/dogeStyle";

export default function ProfileScreen() {
  const inset = useSafeAreaInsets();
  return (
    <>
      <TitledGradientHeader>Athlete</TitledGradientHeader>
      <View style={styles.container}>{/* <ProgressAvatar /> */}</View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#18191a",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
});
