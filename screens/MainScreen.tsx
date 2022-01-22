import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { images } from "../assets";
import Header from "../components/Header";
import { colors } from "../constants/appStyle";
import BottomNavigator from "../navigation/BottomNavigator";

export default function MainScreen() {
  const inset = useSafeAreaInsets();
  return (
    <>
      <BottomNavigator />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.primary900,
    flexDirection: "row",
    paddingHorizontal: 25,
  },
  text: {
    color: "#fff",
  },
  leftContainer: {
    height: 70,
    justifyContent: "center",
  },
  rightContainer: {
    flexDirection: "row",
  },
});
