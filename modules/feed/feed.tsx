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
import { colors } from "../../constants/appStyle";
import { useTokenStore } from "../../store/useTokenStore";
import { PostCard } from "./PostCard";
import { useFeedQuery } from "../../_generated";
import { QueryClient } from "../../core/QueryClient";
import { Loading } from "../../components/Loading";
import { useForceUpdate } from "../../core/useForceUpdate";

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
    after: 0,
  });

  // console.log("============= FEED =============");
  // console.log(data);
  // console.log("================================");

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

  const activity = data.posts?.edges.length > 0 ? true : false;
  if (activity) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {data.posts?.edges?.map((edge, idx) => {
          try {
            return (
              <PostCard
                key={idx}
                post={edge.post}
                scope={team ? "user" : "team"}
              />
            );
          } catch (err) {
            return null;
          }
        })}
      </ScrollView>
    );
  } else {
    return (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateTitle}>Your feed is a little empty</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary900,
  },
  emptyStateContainer: {
    flex: 1,
    backgroundColor: colors.primary900,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateTitle: {
    fontSize: 20,
    color: colors.text,
    fontWeight: "bold",
  },
});
