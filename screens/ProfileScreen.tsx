import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../components/Button";
import ProfileHeader from "../modules/profile/ProfileHeader";
import ProgressAvatar from "../components/ProgressAvatar";
import { TitledHeader } from "../components/TitledHeader";
import TitledGradientHeader from "../components/TitleGradientHeader";
import { colors, fontSize } from "../constants/dogeStyle";
import { PostList } from "../modules/feed/Feed";
import { useTokenStore } from "../store/useTokenStore";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import { Section } from "../components/Section";
import { HomeAchievementCard } from "../components/HomeAcheivementCard";

export default function ProfileScreen() {
  const inset = useSafeAreaInsets();
  let { logout } = useTokenStore();

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <ImageBackground
            source={{
              uri: "https://www.byrdie.com/thmb/CUqBZx5iAwgfAhFJe2KJbESgMTg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/soulcycle-1119591f4791461a84390597318dd99e.jpg",
            }}
            style={styles.image}
          >
            <LinearGradient
              colors={["rgba(206,0,148,0.9)", "rgba(0,99,206,0.9)"]}
              style={styles.image}
            />
            <View style={{ width: "100%" }}></View>
          </ImageBackground>

          {/* <ProgressAvatar /> */}
          {/* <Button title={"Logout"} onPress={logout} /> */}
          {/* <PostList /> */}
          <View style={styles.profileLead}>
            <ProgressAvatar
              style={{ marginTop: 100, marginBottom: 30 }}
              size={65}
            />
            <Text
              style={{
                color: colors.text,
                fontSize: fontSize.h2,
                fontWeight: "bold",
              }}
            >
              XP
            </Text>
            <Text
              style={{
                fontSize: 125,
                color: colors.text,
                fontWeight: "bold",
              }}
            >
              21
            </Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View style={styles.metricContainer}>
                <Text style={styles.metricTitle}>Rides</Text>
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 56,
                    alignSelf: "center",
                  }}
                >
                  7
                </Text>
              </View>
              {/*  */}
              <View style={styles.metricContainer}>
                <Text style={styles.metricTitle}>Hype</Text>
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 56,
                    alignSelf: "center",
                  }}
                >
                  7
                </Text>
              </View>
              {/*  */}
              <View style={styles.metricContainer}>
                <Text style={styles.metricTitle}>Streak</Text>
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 56,
                    alignSelf: "center",
                  }}
                >
                  7
                </Text>
              </View>
              {/*  */}
            </View>
          </View>

          {/*  */}

          <Section
            style={{ marginTop: 30 }}
            title={"Achievements"}
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
              </>
            }
          />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.primary900,
  },
  profileLead: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    height: (SCREEN_HEIGHT * 3) / 5,
    width: SCREEN_WIDTH,
  },
  image: {
    position: "absolute",
    borderRadius: 10,
    borderWidth: 5,
    borderColor: "transparent",
    height: (SCREEN_HEIGHT * 3) / 5,
    width: SCREEN_WIDTH,
    opacity: 0.7,
  },
  metricContainer: {
    display: "flex",
    flexDirection: "column",
    margin: 10,
  },
  metricTitle: {
    fontWeight: "bold",
    fontSize: 24,
    color: colors.text,
  },
});
