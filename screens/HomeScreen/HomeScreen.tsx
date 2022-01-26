import request, { gql } from "graphql-request";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "react-query";
// import { useQuery } from "urql";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { FeaturedStudioCard } from "../../components/FeaturedStudioCard";
import GradientText from "../../components/GradientText";
import { GreetingText } from "../../components/GreetingText";
import Header from "../../components/Header";
import { HomeAchievementCard } from "../../components/HomeAcheivementCard";

import { Section } from "../../components/Section";
import { TeamCard } from "../../components/TeamCard";
import { TitledHeader } from "../../components/TitledHeader";
import { UpcomingCard } from "../../components/UpcomingCard";
import { SCREEN_WIDTH } from "../../constants";
import { colors, fontSize } from "../../constants/appStyle";
import { useCurrentUserStore } from "../../store/useCurrentUserStore";
import { useTokenStore } from "../../store/useTokenStore";
import { useNavigation } from "@react-navigation/native";
import { endpoint } from "../../constants/httpHelper";
// import Button from "../components/Button";

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

function useHomeScreen(args) {
  return useQuery("homeScreen", async () => {
    return request(
      endpoint,
      gql`
        query HomeScreen($user: String!) {
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
          events(user: $user, first: 5) {
            edges {
              event: node {
                id
                class {
                  id
                  title
                  cover {
                    url
                  }
                }
                scheduledFor
                team {
                  name
                  id
                }
                name
                type
              }
            }
          }
          teams(user: $user, first: 5) {
            edges {
              team: node {
                id
                slug
                name
                picture {
                  url
                }
              }
            }
          }
        }
      `,
      { user: args.user },
      {
        Authorization: "Bearer " + args.token,
      }
    );
  });
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  let { token } = useTokenStore();
  let { me } = useCurrentUserStore();
  const { status, data, error, isFetching } = useHomeScreen({
    user: me.username,
    token: token,
  });

  if (status === "loading") {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (status === "error") {
    return (
      <View style={styles.container}>
        <Text>Unable to load your dashboard {error.message}</Text>
      </View>
    );
  }
  return (
    <>
      <Header />
      <ScrollView style={{ backgroundColor: colors.primary900 }}>
        <GreetingText>Hi, {me.firstName}!</GreetingText>

        <Section
          style={{ marginBottom: 40 }}
          title={
            data.events?.edges[0]
              ? "You got a couple upcoming events"
              : "No events scheduled"
          }
          children={
            <ScrollView
              horizontal={true}
              decelerationRate={0}
              snapToInterval={SCREEN_WIDTH} //your element width
              snapToAlignment={"center"}
              pagingEnabled
            >
              {data.events?.edges[0] &&
                data.events.edges.map((x, idx) => {
                  let event = x.event;

                  return (
                    <UpcomingCard
                      key={event.id}
                      id={event.id}
                      title={
                        event.class
                          ? event.type + ": " + event.class.title
                          : "IRL: " + event.name
                      }
                      scheduledFor={event.scheduledFor}
                      eventType={event.type}
                      image={
                        event.type !== "Meetup"
                          ? event.class?.cover?.url
                          : undefined
                      }
                    />
                  );
                })}
            </ScrollView>
          }
        />

        <Card>
          <Section title={"Your Teams"}>
            <View style={styles.teamsContainer}>
              {data.teams?.edges > 0 ? (
                data.teams.edges.map((x) => {
                  let event = x.team;
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
                })
              ) : (
                <View style={{ flex: 1 }}>
                  {/* <Text style={{ paddingLeft: 10, color: "white" }}>
                    You haven't joined any teams, yet.
                  </Text> */}
                  <Button
                    title="Create or Join a Team"
                    onPress={() => {
                      navigation.navigate("Teams");
                    }}
                  />
                </View>
              )}
            </View>
          </Section>
        </Card>

        {/* <Section
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
              <Button title="View Feed" />
            </>
          }
        /> */}

        {/* <Section
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
        /> */}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
