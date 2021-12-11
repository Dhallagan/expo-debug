import React from "react";
import { colors, radius } from "../constants/dogeStyle";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants";
import { Chip } from "../components/Chip";

export type TeamCardProps = {
  id: string;
  title: string;
  image: string;
  team: any;
  onPress?: () => void;
};

export const TeamCard: React.FC<TeamCardProps> = ({
  id,
  title,
  image,
  team,
  onPress,
}) => {
  const src = { uri: image || undefined };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} key={id}>
      <Image source={src} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{title}</Text>
      <View
        style={{ flex: 0, flexDirection: "row", justifyContent: "flex-end" }}
      >
        {team.membership === null && (
          <Text style={styles.actionButton}>+ Request to Join</Text>
        )}

        {team.membership === "Pending" && (
          <Text color="secondary">Pending</Text>
        )}

        {team.membership === "Accepted" && (
          <Text color="secondary">Member</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: (SCREEN_HEIGHT - 100) / 5,
    width: "50%",
    borderRadius: 10,
    marginBottom: 5,
    padding: 5,
  },
  title: {
    flex: 1,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    padding: 5,
  },
  tags: {
    color: "white",
    fontSize: 18,
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 10,
    borderWidth: 5,
    borderColor: "transparent",
    alignSelf: "center",
    opacity: 0.8,
  },
  actionButton: {
    flex: 0,
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    padding: 5,
    // backgroundColor: 'black',
    margin: 2,
    borderRadius: 5,
  },
});
