import React, { useEffect, useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./constants";
import HypeHeader from "./components/HypeHeader";
import ProgressAvatar from "./components/ProgressAvatar";
import images from "./assets";
import colors from "./constants/colors";
import { NavigationContainer } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./navigation/BottomNavigator";
import { AuthenticationSwitch } from "./navigation/AuthenticationSwitch";
import { StatusBar } from "react-native";
// import { createClient, defaultExchanges, Provider } from "urql";
import { devtoolsExchange } from "@urql/devtools";
import { useTokenStore } from "./store/useTokenStore";

StatusBar.setBarStyle("light-content");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export default function App() {
  const [validate, setValidate] = React.useState(false);

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar barStyle="light-content" />
          <AuthenticationSwitch />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
