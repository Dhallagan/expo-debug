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
import { createIconSetFromFontello } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";

type PostCardProps = {
  post: Any;
  scope: String;
  onClickLike?: () => void;
};

function resizeURL(img) {
  return (
    "https://test.thatclass.co/img/w_" +
    SCREEN_WIDTH +
    "/p/" +
    img.split("/").pop()
  );
}
export function PostCard(props: PostCardProps) {
  const navigation = useNavigation();
  const { post, scope } = props;
  const team = `${post.team.name}`;
  const author = `${post.author?.firstName} ${post.author?.lastName}`;
  const color = `${post.author?.rank}`;
  const progress = `${post.author?.rankProgress}`;
  const teamLink = `/t/${post.team.slug}`;
  const authorLink = `/@${post.author?.username}`;
  const image = { uri: resizeURL(post.media.url) };

  const [desiredHeight, setDesiredHeight] = React.useState(0);
  if (post.media.url) {
    Image.getSize(resizeURL(post.media.url), (width, height) => {
      setDesiredHeight((SCREEN_WIDTH / width) * height);
    });
  }
  console.log(JSON.stringify(image));

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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("PostDetail", {
                post: post,
                autofocus: false,
              })
            }
          >
            <Image
              source={image}
              resizeMode="cover"
              style={{
                width: SCREEN_WIDTH - 10,
                height: desiredHeight,
              }}
            />
          </TouchableOpacity>
        )}
      </View>

      <CardDivider />

      <View style={styles.topContainer}>
        {/*  */}
        <TouchableOpacity
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            color: "#fff",
            borderColor: colors.primary600,
            borderWidth: 2,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 14 }}>✋</Text>
          {post.reactions.highFives ? (
            <Text style={{ color: "#fff", fontSize: 14 }}>
              {post.reactions.highFives}
            </Text>
          ) : (
            <Text style={{ color: "#fff", fontSize: 14 }}></Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            borderColor: colors.primary600,
            borderWidth: 2,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 10,
            margin: 5,
          }}
          onPress={() =>
            navigation.navigate("PostDetail", {
              post: post,
            })
          }
        >
          <Text>💬</Text>
          {post.commentsCount > 0 ? (
            <Text style={{ color: "#fff", fontSize: 14 }}>
              {post.commentsCount} Comments
            </Text>
          ) : (
            <Text style={{ color: "#fff", fontSize: 14 }}> 0 Comments</Text>
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
    // justifyContent: "center",
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
  reactionContainer: {
    fontSize: 20,
    color: "#fff",
    borderColor: colors.primary600,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
});
