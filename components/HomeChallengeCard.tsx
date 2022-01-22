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

export type HomeChallengeCardProps = {
  // style?: ViewStyle;
  title: string;
  // avatarSrcs: ImageSourcePropType[];
  subtitle: string;
  scheduledFor?: Date;
  listeners: number;
  tags: React.ReactNode[];
  onPress?: () => void;
};

export const HomeChallengeCard: React.FC<HomeChallengeCardProps> = ({
  //   style,
  title,
  //   avatarSrcs,
  subtitle,
  scheduledFor,
  listeners,
  tags,
  onPress,
}) => {
  const image = { uri: "https://test-s.thatclass.co/c/e9fkh4.jpg?v=2" };
  return (
    <>
      <TouchableOpacity style={[styles.container]} onPress={onPress}>
        <View style={styles.topContainer}>
          <View style={styles.topLeftContainer}>
            <RoomCardHeading icon={undefined} text={title} />
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle} numberOfLines={1}>
                {subtitle}
              </Text>
            </View>
          </View>
          <View style={styles.topRightContainer}>
            <Image source={image} style={styles.image} />
          </View>
        </View>
        <View />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary800,
    borderRadius: radius.m,
    marginBottom: 10,
  },
  image: {
    flex: 1,
    backgroundColor: "#000000c0",
    justifyContent: "center",
  },
  topContainer: {
    padding: 10,
    flexDirection: "row",
    backgroundColor: "#000000c0",
  },
  topLeftContainer: {
    flex: 1,
  },
  topRightContainer: {
    backgroundColor: "#000000c0",
  },
  headingContainer: {
    flexDirection: "row",
  },
  subtitleContainer: {
    flexDirection: "row",
  },
  subtitle: {
    color: colors.primary300,
    flex: 1,
  },
});
