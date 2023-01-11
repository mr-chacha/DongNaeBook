import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RootSiblingParent } from 'react-native-root-siblings';
import { StatusBar } from 'expo-status-bar';
import Root from './navigation/Root';

const queryClient = new QueryClient();

export default function App() {
  return (
    <RootSiblingParent>
      <StatusBar style='dark' />
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </QueryClientProvider>
    </RootSiblingParent>
  );
}
