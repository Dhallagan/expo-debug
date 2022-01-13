import { Box, BoxProps } from "@mui/material";
import request, { gql, GraphQLClient } from "graphql-request";
import * as React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
  VirtualizedList,
  SafeAreaView,
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
import { Loading } from "../../components/Loading";

type FeedProps = {
  team?: String | undefined;
  user?: String | undefined;
};

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export function PostList(props: FeedProps) {
  const { team, user } = props;
  let { token } = useTokenStore();
  if (team == undefined && user == undefined) {
    return <Text>Error team or user not supplied</Text>;
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  const client = QueryClient();
  const { status, data, error, isFetching, fetch } = useFeedQuery(client, {
    user: user,
    team: team,
    after: 1,
  });

  // const { posts } = useFragment(postsFragment, rootRef);
  // const like = useLike();

  if (status === "loading") {
    return <Loading />;
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
