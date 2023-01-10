import styled from "@emotion/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";

import BookBox from "./BookBox";
import Swiper from "react-native-swiper";
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
    <SafeAreaView>
      <BestSellerView>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={{ paddingVertical: 20 }}
        >
          {bestSeller.map((book) => (
            <BestSellerBookView key={book.itemId}>
              <BookBox book={book} />
            </BestSellerBookView>
          ))}
        </ScrollView>
      </BestSellerView>
    </SafeAreaView>
  );
}

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BestSellerTitleText = styled.Text`
  font-size: 20px;
  font-weight: 700;
  margin-left: 20px;
`;
const BestSellerView = styled.View``;
const BestSellerBookView = styled.View`
  margin-left: 10px;
  margin-right: 10px;
`;
