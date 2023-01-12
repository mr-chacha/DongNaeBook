import styled from "@emotion/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, View } from "react-native";

import BookBox from "./BookBox";

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
    <BestSellerBookView>
      <ListTitle>NOW 베스트 셀러 🏝️</ListTitle>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 15,
          paddingHorizontal: 15,
          height: 250,
        }}
        data={bestSeller}
        renderItem={({ item }) => <BookBox book={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={<View style={{ width: 20 }} />}
      />
    </BestSellerBookView>
  );
}

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BestSellerBookView = styled.View``;
const ListTitle = styled.Text`
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 20px;
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.text};
`;
