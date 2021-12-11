import React, { useState } from "react";
import {
  Text,
  KeyboardAvoidingView,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants";
import { colors, fontFamily, fontSize, radius } from "../constants/dogeStyle";

interface ClassOptionsModalProps {
  onRequestClose: () => void;
}
export const ClassOptionsScreen: React.FC<ClassOptionsModalProps> = ({
  onRequestClose,
}) => {
  const inset = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingBottom: 20, paddingTop: 20 }]}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => onRequestClose()}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => onRequestClose()}
        >
          <Text style={styles.backButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>

      <ScrollView keyboardShouldPersistTaps="handled">
        <Text style={styles.titleText}>Instructors</Text>

        <TouchableOpacity onPress={() => onRequestClose()}>
          <View style={{ display: "flex", width: "100%" }}>
            <View style={{ flex: 0, flexDirection: "row" }}>
              <Text
                style={{
                  flex: 1,
                  color: "white",
                  fontSize: 20,
                  alignSelf: "center",
                }}
              >
                Mantas
              </Text>
              <CheckBox style={styles.checkbox} />
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SCREEN_HEIGHT / 2 - 100,
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.primary800,
    borderRadius: 20,
    borderColor: colors.primary800,
  },
  topContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  applyButton: {
    paddingLeft: 20,
  },
  titleText: {
    // fontFamily: fontFamily.extraBold,
    fontSize: fontSize.h4,
    color: colors.text,
    fontWeight: "bold",
  },
  roomNameEditText: {
    height: 40,
    backgroundColor: colors.primary600,
    paddingHorizontal: 16,
    borderRadius: radius.m,
    marginTop: 16,
    color: colors.text,
  },
  cancelButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius.m,
    height: 38,
  },
  cancelButtonText: {
    color: colors.text,
    // fontFamily: fontFamily.regular,
    fontSize: fontSize.paragraph,
    fontWeight: "700",
    alignSelf: "center",
    textDecorationLine: "underline",
  },
  backButtonText: {
    color: colors.text,
    // fontFamily: fontFamily.regular,
    fontSize: fontSize.paragraph,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  backButton: {
    justifyContent: "center",
    borderRadius: radius.m,
    height: 38,
  },
  checkbox: {
    alignSelf: "center",
  },
});
