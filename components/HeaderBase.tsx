import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../constants/dogeStyle";
// import { colors } from "../../constants/dogeStyle";

export type HeaderBaseProps = ViewProps & {
  showBackButton?: boolean;
};

export const HeaderBase: React.FC<HeaderBaseProps> = ({
  showBackButton = true,
  children,
}) => {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  return (
    <View style={[styles.container]}>
      {showBackButton && (
        <TouchableOpacity
          style={styles.leftContainer}
          onPress={() => navigation.goBack()}
        >
          <Icon
            name="ios-chevron-back"
            size={30}
            color="white"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.primary800,
    flexDirection: "row",
  },
  leftContainer: {
    paddingLeft: 25,
    height: 60,
    justifyContent: "center",
  },
});
