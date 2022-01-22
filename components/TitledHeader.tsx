import React from "react";
import { StyleSheet, Text } from "react-native";
import { colors } from "../constants/appStyle";
// import { h4 } from "../../constants/dogeStyle";
import { HeaderBase } from "./HeaderBase";

type TitledHeaderProps = {
  xs: Object | null;
  showBackButton: boolean;
  absolute: boolean;
  title: string;
};

export const TitledHeader: React.FC<TitledHeaderProps> = ({
  xs = null,
  showBackButton = true,
  absolute = false,
  title,
}) => {
  return (
    <HeaderBase showBackButton={showBackButton} absolute={absolute} xs={xs}>
      <Text style={styles.text}>{title}</Text>
    </HeaderBase>
  );
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    flexDirection: "row",
    marginRight: 66,
    marginLeft: 25,
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
