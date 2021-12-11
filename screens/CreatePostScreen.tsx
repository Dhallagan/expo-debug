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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { SCREEN_HEIGHT } from "../constants";
import { colors, fontFamily, fontSize, radius } from "../constants/dogeStyle";

interface CreatePostModalProps {
  onRequestClose: () => void;
}
export const CreatePostScreen: React.FC<CreatePostModalProps> = ({
  onRequestClose,
}) => {
  const inset = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
      <View
        style={[
          styles.container,
          { paddingBottom: 20 + inset.bottom, paddingTop: 20 + inset.top },
        ]}
      >
        <View style={styles.topContainer}>
          <Text style={styles.titleText}>Create Post</Text>
          <Icon
            size={28}
            name="chevron-down"
            color={"white"}
            style={{ flex: 1, alignSelf: "center" }}
          />
          <TouchableOpacity style={styles.postButton}>
            <Text style={styles.titleText}>Post</Text>
          </TouchableOpacity>
        </View>

        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={{ display: "flex", width: "100%" }}>
            <TextInput
              placeholder={"What's on your mind?"}
              placeholderTextColor={colors.primary300}
              style={[styles.roomNameEditText]}
              autoFocus={true}
              value={""}
            />
            <Icon
              size={28}
              name="ios-image-outline"
              color={"white"}
              style={{ flex: 0 }}
            />
          </View>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => onRequestClose()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.primary800,
  },
  topContainer: {
    flex: 0,
    flexDirection: "row",
  },
  postButton: {
    flex: 0,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: radius.m,
    height: 40,
    backgroundColor: colors.primary600,
  },
  titleText: {
    // flex:1,
    // fontFamily: fontFamily.extraBold,
    fontSize: fontSize.h4,
    color: colors.text,
    fontWeight: "bold",
    alignSelf: "center",
  },
  roomNameEditText: {
    height: 80,
    // backgroundColor: colors.primary600,
    paddingHorizontal: 0,
    borderRadius: radius.m,
    marginTop: 5,
    color: colors.text,
    fontSize: fontSize.h4,
    flex: 1,
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
    alignSelf: "flex-end",
    textDecorationLine: "underline",
  },
});
