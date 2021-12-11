import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import MainScreen from "../screens/MainScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PostScreen from "../screens/PostScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import Icon from "react-native-vector-icons/Ionicons";
import TeamsScreen from "../screens/TeamsScreen";
import HomeScreen from "../screens/HomeScreen";
import ClassesScreen from "../screens/ClassesScreen";
import { CreatePostScreen } from "../screens/CreatePostScreen";
import { CreatePostButton } from "../components/bottomBar/CreatePostButton";
import { color } from "react-native-elements/dist/helpers";
import { colors } from "../constants/dogeStyle";
import ProgressAvatar from "../components/ProgressAvatar";

const EmptyComponent: React.FC = () => {
  return null;
};

export default function BottomNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Teams") {
            iconName = focused ? "ios-people" : "ios-people-outline";
          } else if (route.name === "Classes") {
            iconName = focused ? "ios-play" : "ios-play-outline";
          } else if (route.name === "Post") {
            iconName = focused ? "ios-add" : "ios-add-outline";
          } else if (route.name === "Profile") {
            // return <ProgressAvatar />;
            iconName = focused ? "ios-add" : "ios-add-outline";
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: colors.primary800 },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Classes"
        component={ClassesScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Post"
        component={EmptyComponent}
        options={{
          headerShown: false,
          tabBarButton: (props) => <CreatePostButton {...props} />,
        }}
      />
      <Tab.Screen name="Teams" component={TeamsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
