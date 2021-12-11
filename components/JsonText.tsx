import React from "react";
import { Text } from "react-native";

export default function JsonText(props) {
  return (
    <Text style={{ color: "white", backgroundColor: "red", margin: 10 }}>
      {JSON.stringify(props.obj)}
    </Text>
  );
}
