import React from "react";
import { Header } from "../../components/header/Header";
import { BottomNavigator } from "../../navigation/mainNavigator/BottomNavigator";
import { StyleSheet, View } from "react-native";
import { colors } from "../../constants/dogeStyle";

export const MainController: React.FC = () => {
  return (
    <View style={styles.container}>
      <BottomNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary900,
  },
});
