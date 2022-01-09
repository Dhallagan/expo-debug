import * as React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";
import { Card } from "react-native-elements/dist/card/Card";
import ProgressAvatar from "../../components/ProgressAvatar";
import { formatDistanceToNowStrict } from "date-fns";
import JsonText from "../../components/JsonText";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants";
import { Button } from "../../components/Button";
import { colors } from "../../constants/dogeStyle";
import { PostCardComment } from "./PostCardComment";
import { Content } from "./Content";
import { CardDivider } from "../../components/CardDivider";
import { color } from "react-native-elements/dist/helpers";

type PostCardProps = {
  post: Any;
  scope: String;
  onClickLike?: () => void;
};
export function PostCard(props: PostCardProps) {
  const { post, scope } = props;
  const team = `${post.team.name}`;
  const author = `${post.author?.firstName} ${post.author?.lastName}`;
  const color = `${post.author?.rank}`;
  const progress = `${post.author?.rankProgress}`;
  const teamLink = `/t/${post.team.slug}`;
  const authorLink = `/@${post.author?.username}`;
  const image = { uri: post.media.url };

  const [desiredHeight, setDesiredHeight] = React.useState(0);
  if (post.media.url) {
    Image.getSize(post.media.url, (width, height) => {
      setDesiredHeight((SCREEN_WIDTH / width) * height);
    });
  }

  return (
    <View key={post.id} style={styles.container}>
      {/* <Divider
        style={{ borderColor: "rgba(255, 255, 255, 0.05)", marginBottom: 1 }}
      /> */}
      <View style={styles.topContainer}>
        <View style={styles.leftHeader}>
          {/* Progress Avatar */}
          <ProgressAvatar />
        </View>
        <View style={styles.rightHeader}>
          {/* Name of person or team */}
          {scope == "team" && <Text style={styles.teamTitle}>{team}</Text>}
          <Text style={styles.userTitle}>{author}</Text>
          <Text style={styles.subtitleText}>{`${formatDistanceToNowStrict(
            new Date(post.createdAt)
          )} ago`}</Text>
        </View>
      </View>

      <CardDivider />

      <View>
        {/* Content */}

        {post.content && <Content sx={{ padding: 10 }} value={post.content} />}

        {/* Media */}

        {post.media.url && (
          // {/* <JsonText obj={post.media} /> */}
          <Image
            source={image}
            resizeMode="cover"
            style={{
              width: SCREEN_WIDTH - 10,
              height: desiredHeight,
            }}
          />
        )}
      </View>

      <CardDivider />

      <View style={styles.topContainer}>
        {/*  */}
        <TouchableOpacity
          style={{ padding: 10, flexDirection: "row", alignItems: "center" }}
        >
          <Text style={{ fontSize: 20 }}>✋</Text>
          {post.reactions.highFives > 0 ? (
            <Text style={{ color: "#fff", fontSize: 16 }}>
              {post.reactions.highFives} Fives
            </Text>
          ) : (
            <Text style={{ color: "#fff", fontSize: 18 }}></Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={{ padding: 10, flexDirection: "row", alignItems: "center" }}
        >
          <Text style={{ fontSize: 20 }}>💬</Text>
          {post.commentsCount > 0 ? (
            <Text style={{ color: "#fff", fontSize: 16 }}>
              {post.commentsCount} Comments
            </Text>
          ) : (
            <Text style={{ color: "#fff", fontSize: 18 }}>0 Comments</Text>
          )}
        </TouchableOpacity>
      </View>

      <CardDivider />

      <View style={{ paddingTop: 5 }}>
        {post.comments?.map((x, idx) => (
          <PostCardComment
            key={idx}
            comment={x}
            // onClickDelete={state.handleClickDelete}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH - 10,
    justifyContent: "center",
    marginVertical: 5,
    backgroundColor: colors.primary800,
    paddingBottom: 20,
    borderRadius: 10,
    margin: 5,
  },
  topContainer: {
    flex: 0,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 2,
  },
  leftHeader: {
    flex: 0,
    padding: 10,
  },
  rightHeader: {
    flex: 1,
    color: "#fff",
  },
  teamTitle: {
    color: colors.primary300,
    fontSize: 14,
    paddingBottom: 2,
  },
  userTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  subtitleText: {
    color: colors.primary500,
  },
});
