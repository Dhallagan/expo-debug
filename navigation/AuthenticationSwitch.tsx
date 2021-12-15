import React from "react";
import LoginScreen from "../screens/LoginScreen";
import MainNavigator from "./MainNavigator";
import { useTokenStore } from "../store/useTokenStore";

export const AuthenticationSwitch: React.FC = () => {
  const { hasToken } = useTokenStore();

  if (!hasToken) {
    return <LoginScreen />;
  }

  return <MainNavigator />;
};
