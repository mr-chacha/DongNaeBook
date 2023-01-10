import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import TmpSearch from '../screen/TmpSearch';
import TmpHome from '../screen/TmpHome';
import TmpMyPage from '../screen/TmpMyPage';
import SignUp from '../screen/SignUp';
import Login from '../screen/Login';
import SignOut from '../screen/SignOut';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#BDFF00',
      }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <MaterialIcons name='search' size={size} color={color} />,
        }}
        name='Search'
        component={TmpSearch}
      />
      <Tab.Screen
        screenOptions={{ headerShown: false }}
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size }) => <MaterialIcons name='home' size={size} color={color} />,
        }}
        name='Home'
        component={TmpHome}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size }) => <MaterialIcons name='person-outline' size={size} color={color} />,
        }}
        name='MyPage'
        component={TmpMyPage}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size }) => <MaterialIcons name='person-outline' size={size} color={color} />,
        }}
        name='SignOut'
        component={SignOut}
      />
      {/* <Tab.Screen
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size }) => <MaterialIcons name='person-outline' size={size} color={color} />,
        }}
        name='SignUp'
        component={SignUp}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size }) => <MaterialIcons name='person-outline' size={size} color={color} />,
        }}
        name='Login'
        component={Login}
      /> */}
    </Tab.Navigator>
  );
}
