import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { TitledHeader } from "../components/TitledHeader";
import { colors, fontFamily, fontSize, radius } from "../constants/appStyle";
import { Video } from "expo-av";
import { Chip } from "../components/Chip";
import { PostCard } from "../modules/feed/PostCard";
import { QueryClient } from "react-query";
import JsonText from "../components/JsonText";
import { baseProps } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlers";
import { PostCardComment } from "../modules/feed/PostCardComment";
import ProgressAvatar from "../components/ProgressAvatar";
import PostCardCommentInput from "../modules/feed/PostCardCommentInput";
import { ScrollView } from "react-native-gesture-handler";

interface PostDetailProps {
  onRequestClose: () => void;
  // route: any;
  post: any;
}

export const PostDetailScreen: React.FC<PostDetailProps> = ({
  onRequestClose,
  // post,
  route,
}) => {
  let post = route.params.post;
  let autofocus = route.params.autofocus;
  const inset = useSafeAreaInsets();

  return (
    <>
      {/* < */}
      <SafeAreaView style={styles.container}>
        <TitledHeader showBackButton={true} title={"Comments"} />

        <ScrollView style={{ flex: 1 }}>
          <PostCard
            key={post.id}
            post={post}
            disableTouchableOpacity={true}
            commentNum={1000}
          />
        </ScrollView>
        <PostCardCommentInput
          postId={post.id}
          post={post}
          autofocus={autofocus}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  // containerLoad: {
  //   flex: 1,
  //   backgroundColor: colors.primary800,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  container: {
    flex: 1,
    backgroundColor: colors.primary800,
  },
  inner: {
    flex: 1,
    // justifyContent: "space-around",
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: colors.primary500,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
    zIndex: 16,
    color: colors.primary300,
    padding: 10,
  },
});
