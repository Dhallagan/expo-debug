import request, { gql } from "graphql-request";
import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "react-query";
// import { useQuery } from "urql";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { FeaturedStudioCard } from "../components/FeaturedStudioCard";
import GradientText from "../components/GradientText";
import { GreetingText } from "../components/GreetingText";
import Header from "../components/Header";
import { HomeAchievementCard } from "../components/HomeAcheivementCard";
import JsonText from "../components/JsonText";
import { Loading } from "../components/Loading";

import { Section } from "../components/Section";
import { TeamCard } from "../components/TeamCard";
import { TitledHeader } from "../components/TitledHeader";
import { UpcomingCard } from "../components/UpcomingCard";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants";
import { colors, fontSize } from "../constants/appStyle";
import { endpoint } from "../constants/httpHelper";
import { PostList } from "../modules/feed/PostList";
import SocialTabView from "../modules/social/SocialTabView";
import { useCurrentUserStore } from "../store/useCurrentUserStore";
import { useTokenStore } from "../store/useTokenStore";

function useTeam(slug) {
  console.log(slug);
  return useQuery(
    ["teamDetail", slug],
    async () => {
      return await request(
        `${endpoint}`,
        gql`
          query TeamDetailScreen($slug: String!) {
            team(slug: $slug) {
              slug
              name
              picture {
                url
              }
              membership {
                id
                status
                admin
              }
            }
          }
        `,
        { slug: slug }
      );
    },
    {
      enabled: !!slug,
    }
  );
}

interface TeamDetailProps {
  route: any;
}

export const TeamDetailScreen: React.FC<TeamDetailProps> = ({ route }) => {
  const inset = useSafeAreaInsets();
  let { token } = useTokenStore();
  let { me } = useCurrentUserStore();

  const { status, data, error, isFetching } = useTeam(route.params.team);
  console.log("============= TEAM =================");
  console.log(data);
  console.log("====================================");

  if (status === "loading") {
    return (
      <SafeAreaView style={{ backgroundColor: colors.primary900, flex: 1 }}>
        <View style={styles.container}>
          <Loading />
        </View>
      </SafeAreaView>
    );
  }
  if (status === "error") {
    return (
      <SafeAreaView style={{ backgroundColor: colors.primary900, flex: 1 }}>
        <View style={styles.container}>
          <Text style={{ color: colors.text }}>
            Unable to load team{error.message}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const teamImageSrc = { uri: data.team.picture.url || undefined };
  return (
    <View
      style={{
        backgroundColor: colors.primary900,
        flex: 1,
        position: "relative",
      }}
    >
      <View
        style={{
          backgroundColor: colors.primary900,
          flex: 1,
          position: "relative",
          // paddingTop: 25,
        }}
      >
        <TitledHeader
          title={""}
          showBackButton={true}
          absolute={true}
          xs={{ paddingTop: 47 }}
        />

        <ScrollView style={{ backgroundColor: colors.primary900 }}>
          <View style={styles.topContainer}>
            <Image
              source={teamImageSrc}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={{ flex: 1, flexDirection: "row" }}></View>
            <View
              style={{
                flexDirection: "row",

                padding: 5,
              }}
            >
              <Text style={styles.title}>{data.team.name}</Text>
              <Text style={styles.joinButton}>
                <Button
                  title="Join"
                  onPress={() => {
                    alert("Join mutation");
                  }}
                ></Button>
              </Text>
            </View>
          </View>
          <PostList team={data.team.slug} />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 5,
    backgroundColor: colors.primary900,
  },
  teamsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  text: {
    color: "#fff",
  },
  sectionButton: {
    alignItems: "center",
    borderColor: "#343536",
    backgroundColor: colors.coral,
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 5,

    alignSelf: "stretch",
  },
  joinButton: {
    flex: 0,
  },
  topContainer: {
    position: "relative",
    height: (SCREEN_HEIGHT - 100) / 3.5,
    width: "100%",
    marginBottom: 5,
    display: "flex",
  },
  title: {
    flex: 1,
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    padding: 5,
    // alignSelf: "center",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderColor: "transparent",
    alignSelf: "center",
    opacity: 0.8,
  },
});
