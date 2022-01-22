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
import { colors, radius } from "../../constants/appStyle";
import { SCREEN_WIDTH } from "../../constants";

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
    <View key={comment.id} style={styles.container}>
      <View>
        <ProgressAvatar style={{ marginRight: 10 }} />
      </View>
      <View style={styles.contentBox}>
        <Content sx={{ paddingLeft: 10 }} value={comment.content} />
        <Text style={styles.subText}>{timeToNow} ago</Text>
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
    backgroundColor: colors.primary700,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.m,
    maxWidth: (SCREEN_WIDTH / 4) * 3,
  },
  subText: {
    color: colors.primary500,
    marginLeft: 10,
  },
});
