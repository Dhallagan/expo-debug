import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { color } from "react-native-elements/dist/helpers";
import { colors } from "../constants/dogeStyle";

export type ChipProps = {
  title: string;
  outlined: boolean;
  onPress?: () => void;
};

export const Chip: React.FC<ChipProps> = ({
  title,
  outlined = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        (outlined = true
          ? { backgroundColor: colors.purple }
          : { backgroundColor: "rgba(255,255,255,0.5)" }),
        {
          borderRadius: 20,
          borderStyle: "solid",
          borderColor: "black",
          paddingHorizontal: 10,
          paddingVertical: 7,
          margin: 4,
        },
      ]}
    >
      <Text style={{ color: "white" }}>{title}</Text>
    </TouchableOpacity>
  );
};
