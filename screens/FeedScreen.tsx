import request, { gql } from "graphql-request";
import React from "react";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "react-query";
// import { useQuery } from "urql";
import { TeamCard } from "../components/TeamCard";
import TitledGradientHeader from "../components/TitleGradientHeader";
import { colors } from "../constants/appStyle";
import { endpoint } from "../constants/httpHelper";
import { PostList } from "../modules/feed/Feed";
import SocialTabView from "../modules/social/SocialTabView";

function useTeams() {
  return useQuery("teams", async () => {
    return await request(
      endpoint,
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

export default function FeedScreen() {
  const inset = useSafeAreaInsets();

  const { status, data, error, isFetching } = useTeams();

  if (status === "loading") {
    return (
      <View style={styles.containerLoad}>{/* <Text>Loading...</Text> */}</View>
    );
  }
  if (error) {
    return <Text>Oh no... {error.message}</Text>;
  }
  return (
    <>
      <TitledGradientHeader>Social</TitledGradientHeader>
      <SocialTabView />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary900,
  },
  containerLoad: {
    flex: 1,
    backgroundColor: colors.primary800,
    justifyContent: "center",
    alignItems: "center",
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
