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
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants";
import { Chip } from "./Chip";
import { baseProps } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlers";
import { format } from "date-fns";

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
  const date = scheduledFor ? new Date(scheduledFor) : null;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} key={id}>
      <Image
        source={{
          url:
            image ||
            "https://images.squarespace-cdn.com/content/v1/54dcf200e4b0901d786a8922/1468359374400-ZXJ3P3NIKZEAJOM1LGVV/image-asset.jpeg",
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{title}</Text>
      <Chip title={format(date, "MMMM d p")} />
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
    borderRadius: 4,
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
    borderRadius: 4,
    borderWidth: 5,
    borderColor: "transparent",
    opacity: 0.5,
  },
  eventType: {
    color: "white",
  },
});
