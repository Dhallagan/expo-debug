import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageSourcePropType,
  ViewProps,
  Image,
  StyleProp,
  ActivityIndicator,
  ViewStyle,
} from "react-native";
import {
  colors,
  fontSize,
  paragraph,
  paragraphBold,
  radius,
  smallBold,
} from "../constants/dogeStyle";

export type ButtonProps = ViewProps & {
  style?: StyleProp<ViewStyle>;
  title: String;
  onPress?: () => void;
};

export const Button: React.FC<ButtonProps> = ({ style, title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={["#C03DAE", "#00BFF7"]}
        style={Styles.loginContainer}
        start={{ x: 0.0, y: 0.1 }}
        end={{ x: 1, y: 0.0 }}
      >
        <Text style={Styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  loginContainer: {
    alignItems: "center",
    height: 40,
    marginTop: 30,
    backgroundColor: "#0088f8",
    justifyContent: "center",
    marginStart: 20,
    marginEnd: 20,
    borderRadius: 5,
  },
  loginText: {
    color: "#fff",
  },
  loginHeader: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 50,
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
});
