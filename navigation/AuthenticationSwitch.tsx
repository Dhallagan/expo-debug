import React from "react";
import LoginScreen from "../screens/LoginScreen";
import MainNavigator from "./MainNavigator";
import { useStore } from "../store/useTokenStore";

export const AuthenticationSwitch: React.FC = () => {
  const { hasToken } = useStore();

  if (!hasToken) {
    return <LoginScreen />;
  }

  return <MainNavigator />;
};
