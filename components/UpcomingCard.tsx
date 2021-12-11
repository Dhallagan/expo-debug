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
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants";
import { Chip } from "./Chip";
import { baseProps } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlers";

export type UpcomingCardProps = {
  // style?: ViewStyle;
  id: string;
  title: string;
  eventType: string;
  scheduledFor: string;
  //avatarSrcs: ImageSourcePropType[];
  image: string;
  onPress?: () => void;
};

export const UpcomingCard: React.FC<UpcomingCardProps> = ({
  //   style,
  id,
  title,
  eventType,
  scheduledFor,
  image,
  onPress,
}) => {
  const src = { uri: image || undefined };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} key={id}>
      <Image
        source={{
          url: "https://test-s.thatclass.co/c/jgh57f.jpeg?v=4",
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{title}</Text>
      <Chip title={scheduledFor} />
      <View style={{ flex: 0, flexDirection: "row" }}>
        <Text style={styles.eventType} title={eventType} />
        {/* <Chip title="20m"/> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: (SCREEN_HEIGHT - 100) / 5,
    borderRadius: 10,
    borderStyle: "solid",
    // backgroundColor: colors.primary100,
    width: SCREEN_WIDTH,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
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
  eventType: {
    color: "white",
  },
});
