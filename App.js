import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
//
import Detail from './screen/Detail';

export default function App() {
  return (
    <SafeAreaView>
      <Detail />
    </SafeAreaView>
  );
}
