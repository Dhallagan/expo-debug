import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { images } from "../assets";
import { colors, fontSize } from "../constants/appStyle";
import { ClassOptionsButton } from "./bottomBar/ClassOptionsButton";
import GradientText from "./GradientText";

export default function ClassHeader(props) {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();

  return (
    <>
      <View style={[styles.container, { paddingTop: inset.top }]}>
        <View style={styles.leftContainer}>
          {/* <ProfileButton icon={{ uri: conn.user.avatarUrl }} /> */}
          <GradientText>{props.title || props.children}</GradientText>
        </View>
        <View style={styles.rightContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginRight: 20,
            }}
          ></View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.primary800,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  text: {
    color: "#fff",
  },
  leftContainer: {
    height: 70,
    justifyContent: "center",
    flex: 1,
  },
  rightContainer: {
    flexDirection: "row",
    paddingRight: 10,
  },
  nextClass: {
    color: "#fff",
    fontSize: fontSize.h4,
  },
  title: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
    borderColor: "indigo",
  },
});
