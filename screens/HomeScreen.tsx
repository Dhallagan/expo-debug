import request, { gql } from "graphql-request";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "react-query";
// import { useQuery } from "urql";
import { Button } from "../components/Button";
import { FeaturedStudioCard } from "../components/FeaturedStudioCard";
import GradientText from "../components/GradientText";
import Header from "../components/Header";
import { HomeAchievementCard } from "../components/HomeAcheivementCard";
import { HomeChallengeCard } from "../components/HomeChallengeCard";
import HypeHeader from "../components/HypeHeader";
import JsonText from "../components/JsonText";
import { Section } from "../components/Section";
import { TitledHeader } from "../components/TitledHeader";
import { UpcomingCard } from "../components/UpcomingCard";
import { SCREEN_WIDTH } from "../constants";
import { colors, fontSize } from "../constants/dogeStyle";
import { useTokenStore } from "../store/useTokenStore";

const AuthQuery = `
  query AuthQuery {
    me {
      id
      username
      email
      emailVerified
      firstName
      lastName
      admin
      picture {
        url
      }
      rank
      rankProgress
    }
  }
`;

function useAuth() {
  return useQuery("auth", async () => {
    return request(
      "https://test.thatclass.co/api/",
      gql`
        query AuthQuery {
          me {
            id
            username
            email
            emailVerified
            firstName
            lastName
            admin
            picture {
              url
            }
            rank
            rankProgress
          }
        }
      `
    );
  });
}

export default function HomeScreen() {
  const inset = useSafeAreaInsets();
  const { status, data, error, isFetching } = useAuth();

  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        <Section
          title={"Upcoming Sessions"}
          children={
            <ScrollView
              horizontal={true}
              decelerationRate={0}
              snapToInterval={SCREEN_WIDTH} //your element width
              snapToAlignment={"center"}
              pagingEnabled
            >
              <UpcomingCard
                title="Scheduled Class"
                scheduledFor={"12/6/2021 3pm"}
                eventType={"In Person"}
              />
              <UpcomingCard
                title="Scheduled Class 2"
                scheduledFor={"12/6/2021 3pm"}
                eventType={"In Person"}
              />
              <UpcomingCard
                title="Scheduled Class 3"
                scheduledFor={"12/6/2021 3pm"}
                eventType={"In Person"}
              />
            </ScrollView>
          }
        />
        <Section
          title={"Recent Friend Achievements"}
          children={
            <>
              <HomeAchievementCard
                title={"Dylan Hallagan just completed 20 classes"}
                subtitle={"10 hours ago"}
              />
              <HomeAchievementCard
                title={"Mantas just leveled up to Hypeman"}
                subtitle={"12 hours ago"}
              />
              <HomeAchievementCard
                title={"Steph just completed 100 classes"}
                subtitle={"16 hours ago"}
              />
              <TouchableOpacity style={styles.sectionButton}>
                <Text style={styles.text}>View Friends Feed</Text>
              </TouchableOpacity>
            </>
          }
        />

        <Section
          title={"Featured Studio"}
          children={
            <>
              <FeaturedStudioCard />
              <TouchableOpacity style={styles.sectionButton}>
                <Text style={styles.text}>View Studio</Text>
              </TouchableOpacity>
              <Button />
            </>
          }
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 5,
    backgroundColor: colors.primary900,
  },
  text: {
    color: "#fff",
  },
  sectionButton: {
    alignItems: "center",
    borderColor: "#343536",
    backgroundColor: "#343536",
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 5,

    alignSelf: "stretch",
  },
});
