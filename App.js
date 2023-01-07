import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from "react-native";
import DetailContent from "./components/DetailContent";

export default function App() {
  return (
    <SafeAreaView>
      {/* 상세페이지 컨텐츠 */}
      <DetailContent />
    </SafeAreaView>
  );
}
