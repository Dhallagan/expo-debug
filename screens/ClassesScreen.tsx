import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Chip } from "../components/Chip";
import { ClassCard } from "../components/ClassCard";
import ClassHeader from "../components/ClassHeader";
import { colors, fontSize } from "../constants/dogeStyle";
import TitledGradientHeader from "../components/TitleGradientHeader";
// import { useClasses } from "../queries";
import JsonText from "../components/JsonText";
import { useQuery } from "react-query";
import request, { gql } from "graphql-request";
import { endpoint } from "../constants/httpHelper";

function useClasses() {
  return useQuery("classes", async () => {
    return await request(
      `${endpoint}`,
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

const categories = [
  {
    id: 1,
    title: "All",
  },
  {
    id: 2,
    title: "Brand New",
  },
  {
    id: 3,
    title: "Trending",
  },
  {
    id: 4,
    title: "Favorite",
  },
];

function useAppliedFilters(instructor, isFilters) {
  return useQuery(
    ["queryClasses", instructor],
    async () => {
      return await request(
        `${endpoint}`,
        gql`
          query queryClasses($instructor: String) {
            classes(instructor: $instructor) {
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
                  instructors {
                    id
                    user {
                      username
                    }
                  }
                }
              }
            }
          }
        `,
        { instructor: instructor }
      );
    },
    {
      // enabled: !!instructor || !!equipment || !!type || !!first,
      enabled: !!isFilters,
    }
  );
}

export default function ClassesScreen(props) {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const [classes, setClasses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [isFilters, setIsFilters] = useState(false);

  const [checkFilter, setCheckFilter] = useState();
  const [filterInstructors, setFilterInstructors] = useState();

  const { status, data, error, isFetching } = useClasses();
  const result = useAppliedFilters(filterInstructors, isFilters);
  console.log("filter data", result.data);

  if (status === "loading") {
    return (
      <View style={styles.containerLoad}>
        <Text style={styles.titleText}>Loading...</Text>
      </View>
    );
  }
  if (status === "error") {
    return (
      <View style={styles.containerLoad}>
        <Text style={styles.titleText}>Oh no... {error.message}</Text>
      </View>
    );
  }
  // useEffect(() => {

  //   console.log('filter data', data);
  // }, [isFilters]);

  const handleCategoryPress = (id) => {
    console.log(id);
    setSelectedCategory(id);
  };

  console.log("=============ck=======================");
  console.log(filterInstructors?.map((i) => i.label));
  console.log("====================================");

  return (
    <>
      <ClassHeader
        title={"Classes"}
        style={{ color: "white" }}
        checkFilter={checkFilter}
        setCheckFilter={setCheckFilter}
        filterInstructors={filterInstructors}
        setFilterInstructors={setFilterInstructors}
      >
        <TitledGradientHeader>Classes</TitledGradientHeader>
      </ClassHeader>
      <View style={styles.tagsContainer}>
        {categories?.map((item, index) => (
          <View key={index}>
            <Chip
              id={item.id}
              title={item.title}
              outlined={false}
              handleCategoryPress={handleCategoryPress}
              selectedCategory={selectedCategory}
            />
          </View>
        ))}
      </View>
      <ScrollView style={styles.container}>
        {data.classes &&
          data.classes.edges.map((x: any, index: any) => (
            <View key={index}>
              <ClassCard
                key={index}
                id={x.node.id}
                title={x.node.title}
                image={x.node.cover?.url}
                onSelect={() =>
                  props.navigation.navigate("ClassDetail", {
                    classId: x.node.id,
                  })
                }
              />
            </View>
          ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  containerLoad: {
    flex: 1,
    backgroundColor: colors.primary800,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: fontSize.h3,
    color: colors.text,
    padding: 5,
  },
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
