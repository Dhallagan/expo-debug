import React, { useState } from "react";
import {
  Text,
  KeyboardAvoidingView,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { TitledHeader } from "../components/TitledHeader";
import { colors, fontFamily, fontSize, radius } from "../constants/dogeStyle";
import { Video } from "expo-av";
import { Chip } from "../components/Chip";
import * as ScreenOrientation from "expo-screen-orientation";
import { useQuery } from "urql";

const detailsQuery = `
query classDetail {
  video(classId: "Q2xhc3M6ZTlma2g0") {
    name
    description
    height
    width
    type
    link
    src
  }
}
`

interface ClassDetailModalProps {
  onRequestClose: () => void;
}
export const ClassDetailScreen: React.FC<ClassDetailModalProps> = ({
  onRequestClose,
}) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const inset = useSafeAreaInsets();

  const [result] = useQuery({
    query: detailsQuery,
  });

  const { data, fetching, error } = result;

  console.log('=============v d=======================');
  console.log(data);
  console.log('====================================');
  

  if (fetching) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Oh no... {error.message}</Text>;
  }

  const onFullscreenUpdate = ({ fullscreenUpdate, status }) => {
    console.log(fullscreenUpdate, status);
    switch (fullscreenUpdate) {
      case Video.FULLSCREEN_UPDATE_PLAYER_WILL_PRESENT:
        alert(" the fullscreen player is about to present");
        break;
      case Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT:
        break;
      case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS:
        alert("the fullscreen player is about to dismiss");
        break;
      case Video.FULLSCREEN_UPDATE_PLAYER_DID_DISMISS:
        alert("the fullscreen player just finished dismissing");
    }
  };

  return (
    <>
      <TitledHeader showBackButton={true} title={"Details"} />
      <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: data.video.src,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
        <Text style={styles.titleText}>Feel Like an Olympian</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
          }}
        >
          <Icon
            name="information-circle-outline"
            size={24}
            color={"white"}
            style={{ alignSelf: "center", paddingLeft: 5 }}
          />
          <Text style={styles.classInfoText}>Class Info</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
          }}
        >
          <Text style={styles.studioInfoText}>Studio:</Text>
          <Text style={styles.studioInfoText}>NY</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
          }}
        >
          <Text style={styles.descriptionText}>
            This class will teach you that sometimes your biggest leap forward
            involves taking a step back so you can see the bigger picture. This
            beginner class will help develop basic form and leave you sweaty and
            inspired as you crush big intervals and pushes against resistance.
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
          }}
        >
          <Chip title="Brand New" />
          <Chip title="Trending" />
          <Chip title="Popular" />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary800,
  },
  video: {
    alignSelf: "center",
    width: "100%",
    aspectRatio: 16 / 9,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: fontSize.h3,
    color: colors.text,
    padding: 5,
  },
  classInfoText: {
    fontSize: fontSize.h4,
    color: "rgba(255, 255, 255, 0.7)",
    padding: 5,
    fontWeight: "bold",
  },
  studioInfoText: {
    fontSize: fontSize.h4,
    color: colors.text,
    padding: 5,
  },
  descriptionText: {
    fontSize: fontSize.paragraph,
    color: colors.text,
    padding: 5,
  },
});
