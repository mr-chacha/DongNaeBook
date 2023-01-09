import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import TmpSearch from "../screen/TmpSearch";
import TmpHome from "../screen/TmpHome";
import TmpMyPage from "../screen/TmpMyPage";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#BDFF00",
      }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="search" size={size} color={color} />
          ),
        }}
        name="Search"
        component={TmpSearch}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
        name="Home"
        component={TmpHome}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person-outline" size={size} color={color} />
          ),
        }}
        name="MyPage"
        component={TmpMyPage}
      />
    </Tab.Navigator>
  );
}
