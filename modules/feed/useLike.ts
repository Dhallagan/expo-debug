
import React from "react";
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
} from "react-native";
import { colors } from "../constants/dogeStyle";
// import { } from "../store/useTokenStore";
import { useNavigation } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../assets/";
import { ErrorMessage, Formik } from "formik";
import { Button } from "../components/Button";
import { useLoginStore, useTokenStore } from "../store/useTokenStore";
import { useSignIn } from "../queries";
import { useMutation } from "react-query";
import request, { gql } from "graphql-request";
import JsonText from "../components/JsonText";
import { useCurrentUserStore } from "../store/useCurrentUserStore";
import { endpoint } from "../constants/httpHelper";


const LIKE_MUTATION = gql`
mutation LoginMutation($input: SignInInput!) {
  signIn(input: $input) {
    user {
      id
      email
      username
      firstName
      lastName
      picture {
        url
      }
      timeZone
      locale
    }
    accessToken
  }
}
`;
// type LikeInput = {
// username?: string | null | undefined;
// password?: string | null | undefined;
// accessToken: true;
// };

export function useLike(id: string) {
    useMutation((id) => {
        request(endpoint, LIKE_MUTATION, {
          postId: id, reaction: "HighFive",
        })
          .then((res) => {
            alert(res)
          })    
          .catch((errors) => {
            // const err = errors.response.errors?.[0];
            // setState((prev) => ({
            //   ...prev,
            //   errors: err?.errors ?? (err ? { _: [err.message] } : {}),
            // }));
          });
      });
}
