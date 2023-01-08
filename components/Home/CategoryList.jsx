import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import styled, { css } from "@emotion/native";
// import styled from "@emotion/native";

const categoryBooks = ["119", "101", "117", "118", "123", "105", "120"];

export default function CategoryList({ books }) {
  // 도서 state
  const [catBooks, setCatBooks] = useState([]);
  // 로딩 state

  // 도서 request url
  const BASE_URL = "http://book.interpark.com/api/bestSeller.api";
  // api key
  const API_KEY =
    "B23E30B9DF1AAD646A146C3020DC90CE504C270B6A6B8A3B372CF3B02DEE6077";
  //신간도서 api 가져오기
  const getApiCatBooks = async () => {
    const { item } = await fetch(
      `${BASE_URL}?key=${API_KEY}&categoryId=100&output=json`
    ).then((res) => res.json());
    setCatBooks(item);
  };
  useEffect(() => {
    getApiCatBooks();
  }, []);

  return (
    <BookBoxTouchableOpacity key={books.id}>
      {/* 책 이미지 */}
      <BookBoxImage>
        <BookBoxNotImageText>이미지가 없습니다.</BookBoxNotImageText>
        {/* <BookImage
          source={{
            uri: `${book.coverSmallUrl}`,
          }}
        /> */}
      </BookBoxImage>
      {/* 책 제목 */}
      <BookBoxTitleText numberOfLines={1} ellipsizeMode="tail">
        {books.title}
      </BookBoxTitleText>
      {/* 책 출판 */}
      <BookBoxTextView>
        <BookBoxNameText>출판</BookBoxNameText>
        <BookBoxText numberOfLines={1} ellipsizeMode="tail">
          {books.title}
        </BookBoxText>
      </BookBoxTextView>
      {/* 책 저자 */}
      <BookBoxTextView>
        <BookBoxNameText>저자</BookBoxNameText>
        <BookBoxText numberOfLines={1} ellipsizeMode="tail">
          {books.title}
        </BookBoxText>
      </BookBoxTextView>
    </BookBoxTouchableOpacity>
  );
}

const BookBoxTouchableOpacity = styled.TouchableOpacity`
  background: #fff;
  width: 115px;
  height: 215px;
  border-radius: 7px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.25);
  margin-left: 20px;
`;
const BookBoxImage = styled.ImageBackground`
  margin: 10px auto 0 auto;
  width: 100px;
  height: 136px;
  background-color: #ededed;
`;
const BookBoxTitleText = styled.Text`
  font-size: 14px;
  margin: 10px 0 5px 10px;
  width: 90px;
`;

const BookBoxTextView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 3px 10px;
`;
const BookBoxNameText = styled.Text`
  margin-right: 5px;
  font-size: 10px;
  font-weight: 700;
`;
const BookBoxText = styled.Text`
  font-size: 10px;
  width: 70px;
`;
const BookImage = styled.Image`
  width: 100px;
  height: 136px;
`;
const BookBoxNotImageText = styled.Text`
  position: absolute;
  width: 100px;
  height: 136px;
  text-align: center;
  line-height: 136px;
  font-size: 12px;
  letter-spacing: -1px;
  color: #727272;
`;

const MonthBookLoader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const styles = StyleSheet.create({
  middleButtonAll: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#CDFF40",
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 7,
  },
  middleButtonText: {
    color: "black",
    fontWeight: "700",
    //텍스트의 현재 위치에서의 정렬
  },
});
