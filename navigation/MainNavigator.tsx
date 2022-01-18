import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StackFrame } from "react-native/Libraries/Core/Devtools/parseErrorStack";
import NotificationsScreen from "../screens/SettingsScreen";
import MainScreen from "../screens/MainScreen";
import { ClassDetailScreen } from "../screens/ClassDetailScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { PostDetailScreen } from "../screens/PostDetailScreen";
import { TeamDetailScreen } from "../screens/TeamDetailScreen";
import InviteScreen from "../screens/InviteScreen";

export default function MainNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ClassDetail"
        component={ClassDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TeamDetail"
        component={TeamDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Invite"
        component={InviteScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
