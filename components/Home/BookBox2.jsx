import React from 'react';
import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';

export default function BookBox({ book }) {
  return (
    <BookBoxTouchableOpacity key={book.itemId}>
      {/* 책 이미지 */}
      <BookBoxImage>
        <BookBoxNotImageText>이미지가 없습니다.</BookBoxNotImageText>
        <BookImage
          source={{
            uri: `${book.coverSmallUrl}`,
          }}
        />
      </BookBoxImage>
      {/* 책 제목 */}
      <BookBoxTitleText numberOfLines={1} ellipsizeMode='tail'>
        {book.title}
      </BookBoxTitleText>
      {/* 책 출판 */}
      <BookBoxTextView>
        <BookBoxNameText>출판</BookBoxNameText>
        <BookBoxText numberOfLines={1} ellipsizeMode='tail'>
          {book.publisher}
        </BookBoxText>
      </BookBoxTextView>
      {/* 책 저자 */}
      <BookBoxTextView>
        <BookBoxNameText>저자</BookBoxNameText>
        <BookBoxText numberOfLines={1} ellipsizeMode='tail'>
          {book.author}
        </BookBoxText>
      </BookBoxTextView>
    </BookBoxTouchableOpacity>
  );
}
const BookBoxTouchableOpacity = styled.View`
  background-color: ${(props) => props.theme.boxback};
  width: 120px;
  height: 215px;
  border-radius: 7px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.25);
  margin-right: 15px;
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
