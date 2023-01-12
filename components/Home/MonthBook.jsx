import React from "react";
import { ActivityIndicator, View } from "react-native";
import styled, { css } from "@emotion/native";
import BookBox from "./BookBox";
import { useQuery } from "react-query";
import { getApiRecentBooks, getBestSeller } from "../../util/api";
import { FlatList } from "react-native";

export default function MonthBook() {
  // 신간도서
  const { data: recentBooks, isLoading: isLoadingRB } = useQuery(
    "RecentBooks",
    getApiRecentBooks
  );

  // //   로딩중 화면
  // if (isLoading) {
  //   return (
  //     <MonthBookLoader>
  //       <ActivityIndicator />
  //     </MonthBookLoader>
  //   );
  // }
  return (
    <MonthBookView>
      <ListTitle>새로 출간된 도서 ✨</ListTitle>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 15,
          paddingHorizontal: 15,
          height: 250,
        }}
        data={recentBooks?.item}
        renderItem={({ item }) => <BookBox book={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={<View style={{ width: 20 }} />}
      />
    </MonthBookView>
  );
}

const MonthBookView = styled.View``;

const MonthBookLoader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 20px;
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.text};
`;
