import React from "react";
import { TouchableOpacity, Text } from "react-native";

export type ChipProps = {
  id: number;
  title: string;
  outlined: boolean;
  onPress?: () => void;
  handleCategoryPress?: any;
  selectedCategory: number;
};

export const Chip: React.FC<ChipProps> = ({
  id,
  title,
  outlined,
  onPress,
  handleCategoryPress,
  selectedCategory,
}) => {
  return (
    <TouchableOpacity
      style={[
        (outlined || selectedCategory === id
          ? { backgroundColor: "rgba(255,255,255,0.2)" }
          : { backgroundColor: "rgba(255,255,255,0.0)" }),
        {
          borderRadius: 20,
          borderStyle: "solid",
          borderColor: "black",
          paddingHorizontal: 10,
          paddingVertical: 7,
          margin: 4,
        },
      ]}
      onPress={() => handleCategoryPress(id)}
      key={id}
    >
      <Text style={{ color: "white" }}>{title}</Text>
    </TouchableOpacity>
  );
};
