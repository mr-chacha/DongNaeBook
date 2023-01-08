import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import MyPageWant from "./components/MyPageWant";
import MyPageRead from "./components/MyPageRead";
import MyPageReview from "./components/MyPageReview";

export default function App() {
  return (
    <SafeAreaView>
      <ScrollView>
        <MyPageWant />
        {/* <MyPageRead /> */}
        {/* <MyPageReview /> */}
      </ScrollView>
    </SafeAreaView>
  );
}
