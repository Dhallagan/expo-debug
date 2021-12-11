import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Stop, Text as SvgText, LinearGradient } from "react-native-svg";

export default function HypeTitle() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Svg style={styles.popular}>
          <LinearGradient
            id="gradiant"
            x1="0"
            x2="0"
            y1="0"
            y2="80%"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="purple" offset="0%" />
            <Stop stopColor="#1e5d7d" offset="100%" />
          </LinearGradient>
          <SvgText
            fill="none"
            stroke="url(#gradiant)"
            fontSize="30vw"
            fontWeight="bold"
            y="100"
          >
            Popular
          </SvgText>
        </Svg>
        <Text style={styles.trending}>Trending This Week</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    fontFamily: "monospace, monospace",
  },
  header: {
    backgroundColor: "#000",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  popular: {
    width: "100%",
    height: 200,
  },
  trending: {
    fontSize: 30,
    color: "white",
    position: "absolute",
    bottom: 30,
    fontWeight: 600,
  },
});
