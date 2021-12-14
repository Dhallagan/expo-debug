import request, { gql } from "graphql-request";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "react-query";
// import { useQuery } from "urql";
import { TeamCard } from "../components/TeamCard";
import TitledGradientHeader from "../components/TitleGradientHeader";
import { colors } from "../constants/dogeStyle";

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
                membership
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
      <TitledGradientHeader>Teams</TitledGradientHeader>
      {/* <HypeTitle /> */}
      {/* <Teams /> */}

      <ScrollView contentContainerStyle={styles.container}>
        {/* <JsonText obj={data} /> */}
        {data &&
          data.teams.edges.map((x: any, idx: number) => {
            return (
              <TeamCard
                key={x.id}
                id={x.id}
                title={x.team.name}
                team={x.team}
                image={
                  "https://upgradedpoints.com/wp-content/uploads/2018/08/New-York-City-752x348@2x.jpg"
                }
                onPress={() => {
                  alert("Go to Team");
                }}
              />
            );
          })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingTop: 10,
    paddingHorizontal: 5,
    backgroundColor: colors.primary700,
  },
  topNavigation: {
    paddingTop: 10,
    paddingHorizontal: 5,
    flex: 0,
    flexDirection: "row",
    backgroundColor: colors.primary700,
  },
  text: {
    color: "#fff",
  },
});
