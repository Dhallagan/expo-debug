import { formatDistanceToNowStrict } from "date-fns";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  YellowBox,
} from "react-native";
import * as React from "react";
import ProgressAvatar from "../../components/ProgressAvatar";
import { Content } from "./Content";

type PostCardCommentProps = {
  comment: Any;
};

export function PostCardComment(props: PostCardCommentProps) {
  const { comment } = props;
  const author = `${comment.author.firstName} ${comment.author.lastName}`;
  const authorLink = `/@${comment.author?.username}`;

  const timeToNow = formatDistanceToNowStrict(
    new Date(comment.createdAt as string)
  );

  return (
    <View style={styles.container}>
      <View>
        <ProgressAvatar />
      </View>
      <View style={styles.contentBox}>
        <Content value={comment.content} />
        <Text style={styles.text}>{timeToNow} ago</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  contentBox: {
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    marginLeft: 10,
  },
});
