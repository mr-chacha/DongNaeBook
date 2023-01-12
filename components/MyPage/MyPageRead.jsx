import React from 'react';
import styled, { css } from '@emotion/native';
import BookBox from '../Home/BookBox';
import { useQuery } from 'react-query';
import { getApiRecentBooks, getBestSeller } from '../../util/api';

export default function MyPageRead({ readBookFilter }) {
  // 신간도서
  const { data: recentBooks, isLoading: isLoadingRB } = useQuery('RecentBooks', getApiRecentBooks);
  // 베스트셀러
  const { data: bestSeller, isLoading: isLoadingSD } = useQuery('bestSeller', getBestSeller);

  // 최근 구조
  const recent = recentBooks?.item.filter((item) => {
    //item의 id가 bookMarkFilter배열 안에 존재한다면 (if) 리턴해주고 아니면 아무것도 안함
    for (let i = 0; i < readBookFilter.length; i++) {
      if (item.itemId === readBookFilter[i]) {
        return item;
      }
    }
  });

  const best = bestSeller?.item.filter((item) => {
    //item의 id가 bookMarkFilter배열 안에 존재한다면 (if) 리턴해주고 아니면 아무것도 안함
    for (let i = 0; i < readBookFilter.length; i++) {
      if (item.itemId === readBookFilter[i]) {
        return item;
      }
    }
  });

  return (
    <>
      <MyPageReadTitleView>
        <MyPageReadTitleText>읽고 싶은 책</MyPageReadTitleText>
      </MyPageReadTitleView>

      <MyPageReadContentsView>
        {recent?.map((book) => {
          return (
            <MyPageReadContentsBookView key={book.itemId}>
              <BookBox book={book} />
            </MyPageReadContentsBookView>
          );
        })}
        {best?.map((book) => {
          return (
            <MyPageReadContentsBookView key={book.itemId}>
              <BookBox book={book} />
            </MyPageReadContentsBookView>
          );
        })}
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
  font-weight: 600;
`;
const MyPageReadContentsView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  max-width: 100%;
  margin: 0 auto;
`;
const MyPageReadContentsBookView = styled.View`
  margin: 0 7px 20px 13px;
`;
