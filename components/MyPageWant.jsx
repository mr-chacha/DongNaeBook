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

export default function MyPageWant() {
  return (
    <>
      <MyPageWantTitleView>
        <MyPageWantTitleText>읽고 싶은 책</MyPageWantTitleText>
      </MyPageWantTitleView>

      <MyPageWantContentsView>
        {/*나중에 렌더링 할 것을 props로 보내줘야함 */}
        {/* 파이어스토어 컬렉션과 api를 가져와서 컬렉션에있는 id는 유저id와 대조후 맞는 것만 출력
        그거중에 책 아이디를 가져와서 api 책 id와 filter후 map */}
        <MyPageWantContentsBookView>
          <BookBox book={book} />
        </MyPageWantContentsBookView>
        {/* 여기까지 감싸고 */}
      </MyPageWantContentsView>
    </>
  );
}
const MyPageWantTitleView = styled.View`
  background-color: #cdff40;
  width: 90%;
  height: 40px;
  margin: 0 auto 25px auto;
  border-radius: 7px;
`;
const MyPageWantTitleText = styled.Text`
  font-size: 16px;
  line-height: 40px;
  text-align: center;
`;
const MyPageWantContentsView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
`;
const MyPageWantContentsBookView = styled.View`
  margin-bottom: 20px;
`;
