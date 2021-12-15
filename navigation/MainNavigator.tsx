import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StackFrame } from "react-native/Libraries/Core/Devtools/parseErrorStack";
import NotificationsScreen from "../screens/SettingsScreen";
import MainScreen from "../screens/MainScreen";
import { ClassDetailScreen } from "../screens/ClassDetailScreen";
import SettingsScreen from "../screens/SettingsScreen";

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
    </Stack.Navigator>
  );
}
