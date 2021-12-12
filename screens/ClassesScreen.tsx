import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Chip } from "../components/Chip";
import { ClassCard } from "../components/ClassCard";
import ClassHeader from "../components/ClassHeader";
import { colors } from "../constants/dogeStyle";
import { useQuery } from "urql";
import TitledGradientHeader from "../components/TitleGradientHeader";

const ClassesQuery = `
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
`;

export default function ClassesScreen() {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const [classes, setClasses] = useState([]);

  const [result] = useQuery({
    query: ClassesQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) {
    return <Text>Loading...</Text>;
  }
  if (error) {
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
        {data.classes.edges.map((x: any) => {
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
