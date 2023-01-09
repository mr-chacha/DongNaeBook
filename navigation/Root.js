import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import DetailContent from "../screen/DetailContent";
import { TouchableOpacity } from "react-native";

const Stack = createNativeStackNavigator();

export default function Root() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DetailContent" component={DetailContent} />
      <Stack.Screen name="tabs" component={Tabs} />
    </Stack.Navigator>
  );
}
