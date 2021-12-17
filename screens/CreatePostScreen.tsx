import request, { gql } from "graphql-request";
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
import { useMutation } from "react-query";
import { SCREEN_HEIGHT } from "../constants";
import { colors, fontFamily, fontSize, radius } from "../constants/dogeStyle";
import { ErrorMessage, Formik } from "formik";
import { useTokenStore } from "../store/useTokenStore";

const UPSERT_POST = gql`
  mutation CreatePostCardMutation(
    $input: UpsertPostInput!
    $connections: [ID!]!
  ) {
    upsertPost(input: $input) {
      postEdge @prependEdge(connections: $connections) {
        node {
          id
        }
      }
    }
  }
`;

interface CreatePostModalProps {
  onRequestClose: () => void;
}
type UpsertPostInput = {
  id?: string | null | undefined;
  team?: string | null | undefined;
  title?: string | null | undefined;
  content: string;
  media?: string | null | undefined;
};

export const CreatePostScreen: React.FC<CreatePostModalProps> = ({
  onRequestClose,
}) => {
  const inset = useSafeAreaInsets();
  let { token } = useTokenStore();

  const mutation = useMutation((input: UpsertPostInput) => {
    alert(JSON.stringify(input));

    return request(
      "https://test.thatclass.co/api/",
      UPSERT_POST,
      {
        input,
      },
      {
        Authorization: "Bearer " + token,
      }
    );
  });

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
        </View>

        <ScrollView keyboardShouldPersistTaps="handled">
          <Formik
            initialValues={{
              content: "",
            }}
            onSubmit={(values) => mutation.mutate(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <>
                <View style={{ display: "flex", width: "100%" }}>
                  <TextInput
                    style={[styles.roomNameEditText]}
                    placeholder={"What's on your mind?"}
                    placeholderTextColor={"white"}
                    onChangeText={handleChange("content")}
                    onBlur={handleBlur("content")}
                    value={values.content}
                  />
                  <Icon
                    size={28}
                    name="ios-image-outline"
                    color={"white"}
                    style={{ flex: 0 }}
                  />
                </View>
                <TouchableOpacity
                  style={styles.postButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.titleText}>Post</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => onRequestClose()}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
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
    fontSize: fontSize.h2,
    color: colors.text,
    fontWeight: "bold",
    alignSelf: "center",
  },
  roomNameEditText: {
    height: 80,
    paddingHorizontal: 0,
    borderRadius: radius.m,
    marginTop: 5,
    color: colors.text,
    fontSize: fontSize.h3,
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
    fontSize: fontSize.h3,
    fontWeight: "700",
    alignSelf: "flex-end",
    textDecorationLine: "underline",
  },
});
