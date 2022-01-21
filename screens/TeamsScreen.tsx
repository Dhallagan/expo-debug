import { useNavigation } from "@react-navigation/native";
import request, { gql } from "graphql-request";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useQuery } from "react-query";
import { Loading } from "../components/Loading";
// import { useQuery } from "urql";
import { TeamCard } from "../components/TeamCard";
import { TitledHeader } from "../components/TitledHeader";
import TitledGradientHeader from "../components/TitleGradientHeader";
import { colors } from "../constants/dogeStyle";
import { endpoint } from "../constants/httpHelper";
import { SearchInput } from "../components/SearchInput";
import JsonText from "../components/JsonText";
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
                picture {
                  url
                }
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
  const navigation = useNavigation();
  const { status, data, error, isFetching } = useTeams();
  const [search, setSearch] = useState("");

  if (isFetching) {
    return <Loading />;
  }
  if (error) {
    return <Text>Unable to load teams {error.message}</Text>;
  }

  let filteredTeams = [];
  if (data) {
    filteredTeams = data.teams.edges.filter((x) => {
      return JSON.stringify(x)
        .toLowerCase()
        .includes(search.toString().toLowerCase() || "");
    });
  }

  const handleChange = (e: { target: { value: string } }) => {
    setSearch(e.target.value);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary700 }}>
      <TitledHeader title={"Teams"} showBackButton={true} />
      {/* <HypeTitle /> */}
      {/* <Teams /> */}
      <SearchInput value={search} onChange={setSearch} placeholder={"Search"} />
      {/* <JsonText obj={filteredTeams} /> */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* <JsonText obj={data} /> */}
        {data &&
          filteredTeams.map((x: any, idx: number) => {
            return (
              <TeamCard
                key={x.id}
                id={x.id}
                title={x.team.name}
                team={x.team}
                image={
                  x.team.picture?.url ||
                  "https://upgradedpoints.com/wp-content/uploads/2018/08/New-York-City-752x348@2x.jpg"
                }
                onPress={() => {
                  navigation.navigate("TeamDetail", {
                    team: x.team.slug,
                  });
                }}
              />
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: "center",
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
function uesNavigation() {
  throw new Error("Function not implemented.");
}
