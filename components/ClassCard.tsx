import React from "react";
import { colors, radius } from "../constants/dogeStyle";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { RoomCardHeading } from "./CardHeading";
import { SCREEN_HEIGHT } from "../constants";
import { Chip } from "../components/Chip";
import { baseProps } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlers";

export type ClassCardProps = {
  // style?: ViewStyle;
  id: string;
  title: string;
  //avatarSrcs: ImageSourcePropType[];
  image: string;
  onPress?: () => void;
};

export const ClassCard: React.FC<ClassCardProps> = ({
  //   style,
  id,
  title,
  image,
  onPress,
}) => {
  const src = { uri: image || undefined };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} key={id}>
      <Image source={src} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{title}</Text>
      <View style={{ flex: 0, flexDirection: "row" }}>
        <Chip title="Mantas" />
        {/* <Chip title="20m"/> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: (SCREEN_HEIGHT - 100) / 5,
    borderWidth: 5,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: colors.primary800,
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 5,
    padding: 2,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  tags: {
    color: "white",
    fontSize: 18,
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 10,
    borderWidth: 5,
    borderColor: "transparent",
  },
});
