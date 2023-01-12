import React from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
import { RootSiblingParent } from "react-native-root-siblings";
import { StatusBar } from "expo-status-bar";
import Root from "./navigation/Root";
import { useColorScheme } from "react-native";
import { DTheme, LTheme } from "./theme";
import { ThemeProvider } from "@emotion/react";

const queryClient = new QueryClient();

export default function App() {
  const isDark = useColorScheme() === "dark";

  return (
    <RootSiblingParent>
      <ThemeProvider theme={isDark ? DTheme : LTheme}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
            <StatusBar style="auto" />
            <Root />
          </NavigationContainer>
        </QueryClientProvider>
      </ThemeProvider>
    </RootSiblingParent>
  );
}
