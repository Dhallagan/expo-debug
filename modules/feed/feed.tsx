import { Box, BoxProps } from "@mui/material";
import request, { gql, GraphQLClient } from "graphql-request";
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
import { useFeedQuery } from "../../_generated";
import { QueryClient } from "../../core/QueryClient";

// function useFeed(token, team, user) {
//   return useQuery("feed", async () => {
//     return await request(
//       "https://test.thatclass.co/api/",
//       gql`
//         query Feed($team: String, $user: String) {
//           posts(team: $team, user: $user, first: 48) {
//             edges {
//               post: node {
//                 id
//                 title
//                 content
//                 media {
//                   url
//                 }
//                 reactions {
//                   likes
//                   highFives
//                   fistBumps
//                 }
//                 reacted
//                 commentsCount
//                 comments {
//                   content
//                   createdAt
//                   author {
//                     username
//                     firstName
//                     lastName
//                     picture {
//                       url
//                     }
//                     rank
//                     rankProgress
//                   }
//                 }
//                 createdAt
//                 author {
//                   id
//                   username
//                   firstName
//                   lastName
//                   picture {
//                     url
//                   }
//                   rank
//                   rankProgress
//                 }
//                 team {
//                   id
//                   slug
//                   name
//                 }
//               }
//             }
//           }
//         }
//       `,
//       { team: team, user: user },
//       {
//         Authorization: "Bearer " + token,
//       }
//     );
//   });
// }

type FeedProps = {
  team?: String | undefined;
  user?: String | undefined;
};

export function PostList(props: FeedProps) {
  const { team, user } = props;
  let { token } = useTokenStore();
  if (team == undefined && user == undefined) {
    return <Text>Error team or user not supplied</Text>;
  }

  const client = QueryClient();
  const { status, data, error, isFetching } = useFeedQuery(client, {
    user: user,
    team: team,
  });

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
        return (
          <PostCard key={idx} post={edge.post} scope={team ? "user" : "team"} />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary900,
  },
});
