import styled from "@emotion/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import BookBox from "../BookBox";
export default function BestSeller() {
  // API 담을 state
  const [bestSeller, setBestSeller] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // 기본유알엘
  const BASE_URL = "https://book.interpark.com/api";
  // 상현API
  const API_KEY =
    "AE0623D5CFBF0FCE84299D8FA8214D374F9D59ABBFA5A473492ECFC174E3887F";

  //API 가져오는 함수
  const getBestSeller = async () => {
    const { item } = await fetch(
      `${BASE_URL}/bestSeller.api?key=${API_KEY}&categoryId=100&output=json`
    ).then((res) => res.json());
    setBestSeller(item);
    setIsLoading(false);
  };
  useEffect(() => {
    getBestSeller();
  }, []);
  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator />
      </Loader>
    );
  }

  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={{ paddingVertical: 20 }}
    >
      <Text>Now 베스트셀러</Text>
      {bestSeller.map((item) => (
        <View style={{ marginLeft: 15 }}>
          <BookBox item={item} />
        </View>
      ))}
    </ScrollView>
  );
}

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
