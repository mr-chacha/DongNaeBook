import { Text, View, SafeArray } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BestSeller from "./component/Home/BestSeller";
export default function App() {
  return (
    <SafeAreaView>
      <BestSeller />
    </SafeAreaView>
  );
}
