import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import Stack from './Stack';

// Stack -> Nav로 변경

const Nav = createNativeStackNavigator();

export default function Root() {
  return (
    <Nav.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Nav.Screen
        name='tabs'
        component={Tabs}
      />
      <Nav.Screen
        name='stack'
        component={Stack}
      />
    </Nav.Navigator>
  );
}
