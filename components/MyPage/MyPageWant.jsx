import React from "react";
import styled, { css } from "@emotion/native";
import BookBox from "../Home/BookBox";
import { useQuery } from "react-query";
import { getApiRecentBooks, getBestSeller } from "../../util/api";

// bookbox 때문에 일시적으로 만든 것
export default function MyPageWant({ bookMarkFilter }) {
  // 신간도서
  const { data: recentBooks, isLoading: isLoadingRB } = useQuery(
    "RecentBooks",
    getApiRecentBooks
  );
  // 베스트셀러
  const { data: bestSeller, isLoading: isLoadingSD } = useQuery(
    "bestSeller",
    getBestSeller
  );

  // 최근 구조
  const recent = recentBooks?.item.filter((item) => {
    //item의 id가 bookMarkFilter배열 안에 존재한다면 (if) 리턴해주고 아니면 아무것도 안함
    for (let i = 0; i < bookMarkFilter.length; i++) {
      if (item.itemId === bookMarkFilter[i]) {
        return item;
      }
    }
  });

  const best = bestSeller?.item.filter((item) => {
    //item의 id가 bookMarkFilter배열 안에 존재한다면 (if) 리턴해주고 아니면 아무것도 안함
    for (let i = 0; i < bookMarkFilter.length; i++) {
      if (item.itemId === bookMarkFilter[i]) {
        return item;
      }
    }
  });

  return (
    <>
      <MyPageWantTitleView>
        <MyPageWantTitleText>내가 읽은 책</MyPageWantTitleText>
      </MyPageWantTitleView>

      <MyPageWantContentsView>
        {/*나중에 렌더링 할 것을 props로 보내줘야함 */}
        {/* 파이어스토어 컬렉션과 api를 가져와서 컬렉션에있는 id는 유저id와 대조후 맞는 것만 출력
        그거중에 책 아이디를 가져와서 api 책 id와 filter후 map */}
        {recent?.map((book) => {
          return (
            <MyPageWantContentsBookView key={book.itemId}>
              <BookBox book={book} />
            </MyPageWantContentsBookView>
          );
        })}
        {best?.map((book) => {
          return (
            <MyPageWantContentsBookView key={book.itemId}>
              <BookBox book={book} />
            </MyPageWantContentsBookView>
          );
        })}
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
  font-weight: 600;
`;
const MyPageWantContentsView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  max-width: 100%;
  margin: 0 auto;
`;
const MyPageWantContentsBookView = styled.View`
  margin: 0 7px 20px 13px;
`;
