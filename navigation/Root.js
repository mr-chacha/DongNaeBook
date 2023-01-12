import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Tabs from './Tabs';
import Login from '../screen/Login';
import SignUp from '../screen/SignUp';
import Detail from '../screen/Detail';

const Stack = createNativeStackNavigator();

export default function Root() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: '',
        headerTransparent: true,
        // headerShown: false,
      }}
      name='registerScreen'
    >
      <Stack.Screen name='Tabs' component={Tabs} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='SignUp' component={SignUp} />
      <Stack.Screen name='Detail' component={Detail} />
    </Stack.Navigator>
  );
}
