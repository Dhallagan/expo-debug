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

const categories = [
  {
    id: 1,
    title: 'All',
  },
  {
    id: 2,
    title: 'Brand New',
  },
  {
    id: 3,
    title: 'Trending',
  },
  {
    id: 4,
    title: 'Favourite',
  },
];

export default function ClassesScreen(props) {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const [classes, setClasses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);

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

  const handleCategoryPress = id => {
    console.log(id);
    setSelectedCategory(id);
  }

  return (
    <>
      <ClassHeader title={"Classes"} style={{ color: "white" }}>
        <TitledGradientHeader>Classes</TitledGradientHeader>
      </ClassHeader>
      <View style={styles.tagsContainer}>
        {categories.map(item => (
          <View key={item.id}>
            <Chip id={item.id} title={item.title} outlined={false} handleCategoryPress={handleCategoryPress} selectedCategory={selectedCategory} />
          </View>
        ))}
      </View>
      <ScrollView style={styles.container}>
        {data.classes.edges.map((x: any) => {
          return (
            <View key={x.id}>
              <ClassCard
                key={x.id}
                id={x.node.id}
                title={x.node.title}
                image={x.node.cover?.url}
                onSelect={() => props.navigation.navigate('ClassDetail')}
              />
            </View>
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
