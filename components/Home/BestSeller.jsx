import styled from "@emotion/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, View } from "react-native";
import { useQuery } from "react-query";
import { getApiRecentBooks, getBestSeller } from "../../util/api";
import BookBox from "./BookBox";

export default function BestSeller() {
  // 베스트셀러
  const { data: bestSeller, isLoading: isLoadingSD } = useQuery(
    "bestSeller",
    getBestSeller
  );

  // if (isLoading) {
  //   return (
  //     <Loader>
  //       <ActivityIndicator />
  //     </Loader>
  //   );
  // }

  return (
    <BestSellerBookView>
      <ListTitle>NOW 베스트 셀러 🏝️</ListTitle>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 15,
          paddingHorizontal: 20,
          height: 250,
        }}
        data={bestSeller?.item}
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
`;
