import * as React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import JsonText from "../../components/JsonText";
import { colors } from "../../constants/appStyle";
import { useForceUpdate } from "../../core/useForceUpdate";
import { useCurrentUserStore } from "../../store/useCurrentUserStore";
import { PostList } from "../feed/Feed";

function FirstRoute() {
  let { me } = useCurrentUserStore();

  return (
    <View style={[styles.scene, { backgroundColor: "#ff4081" }]}>
      {/* <JsonText obj={me} /> */}
      <PostList user={me.username} />
    </View>
  );
}

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#673ab7" }]}>
    <Text>Page two</Text>
  </View>
);

const initialLayout = { width: Dimensions.get("window").width };

export default function SocialTabView() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "teams", title: "Activity" },
    // { key: "following", title: "Following" },
  ]);

  const renderScene = SceneMap({
    teams: FirstRoute,
    // upcoming: SecondRoute,
    // following: FirstRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      activeColor={colors.coral}
      inactiveColor={colors.text}
      style={{
        backgroundColor: colors.primary700,
      }}
      indicatorStyle={{ backgroundColor: colors.coral }}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
