import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../components/Button";
import ProgressAvatar from "../components/ProgressAvatar";
import { TitledHeader } from "../components/TitledHeader";
import TitledGradientHeader from "../components/TitleGradientHeader";
import { colors } from "../constants/dogeStyle";
import { useTokenStore } from "../store/useTokenStore";

export default function ProfileScreen() {
  const inset = useSafeAreaInsets();
  let { logout } = useTokenStore();

  return (
    <>
      <TitledGradientHeader>Athlete</TitledGradientHeader>
      <View style={styles.container}>
        {/* <ProgressAvatar /> */}
        <Button title={"Logout"} onPress={logout} />
      </View>
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
