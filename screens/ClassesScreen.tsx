import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Chip } from "../components/Chip";
import { ClassCard } from "../components/ClassCard";
import ClassHeader from "../components/ClassHeader";
import HypeHeader from "../components/HypeHeader";
import { TitledHeader } from "../components/TitledHeader";
import { colors } from "../constants/dogeStyle";
import { request, gql } from "graphql-request";
// import { useQuery, useQueryClient, QueryClient } from "react-query";
import OutlinedText from "../components/OutlineText";
import JsonText from "../components/JsonText";
import { useQuery } from "urql";

const ClassesQuery = `
  query getArtworks {
    artworksConnection(first: 10) {
      id
      edges {
        node {
          slug
          image {
            imageURL
          }
          artist {
            id
            name
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

  // const [result] = useQuery({
  //   query: ClassesQuery,
  // });

  useEffect(() => {
    async function fetchData() {
      console.log("useEffect");
      const res = await fetch("https://api2-dev.betkarma.com/articles");
      const json = await res.json();
      console.log("articles", json);
    }
    fetchData();
  }, []); // let { data, fetching, error } = result;
  //console.log("data--", data);
  return <Text>test</Text>;

  // return (
  //   <>
  //     <ClassHeader title={"Classes"} style={{ color: "white" }}>
  //       {/* <OutlinedText>Classes</OutlinedText> */}
  //     </ClassHeader>
  //     <View style={styles.tagsContainer}>
  //       <Chip title="  All  " outlined />
  //       <Chip title="Brand New" />
  //       <Chip title="Trending" />
  //       <Chip title="Popular" />
  //     </View>
  //     <ScrollView style={styles.container}>
  //       <Text style={{ color: "white" }}>WTG</Text>
  //       {data.classes?.edges.map((x: any) => {
  //         <JsonText obj={x.node.title} />;
  //         <ClassCard
  //           id={x.node.id}
  //           title={x.node.id}
  //           image={"https://test-s.thatclass.co/c/e9fkh4.jpeg?v=4"}
  //         />;
  //       })}
  //     </ScrollView>
  //   </>
  // );
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
