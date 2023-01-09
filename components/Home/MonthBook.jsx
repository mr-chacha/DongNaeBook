import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import styled, { css } from "@emotion/native";
import BookBox from "./BookBox";
import { useEffect, useState } from "react";

export default function MonthBook() {
  // 신간도서 state
  const [recentBooks, setRecentBooks] = useState([]);
  // 로딩 state
  const [isLoading, setIsLoading] = useState(true);
  // 신간도서 request url
  const BASE_URL = "http://book.interpark.com/api/newBook.api";
  // api key
  const API_KEY =
    "CAD800FCCF43A0A4B5BAD86C45EFCBC99D6140870C5C960566AE4D254543570F";
  //신간도서 api 가져오기
  const getApiRecentBooks = async () => {
    const { item } = await fetch(
      `${BASE_URL}?key=${API_KEY}&categoryId=100&output=json`
    ).then((res) => res.json());
    setRecentBooks(item);
    setIsLoading(false);
  };
  useEffect(() => {
    getApiRecentBooks();
  }, []);

  //   로딩중 화면
  if (isLoading) {
    return (
      <MonthBookLoader>
        <ActivityIndicator />
      </MonthBookLoader>
    );
  }
  return (
    <MonthBookView>
      {/* title */}
      <MonthBookTitleText>신간도서</MonthBookTitleText>

      {/* contents */}
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingVertical: 20 }}
        showsHorizontalScrollIndicator={false}
      >
        {recentBooks.map((book) => (
          <MonthBookBoxView key={book.itemId}>
            {/* card */}
            <BookBox book={book} />
          </MonthBookBoxView>
        ))}
      </ScrollView>
    </MonthBookView>
  );
}

const MonthBookView = styled.View``;
const MonthBookTitleText = styled.Text`
  margin-left: 20px;
  font-size: 20px;
  font-weight: 700;
`;
const MonthBookLoader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const MonthBookBoxView = styled.View`
  margin-left: 20px;
`;
