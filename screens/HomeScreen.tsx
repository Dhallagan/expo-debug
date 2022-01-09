import request, { gql } from "graphql-request";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

import { Section } from "../components/Section";
import { TeamCard } from "../components/TeamCard";
import { TitledHeader } from "../components/TitledHeader";
import { UpcomingCard } from "../components/UpcomingCard";
import { SCREEN_WIDTH } from "../constants";
import { colors, fontSize } from "../constants/dogeStyle";
import { useCurrentUserStore } from "../store/useCurrentUserStore";
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

function useHomeScreen(token) {
  return useQuery("homeSreen", async () => {
    return request(
      "https://test.thatclass.co/api/",
      gql`
        query HomeScreen {
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
          events(user: "dhallagan", first: 5) {
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
                type
              }
            }
          }
          teams(user: "dhallagan", first: 5) {
            edges {
              team: node {
                id
                slug
                name
              }
            }
          }
        }
      `,
      null,
      {
        Authorization: "Bearer " + token,
      }
    );
  });
}

export default function HomeScreen() {
  const inset = useSafeAreaInsets();
  let { token } = useTokenStore();
  let { me } = useCurrentUserStore();
  const { status, data, error, isFetching } = useHomeScreen(token);

  if (status === "loading") {
    return <Text>Loading...</Text>;
  }
  if (status === "error") {
    return <Text>Oh no... {error.message}</Text>;
  }
  return (
    <>
      <Header />
      <ScrollView style={{ backgroundColor: colors.primary900 }}>
        <GreetingText>Hi, Dylan!</GreetingText>

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
              {
                data.events?.edges[0] &&
                  data.events.edges.map((x, idx) => {
                    let event = x.event;
                    return (
                      <UpcomingCard
                        key={event.id}
                        id={event.id}
                        title={
                          event.class
                            ? event.type + ": " + event.class.title
                            : "In Person" + ": @ The Beach"
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
                  })

                /* <UpcomingCard
                title="Scheduled Class 2"
                scheduledFor={"12/6/2021 3pm"}
                eventType={"In Person"}
              />
              <UpcomingCard
                title="Scheduled Class 3"
                scheduledFor={"12/6/2021 3pm"}
                eventType={"In Person"}
              /> */
              }
            </ScrollView>
          }
        />

        {/* <Card>
          <Section title={"Your Teams"}>
            <View style={styles.teamsContainer}>
              {data.teams?.edges[0] &&
                data.teams.edges.map((x) => {
                  let event = x.team;
                  return (
                    <TeamCard
                      key={x.id}
                      id={x.id}
                      title={x.team.name}
                      team={x.team}
                      image={
                        "https://upgradedpoints.com/wp-content/uploads/2018/08/New-York-City-752x348@2x.jpg"
                      }
                    />
                  );
                })}
            </View>
          </Section>
        </Card> */}

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
    // paddingHorizontal: 5,
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
