import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import Root from './navigation/Root';
import { StatusBar } from 'expo-status-bar';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <StatusBar style='dark' />
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </QueryClientProvider>
    </>
  );
}

export default App;
