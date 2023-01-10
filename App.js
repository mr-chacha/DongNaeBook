import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StatusBar } from 'expo-status-bar';
import Detail from './screen/Detail';

import { createContext, useEffect, useState, useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './navigation/Tabs';
import Login from './screen/Login';
import SignUp from './screen/SignUp';
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { authService } from './firebase';
import Root from './navigation/Root';

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();
// 사용자가 로그인했는지 또는 화면의 위치를 파악해준다.
const AuthenticatedUserContext = createContext({});

const deleteUser = async (id) => {
  const bookDoc = doc(db, 'readbook', id);
  try {
    const res = await deleteDoc(bookDoc);
    console.log(res); // res는 undefined
  } catch (error) {
    console.log(error);
  } finally {
    console.log('end');
  }
};

function TabStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Tabs' component={Tabs} />
      <Stack.Screen name='Detail' component={Detail} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator defaultScreenOptions={Login} screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='SignUp' component={SignUp} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authService, async (authenticatedUser) => {
      authenticatedUser ? setUser(authenticatedUser) : setUser(null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }
  if (user) {
    return (
      <NavigationContainer>
        <TabStack />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    );
  }
  // return <NavigationContainer> {user ? <TabStack /> : <AuthStack />}</NavigationContainer>;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
