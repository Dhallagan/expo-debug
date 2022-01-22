import React from "react";
import { colors, radius } from "../constants/appStyle";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { RoomCardHeading } from "./CardHeading";

export type FeaturedStudioCardProps = {
  // style?: ViewStyle;
  title: string;
  // avatarSrcs: ImageSourcePropType[];
  onPress?: () => void;
};

export const FeaturedStudioCard: React.FC<FeaturedStudioCardProps> = ({
  //   style,
  title,
  onPress,
}) => {
  const image = {
    uri: "https://images.squarespace-cdn.com/content/v1/5ecd211c46870e7084bda0dc/1624512440599-5QSU3NJ6E3VRBQDGF056/Test%2B1.4.jpg?format=750w",
  };
  return (
    <ImageBackground
      source={image}
      style={{ width: "100%", height: 300, borderRadius: radius.l }}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>Kayleigh Cohen</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 36,
  },
});
