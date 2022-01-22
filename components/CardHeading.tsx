import React, { ReactElement } from "react";
import { StyleSheet, Text } from "react-native";
import { paragraphBold } from "../constants/appStyle";

export interface CardHeadingProps {
  icon?: ReactElement;
  text: string;
}

export const CardHeading: React.FC<CardHeadingProps> = ({ icon, text }) => {
  return (
    <>
      {icon && icon}
      <Text style={styles.text} numberOfLines={2}>
        {text}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  text: {
    ...paragraphBold,
  },
});
