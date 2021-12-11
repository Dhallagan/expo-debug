import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TitledHeader } from "../components/TitledHeader";
import colors from "../constants/colors";

export default function PostScreen() {
  const inset = useSafeAreaInsets();
  return (
    <>
      <TitledHeader title={"Post"} showBackButton={true} />
      <View style={styles.container}>
        <TouchableOpacity
        // onPress={() => {
        //   setTokens({ accessToken: "", refreshToken: "" });
        //   navigation.navigate("Home");
        // }}
        >
          <Text
            style={{
              alignSelf: "center",
              // fontFamily: fontFamily.extraBold,
              color: colors.text,
            }}
          >
            Post
          </Text>
        </TouchableOpacity>
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
