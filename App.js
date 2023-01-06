import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import MonthBook from "./components/MonthBook";
export default function App() {
  return (
    <SafeAreaView>
      {/* 한달이내출간된도서 */}
      <MonthBook />
    </SafeAreaView>
  );
}
