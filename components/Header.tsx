import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { images } from "../assets";
import { colors } from "../constants/dogeStyle";

export default function Header() {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();

  return (
    <>
      <View style={[styles.container, { paddingTop: inset.top }]}>
        <View style={styles.leftContainer}>
          <Image
            source={images.logoTransparent}
            style={{ height: 30, width: 225 }}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.rightContainer}>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <View style={{ padding: 10 }}>
              <Icon
                onPress={() => {
                  navigation.navigate("Invite");
                }}
                name={"person-add-outline"}
                size={20}
                color={"white"}
              />
            </View>
          </View>
          <View style={{ flexDirection: "column", justifyContent: "center" }}>
            <Icon
              name={"ios-notifications"}
              size={20}
              color={"white"}
              onPress={() => navigation.navigate("Notifications")}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.primary800,
    flexDirection: "row",
  },
  text: {
    color: "#fff",
  },
  leftContainer: {
    paddingHorizontal: 10,
    height: 70,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  rightContainer: {
    paddingHorizontal: 25,
    flexDirection: "row",
  },
  nextClass: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
