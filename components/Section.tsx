import React from "react";
import { colors, radius } from "../constants/appStyle";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { RoomCardHeading } from "./CardHeading";

export type SectionProps = {
  // style?: ViewStyle;
  title: string;
  // avatarSrcs: ImageSourcePropType[];
  subtitle: string;
  styles: Object;
  onPress?: () => void;
};

export const Section: React.FC<RoomCardProps> = ({
  style,
  title,
  //   avatarSrcs,
  subtitle,
  scheduledFor,
  listeners,
  tags,
  onPress,
  children,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.topContainer}>
        <View style={styles.topLeftContainer}>
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "white" }}>
            {title}
          </Text>
          <View style={styles.subtitleContainer}></View>
        </View>
      </View>
      <View>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
  topContainer: {
    flexDirection: "row",
    paddingLeft: 5,
  },
  topLeftContainer: {
    flex: 1,
    // borderLeftColor: colors.coral,
    // borderLeftWidth: 3,
    paddingLeft: 5,
  },
  topRightContainer: {},
  headingContainer: {
    flexDirection: "row",
  },
  subtitleContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
});
