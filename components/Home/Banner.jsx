import React from "react";
import styled from "@emotion/native";
import Swiper from "react-native-swiper";
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
export default function Banner() {
  return (
    <Swiper height="100%">
      {/* <BannerImage source={require("../image/a3.png")} />
      <Swiper height="100%" width="100%">
        <View style={{ height: 100, width: 300, backgroundColor: "red" }}>
          <BannerImage source={require("../image/a3.png")} />
        </View>
      </Swiper> */}
      <View style={{ flex: 1, backgroundColor: "red", height: 300 }}></View>
      <View style={{ flex: 1, backgroundColor: "blue", height: 300 }}></View>
    </Swiper>
  );
}

const BannerImage = styled.Image`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;
