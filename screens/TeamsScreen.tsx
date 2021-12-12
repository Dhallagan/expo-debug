import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "urql";
import { TeamCard } from "../components/TeamCard";
import TitledGradientHeader from "../components/TitleGradientHeader";
import { colors } from "../constants/dogeStyle";

const TeamsQuery = `
query {
  teams {
    edges {
      team: node {
        id
        slug
        name
        description
        membership
      }
    }
  }
}
`;

export default function TeamsScreen() {
  const inset = useSafeAreaInsets();

  const data1 = {
    teams: {
      edges: [
        {
          team: {
            id: "VGVhbTowMjZkNGo=",
            name: "Team Mantas",
            description: null,
            membership: null,
            picture: {
              url: "https://upgradedpoints.com/wp-content/uploads/2018/08/New-York-City-752x348@2x.jpg",
            },
          },
        },
        {
          team: {
            id: "VGVhbTpra3Ztc2o=",
            name: "Steph Currie with the Shot",
            description: null,
            membership: null,
            picture: {
              url: "https://www.byrdie.com/thmb/CUqBZx5iAwgfAhFJe2KJbESgMTg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/soulcycle-1119591f4791461a84390597318dd99e.jpg",
            },
          },
        },
        {
          team: {
            id: "VGVhbTp0ajV6bWc=",
            name: "DJ Sets Only",
            description: null,
            membership: null,
            picture: {
              url: "https://i.guim.co.uk/img/media/21e065a41239ae50d2fdf639ee02e924ec1dc8b5/0_0_2400_1440/master/2400.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=2fc88266793a38e120c59b34e0323934",
            },
          },
        },
        {
          team: {
            id: "VGVhbTp1ZWozbWI=",
            name: "San Diego Locals Surf Club",
            description: null,
            membership: null,
            picture: {
              url: "https://imgcdn.pelobuddy.com/wp-content/uploads/2020/03/SoulCycle_Rider.jpg",
            },
          },
        },
      ],
    },
  };

  const [result] = useQuery({
    query: TeamsQuery,
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
      <TitledGradientHeader>Teams</TitledGradientHeader>
      {/* <HypeTitle /> */}
      {/* <Teams /> */}

      <ScrollView contentContainerStyle={styles.container}>
        {/* <JsonText obj={data} /> */}
        {data &&
          data.teams.edges.map((x: any, idx: number) => {
            return (
              <>
                <TeamCard
                  key={x.id}
                  id={x.id}
                  title={x.team.name}
                  team={x.team}
                  image={
                    data1.teams.edges[idx] !== undefined
                      ? data1.teams.edges[idx].team.picture.url
                      : "https://upgradedpoints.com/wp-content/uploads/2018/08/New-York-City-752x348@2x.jpg"
                  }
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
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
