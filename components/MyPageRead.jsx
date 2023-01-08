1;
import React from "react";
import { Text, View } from "react-native";
import styled, { css } from "@emotion/native";
import BookBox from "./Home/BookBox";

// bookbox 때문에 일시적으로 만든 것
const book = {
  title: "불편한 편의점",
  publisher: "나무옆의자",
  author: "김호연",
};

export default function MyPageRead() {
  return (
    <>
      <MyPageReadTitleView>
        <MyPageReadTitleText>내가 읽은 책</MyPageReadTitleText>
      </MyPageReadTitleView>

      <MyPageReadContentsView>
        {/*나중에 렌더링 할 것을 props로 보내줘야함 */}
        <MyPageReadContentsBookView>
          <BookBox book={book} />
        </MyPageReadContentsBookView>
        {/* 여기까지 감싸고 */}

        {/* 더미데이터 */}
        <MyPageReadContentsBookView>
          <BookBox book={book} />
        </MyPageReadContentsBookView>

        <MyPageReadContentsBookView>
          <BookBox book={book} />
        </MyPageReadContentsBookView>

        <MyPageReadContentsBookView>
          <BookBox book={book} />
        </MyPageReadContentsBookView>

        <MyPageReadContentsBookView>
          <BookBox book={book} />
        </MyPageReadContentsBookView>

        <MyPageReadContentsBookView>
          <BookBox book={book} />
        </MyPageReadContentsBookView>

        <MyPageReadContentsBookView>
          <BookBox book={book} />
        </MyPageReadContentsBookView>

        <MyPageReadContentsBookView>
          <BookBox book={book} />
        </MyPageReadContentsBookView>

        <MyPageReadContentsBookView>
          <BookBox book={book} />
        </MyPageReadContentsBookView>
      </MyPageReadContentsView>
    </>
  );
}
const MyPageReadTitleView = styled.View`
  background-color: #cdff40;
  width: 90%;
  height: 40px;
  margin: 0 auto 25px auto;
  border-radius: 7px;
`;
const MyPageReadTitleText = styled.Text`
  font-size: 16px;
  line-height: 40px;
  text-align: center;
`;
const MyPageReadContentsView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
`;
const MyPageReadContentsBookView = styled.View`
  margin-bottom: 20px;
`;
