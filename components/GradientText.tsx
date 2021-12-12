import React from "react";
import { Text } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { fontSize } from "../constants/dogeStyle";

const GradientText = (props) => {
  return (
    <MaskedView
      maskElement={
        <Text style={{ fontSize: 30, fontWeight: "bold" }} {...props} />
      }
    >
      <LinearGradient
        colors={["#C03DAE", "#00BFF7"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text {...props} style={{ opacity: 0, height: 30 }} />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
