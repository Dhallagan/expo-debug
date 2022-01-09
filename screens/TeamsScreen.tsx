import request, { gql } from "graphql-request";
import React from "react";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "react-query";
// import { useQuery } from "urql";
import { TeamCard } from "../components/TeamCard";
import TitledGradientHeader from "../components/TitleGradientHeader";
import { colors } from "../constants/dogeStyle";
import { PostList } from "../modules/feed/Feed";
import SocialTabView from "../modules/social/SocialTabView";

function useTeams() {
  return useQuery("teams", async () => {
    return await request(
      "https://test.thatclass.co/api/",
      gql`
        query {
          teams {
            edges {
              team: node {
                id
                slug
                name
                description
              }
            }
          }
        }
      `
    );
  });
}

export default function TeamsScreen() {
  const inset = useSafeAreaInsets();

  const { status, data, error, isFetching } = useTeams();

  if (isFetching) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Oh no... {error.message}</Text>;
  }
  return (
    <>
      {/* <View style={styles.container}> */}
      <TitledGradientHeader>Social</TitledGradientHeader>
      {/* <HypeTitle /> */}
      {/* <Teams /> */}
      <SocialTabView />
      {/* <PostList /> */}
      {/* </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary900,
  },
  topNavigation: {
    paddingTop: 10,
    paddingHorizontal: 5,
    flex: 0,
    flexDirection: "row",
    backgroundColor: colors.primary900,
  },
  text: {
    color: "#fff",
  },
});
