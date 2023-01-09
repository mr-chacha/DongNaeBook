import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BestSeller from "../components/Home/BestSeller";
import MonthBook from "../components/Home/MonthBook";
export default function TmpHome() {
  return (
    <SafeAreaView>
      <View>
        <MonthBook />
        <BestSeller />
      </View>
    </SafeAreaView>
  );
}
