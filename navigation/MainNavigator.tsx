import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StackFrame } from "react-native/Libraries/Core/Devtools/parseErrorStack";
import NotificationsScreen from "../screens/NotificationsScreen";
import MainScreen from "../screens/MainScreen";
import { ClassDetailScreen } from "../screens/ClassDetailScreen";

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
        name="ClassDetail"
        component={ClassDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
