import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Chip } from "../components/Chip";
import { ClassCard } from "../components/ClassCard";
import ClassHeader from "../components/ClassHeader";
import { colors } from "../constants/dogeStyle";
import TitledGradientHeader from "../components/TitleGradientHeader";
// import { useClasses } from "../queries";
import JsonText from "../components/JsonText";
import { useQuery } from "react-query";
import request, { gql } from "graphql-request";

const endpoint = "https://test.thatclass.co/api/";

function useClasses() {
  return useQuery("classes", async () => {
    return await request(
      "https://test.thatclass.co/api/",
      gql`
        query {
          classes {
            pageInfo {
              startCursor
              endCursor
            }
            totalCount
            edges {
              node {
                id
                title
                cover {
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

export default function ClassesScreen() {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();

  const { status, data, error, isFetching } = useClasses();

  if (status === "loading") {
    return <Text>Loading...</Text>;
  }
  if (status === "error") {
    return <Text>Oh no... {error.message}</Text>;
  }

  return (
    <>
      <ClassHeader title={"Classes"} style={{ color: "white" }}>
        <TitledGradientHeader>Classes</TitledGradientHeader>
      </ClassHeader>
      <View style={styles.tagsContainer}>
        <Chip title="  All  " outlined />
        <Chip title="Brand New" />
        <Chip title="Trending" />
        <Chip title="Popular" />
      </View>
      <ScrollView style={styles.container}>
        {data.classes &&
          data.classes.edges.map((x: any) => {
            return (
              <>
                <ClassCard
                  key={x.id}
                  id={x.node.id}
                  title={x.node.title}
                  image={x.node.cover?.url}
                />
              </>
            );
          })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary800,
    // alignItems: 'center'
  },
  tagsContainer: {
    width: "100%",
    flex: 0,
    backgroundColor: colors.primary800,
    display: "flex",
    flexDirection: "row",
  },
  text: {
    color: "#fff",
  },
});
