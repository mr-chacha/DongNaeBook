import React from "react";
import styled, { css } from "@emotion/native";

// {book}은 api로 받아오고 map 으로 돌린 함수를 props로 받아온 것
export default function BookBox({ item }) {
  return (
    // 배경
    <BookBoxTouchableOpacity key={item.itemId}>
      {/* 책 이미지 */}
      <BookBoxImage
        source={{
          uri: `${item.coverSmallUrl}`,
        }}
      />
      {/* 책 제목 */}
      <BookBoxTitleText numberOfLines={1} ellipsizeMode="tail">
        {item.title}
      </BookBoxTitleText>
      {/* 책 출판 */}
      <BookBoxTextView>
        <BookBoxNameText>출판</BookBoxNameText>
        <BookBoxText numberOfLines={1} ellipsizeMode="tail">
          {item.publisher}
        </BookBoxText>
      </BookBoxTextView>
      {/* 책 저자 */}
      <BookBoxTextView>
        <BookBoxNameText>저자</BookBoxNameText>
        <BookBoxText numberOfLines={1} ellipsizeMode="tail">
          {item.author}
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
  margin: 20px;
  box-shadow: 3px 3px 10px rgba(4, 61, 234, 0.25);
`;
const BookBoxImage = styled.Image`
  margin: 10px auto 0 auto;
  width: 100px;
  height: 136px;
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
