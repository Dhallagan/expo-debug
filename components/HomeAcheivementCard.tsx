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
import { CardHeading, RoomCardHeading } from "./CardHeading";

export type HomeAcheivementCardProps = {
  // style?: ViewStyle;
  title: string;
  // avatarSrcs: ImageSourcePropType[];
  subtitle: string;
  scheduledFor?: Date;
  listeners: number;
  tags: React.ReactNode[];
  onPress?: () => void;
};

export const HomeAchievementCard: React.FC<HomeAcheivementCardProps> = ({
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
        <Image source={image} resizeMode="cover" style={styles.image} />
        <View style={styles.topContainer}>
          <View style={styles.topLeftContainer}>
            <CardHeading icon={undefined} text={title} />
            <View style={styles.subtitleContainer}>
              {/* {avatarSrcs.length > 0 && (
                //   <MultipleUserAvatar
                //     srcArray={avatarSrcs}
                //     size={"xs"}
                //     translationRatio={1.5}
                //   />
                )} */}
              <Text style={styles.subtitle} numberOfLines={1}>
                {subtitle}
              </Text>
            </View>
          </View>
          <View style={styles.topRightContainer}></View>
        </View>
        <View />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    borderRadius: radius.m,
    marginBottom: 10,
  },
  image: {
    position: "absolute",
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    borderRadius: radius.m,
    borderWidth: 5,
    borderColor: "transparent",
  },
  topContainer: {
    padding: 10,
    flexDirection: "row",
    backgroundColor: "#000000a0",
    borderRadius: radius.s,
  },
  topLeftContainer: {
    flex: 1,
  },
  topRightContainer: {
    // backgroundColor: "#000000c0"
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
