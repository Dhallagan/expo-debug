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
import { colors } from "../constants/appStyle";
// import { colors } from "../../constants/dogeStyle";

export type HeaderBaseProps = ViewProps & {
  xs: Object | null;
  absolute: boolean;
  showBackButton?: boolean;
};

export const HeaderBase: React.FC<HeaderBaseProps> = ({
  xs = null,
  showBackButton = true,
  absolute = false,
  children,
}) => {
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.container,
        absolute ? styles.absolute : null,
        xs ? xs : null,
      ]}
    >
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
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 20,
    backgroundColor: "transparent",
  },
});
