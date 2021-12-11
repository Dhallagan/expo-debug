import React from "react";
import LoginScreen from "../screens/LoginScreen";
import MainNavigator from "./MainNavigator";

export const AuthenticationSwitch: React.FC = () => {
  const hasToken = true;

  if (!hasToken) {
    return <LoginScreen />;
  }

  return <MainNavigator />;
};
