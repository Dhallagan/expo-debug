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
          {/* <ProfileButton icon={{ uri: conn.user.avatarUrl }} /> */}
          <Image source={images.logoSmall} />
        </View>
        <View style={styles.rightContainer}>
          {/* <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <View style={{  flexDirection: 'column' }}>
                            <Text style={styles.nextClass }>Next Class:</Text>
                            <Text style={styles.nextClass}> 3pm</Text>
                        </View>
                    </View> */}
          <Icon
            name={"ios-notifications"}
            size={20}
            color={"white"}
            onPress={() => navigation.navigate("Notifications")}
          />
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
    paddingHorizontal: 25,
  },
  text: {
    color: "#fff",
  },
  leftContainer: {
    height: 70,
    justifyContent: "center",
  },
  rightContainer: {
    flexDirection: "row",
  },
  nextClass: {
    color: "#fff",
  },
});
