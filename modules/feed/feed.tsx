import { Box, BoxProps } from "@mui/material";
import request, { gql } from "graphql-request";
import * as React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { useQuery } from "react-query";
import { graphql, useFragment } from "react-relay";
import JsonText from "../../components/JsonText";
import { colors } from "../../constants/dogeStyle";
import { useTokenStore } from "../../store/useTokenStore";
import { PostCard } from "./PostCard";
import { useLike } from "./PostList.hooks";
import { PostList_posts$key } from "./__generated__/PostList_posts.graphql";

function useFeed(token) {
  return useQuery("feed", async () => {
    return await request(
      "https://test.thatclass.co/api/",
      gql`
        query Feed {
          posts(team: "the-late-crew-654", first: 48) {
            edges {
              post: node {
                id
                title
                content
                media {
                  url
                }
                reactions {
                  likes
                  highFives
                  fistBumps
                }
                reacted
                commentsCount
                comments {
                  content
                  createdAt
                  author {
                    username
                    firstName
                    lastName
                    picture {
                      url
                    }
                    rank
                    rankProgress
                  }
                }
                createdAt
                author {
                  id
                  username
                  firstName
                  lastName
                  picture {
                    url
                  }
                  rank
                  rankProgress
                }
                team {
                  id
                  slug
                  name
                }
              }
            }
          }
        }
      `,
      null,
      {
        Authorization: "Bearer " + token,
      }
    );
  });
}

export function PostList(props: any) {
  let { token } = useTokenStore();
  const { status, data, error, isFetching } = useFeed(token);

  // const { posts } = useFragment(postsFragment, rootRef);
  // const like = useLike();

  if (status === "loading") {
    return (
      <View style={styles.container}>
        <Text style={{ color: colors.text }}>Loading...</Text>
      </View>
    );
  }
  if (status === "error") {
    return (
      <View style={styles.container}>
        <Text style={{ color: colors.text }}>{error.message}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.posts?.edges?.map((edge, idx) => {
        return <PostCard key={idx} post={edge.post} />;
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary900,
  },
});
