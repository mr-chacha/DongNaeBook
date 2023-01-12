import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { View, TouchableOpacity, Text } from 'react-native';
import styled from '@emotion/native';

export default function CategoryList({ books }) {
  // detail로 이동하는 함수 추가
  const { navigate } = useNavigation();
  const HandleMoveToDetail = () => {
    navigate('Detail', {
      params: { bookId: books.itemId },
    });
  };
  return (
    <BookBoxTouchableOpacity onPress={HandleMoveToDetail} key={books.id}>
      {/* 책 이미지 */}
      <BookBoxImage>
        <BookBoxNotImageText>이미지가 없습니다.</BookBoxNotImageText>
        <BookImage
          source={{
            uri: `${books.coverSmallUrl}`,
          }}
        />
      </BookBoxImage>
      {/* 책 제목 */}
      <BookBoxTitleText numberOfLines={1} ellipsizeMode='tail'>
        {books.title}
      </BookBoxTitleText>
      {/* 책 출판 */}
      <BookBoxTextView>
        <BookBoxNameText>출판</BookBoxNameText>
        <BookBoxText numberOfLines={1} ellipsizeMode='tail'>
          {books.publisher}
        </BookBoxText>
      </BookBoxTextView>
      {/* 책 저자 */}
      <BookBoxTextView>
        <BookBoxNameText>저자</BookBoxNameText>
        <BookBoxText numberOfLines={1} ellipsizeMode='tail'>
          {books.author}
        </BookBoxText>
      </BookBoxTextView>
    </BookBoxTouchableOpacity>
  );
}

const BookBoxTouchableOpacity = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.boxback};
  width: 120px;
  height: 215px;
  border-radius: 7px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.25);
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
  color: ${(props) => props.theme.text};
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
  color: ${(props) => props.theme.text};
`;
const BookBoxText = styled.Text`
  font-size: 10px;
  width: 70px;
  color: ${(props) => props.theme.text};
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
