import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { colors } from "../../constants/appStyle";
// import { } from "../store/useTokenStore";
import { useNavigation } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../assets/";
import { ErrorMessage, Form, Formik } from "formik";
import { Button } from "../components/Button";
import { useTokenStore } from "../../store/useTokenStore";
import { useMutation, useQueryClient } from "react-query";
import request, { gql } from "graphql-request";
import JsonText from "../../components/JsonText";
import { useCurrentUserStore } from "../store/useCurrentUserStore";
import { endpoint } from "../../constants/httpHelper";

import { usePostCardCommentMutationMutation } from "../../_generated";
import { QueryClient } from "../../core/QueryClient";
import { CommonActions } from "@react-navigation/native";

type UpsertCommentInput = {
  id?: string | null | undefined;
  postId?: string | null | undefined;
  parentId?: string | null | undefined;
  content: string;
};

const initialState = {
  input: {
    id: null,
    postId: null,
    parentId: null,
    content: "",
  } as UpsertCommentInput,
  errors: {} as Record<keyof UpsertCommentInput | "_", string[] | undefined>,
  loading: false,
};

export default function PostCardCommentInput({
  postId = null,
  parentId = null,
  autofocus = false,
  post = null,
}) {
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const client = QueryClient();

  const { mutate } = usePostCardCommentMutationMutation(client, {
    onSuccess: (res) => {
      setContent("");
      let newComment = res.upsertComment.comment;
      console.log(post.comments);
      post.comments.push(newComment);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            backgroundColor: colors.primary800,
            padding: 10,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <TextInput
            style={styles.textInput}
            value={content}
            placeholder="Comment"
            placeholderTextColor={"white"}
            autoFocus={autofocus}
            returnKeyType="send"
            onChangeText={setContent}
            onSubmitEditing={(event) => {
              mutate({
                input: {
                  id: null,
                  content: JSON.stringify([
                    {
                      type: "paragraph",
                      children: [{ text: content }],
                    },
                  ]),
                  postId: postId,
                  parentId: parentId,
                },
              });
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    height: 35,
    borderColor: colors.primary500,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 18,
    zIndex: 16,
    color: colors.primary300,
    padding: 10,
  },
  container: {
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  socialContainer: {
    flexDirection: "row",
    marginStart: 20,
    marginEnd: 20,
    marginTop: 20,
    justifyContent: "space-between",
    alignContent: "center",
  },
  socialButton: {
    alignItems: "center",
    borderColor: "#343536",
    borderWidth: 2,
    borderRadius: 2,
    padding: 5,
    paddingVertical: 10,
    width: "47.5%",
    alignSelf: "stretch",
  },
  commentContainer: {
    borderColor: "#262626",
    // backgroundColor: colors.loginInputBackground,
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
    //alignItems: 'center',
    marginStart: 20,
    marginEnd: 20,
    marginTop: 20,
    // marginBottom: 20,
  },
  commentInput: {
    fontSize: 18,
    marginStart: 10,
    color: "white",
  },
  passwordContainer: {
    borderColor: "#262626",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
    //alignItems: 'center',
    marginStart: 20,
    marginEnd: 20,
    // backgroundColor: colors.loginInputBackground,
    // marginBottom: 5,
  },
  errorContainer: {
    justifyContent: "center",
    marginStart: 20,
    marginEnd: 20,
    marginBottom: 20,
  },
  passwordInput: { fontSize: 18, marginStart: 10, color: "white" },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginEnd: 20,
  },
  forgotPasswordText: {
    color: "#0088f8",
  },
  loginContainer: {
    alignItems: "center",
    height: 40,
    marginTop: 30,
    backgroundColor: "#0088f8",
    justifyContent: "center",
    marginStart: 20,
    marginEnd: 20,
    borderRadius: 5,
  },
  loginText: {
    color: "#fff",
  },
  loginHeader: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 50,
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
});
function setState(arg0: (prev: any) => any) {
  throw new Error("Function not implemented.");
}
