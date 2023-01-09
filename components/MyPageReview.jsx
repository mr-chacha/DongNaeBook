import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled, { css } from "@emotion/native";
import { useState } from "react";

export default function MyPageReview() {
  const [reviewMoreButton, setReviewMoreButton] = useState(false);
  // id를 비교해서 맞으면 열리게
  // 수정 댓글처럼
  return (
    <>
      <MyPageWantReviewView>
        <MyPageWantReviewText>내가 쓴 리뷰</MyPageWantReviewText>
      </MyPageWantReviewView>

      {/*나중에 렌더링 할 것을 props로 보내줘야함 */}
      <MyPageWantReviewContentsView id={1}>
        <MyPageWantReviewContentsImage source={require("../assets/book.jpg")} />

        <MyPageWantReviewContentsTextView>
          <MyPageWantReviewContentsTitleFlexView>
            <MyPageWantReviewContentsTitleText>
              불편한 편의점
            </MyPageWantReviewContentsTitleText>

            <MyPageWantReviewContentsDateText>
              23.01.06
            </MyPageWantReviewContentsDateText>
          </MyPageWantReviewContentsTitleFlexView>

          <MyPageWantReviewContentsStarText>
            ⭐️⭐️⭐️⭐️⭐️
          </MyPageWantReviewContentsStarText>

          <MyPageWantReviewContentsReviewText
            numberOfLines={reviewMoreButton ? 0 : 3}
            ellipsizeMode="tail"
          >
            오랜 기간 베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 오랜
            기간 베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 베스트
            셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 베스트 셀러여서
            읽어보고 싶었는데 너무 재밌었습니다. 기간
          </MyPageWantReviewContentsReviewText>
          <MyPageWantReviewContentsReviewTouchableOpacity
            onPress={() => {
              setReviewMoreButton((t) => !t);
            }}
          >
            <MyPageWantReviewContentsReviewMoreText>
              {reviewMoreButton ? "접기" : `더보기`}
            </MyPageWantReviewContentsReviewMoreText>
          </MyPageWantReviewContentsReviewTouchableOpacity>
        </MyPageWantReviewContentsTextView>
      </MyPageWantReviewContentsView>
      {/* 여기까지 감싸고 */}

      {/* 더미데이터 */}
      <MyPageWantReviewContentsView>
        <MyPageWantReviewContentsImage source={require("../assets/book.jpg")} />

        <MyPageWantReviewContentsTextView>
          <MyPageWantReviewContentsTitleFlexView>
            <MyPageWantReviewContentsTitleText>
              불편한 편의점
            </MyPageWantReviewContentsTitleText>

            <MyPageWantReviewContentsDateText>
              23.01.06
            </MyPageWantReviewContentsDateText>
          </MyPageWantReviewContentsTitleFlexView>

          <MyPageWantReviewContentsStarText>
            ⭐️⭐️⭐️⭐️⭐️
          </MyPageWantReviewContentsStarText>

          <MyPageWantReviewContentsReviewText
            numberOfLines={reviewMoreButton ? 0 : 3}
            ellipsizeMode="tail"
          >
            오랜 기간 베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 오랜
            기간 베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 베스트
            셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 베스트 셀러여서
            읽어보고 싶었는데 너무 재밌었습니다. 기간
          </MyPageWantReviewContentsReviewText>
          <MyPageWantReviewContentsReviewTouchableOpacity
            onPress={() => {
              setReviewMoreButton((t) => !t);
            }}
          >
            <MyPageWantReviewContentsReviewMoreText>
              {reviewMoreButton ? "접기" : `더보기`}
            </MyPageWantReviewContentsReviewMoreText>
          </MyPageWantReviewContentsReviewTouchableOpacity>
        </MyPageWantReviewContentsTextView>
      </MyPageWantReviewContentsView>

      <MyPageWantReviewContentsView>
        <MyPageWantReviewContentsImage source={require("../assets/book.jpg")} />

        <MyPageWantReviewContentsTextView>
          <MyPageWantReviewContentsTitleFlexView>
            <MyPageWantReviewContentsTitleText>
              불편한 편의점
            </MyPageWantReviewContentsTitleText>

            <MyPageWantReviewContentsDateText>
              23.01.06
            </MyPageWantReviewContentsDateText>
          </MyPageWantReviewContentsTitleFlexView>

          <MyPageWantReviewContentsStarText>
            ⭐️⭐️⭐️⭐️⭐️
          </MyPageWantReviewContentsStarText>

          <MyPageWantReviewContentsReviewText
            numberOfLines={reviewMoreButton ? 0 : 3}
            ellipsizeMode="tail"
          >
            오랜 기간 베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 오랜
            기간 베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 베스트
            셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 베스트 셀러여서
            읽어보고 싶었는데 너무 재밌었습니다. 기간
          </MyPageWantReviewContentsReviewText>
          <MyPageWantReviewContentsReviewTouchableOpacity
            onPress={() => {
              setReviewMoreButton((t) => !t);
            }}
          >
            <MyPageWantReviewContentsReviewMoreText>
              {reviewMoreButton ? "접기" : `더보기`}
            </MyPageWantReviewContentsReviewMoreText>
          </MyPageWantReviewContentsReviewTouchableOpacity>
        </MyPageWantReviewContentsTextView>
      </MyPageWantReviewContentsView>

      <MyPageWantReviewContentsView>
        <MyPageWantReviewContentsImage source={require("../assets/book.jpg")} />

        <MyPageWantReviewContentsTextView>
          <MyPageWantReviewContentsTitleFlexView>
            <MyPageWantReviewContentsTitleText>
              불편한 편의점
            </MyPageWantReviewContentsTitleText>

            <MyPageWantReviewContentsDateText>
              23.01.06
            </MyPageWantReviewContentsDateText>
          </MyPageWantReviewContentsTitleFlexView>

          <MyPageWantReviewContentsStarText>
            ⭐️⭐️⭐️⭐️⭐️
          </MyPageWantReviewContentsStarText>

          <MyPageWantReviewContentsReviewText
            numberOfLines={reviewMoreButton ? 0 : 3}
            ellipsizeMode="tail"
          >
            오랜 기간 베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 오랜
            기간 베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 베스트
            셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 베스트 셀러여서
            읽어보고 싶었는데 너무 재밌었습니다. 기간
          </MyPageWantReviewContentsReviewText>
          <MyPageWantReviewContentsReviewTouchableOpacity
            onPress={() => {
              setReviewMoreButton((t) => !t);
            }}
          >
            <MyPageWantReviewContentsReviewMoreText>
              {reviewMoreButton ? "접기" : `더보기`}
            </MyPageWantReviewContentsReviewMoreText>
          </MyPageWantReviewContentsReviewTouchableOpacity>
        </MyPageWantReviewContentsTextView>
      </MyPageWantReviewContentsView>

      <MyPageWantReviewContentsView>
        <MyPageWantReviewContentsImage source={require("../assets/book.jpg")} />

        <MyPageWantReviewContentsTextView>
          <MyPageWantReviewContentsTitleFlexView>
            <MyPageWantReviewContentsTitleText>
              불편한 편의점
            </MyPageWantReviewContentsTitleText>

            <MyPageWantReviewContentsDateText>
              23.01.06
            </MyPageWantReviewContentsDateText>
          </MyPageWantReviewContentsTitleFlexView>

          <MyPageWantReviewContentsStarText>
            ⭐️⭐️⭐️⭐️⭐️
          </MyPageWantReviewContentsStarText>

          <MyPageWantReviewContentsReviewText
            numberOfLines={reviewMoreButton ? 0 : 3}
            ellipsizeMode="tail"
          >
            오랜 기간 베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 오랜
            기간 베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 베스트
            셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 베스트 셀러여서
            읽어보고 싶었는데 너무 재밌었습니다. 기간
          </MyPageWantReviewContentsReviewText>
          <MyPageWantReviewContentsReviewTouchableOpacity
            onPress={() => {
              setReviewMoreButton((t) => !t);
            }}
          >
            <MyPageWantReviewContentsReviewMoreText>
              {reviewMoreButton ? "접기" : `더보기`}
            </MyPageWantReviewContentsReviewMoreText>
          </MyPageWantReviewContentsReviewTouchableOpacity>
        </MyPageWantReviewContentsTextView>
      </MyPageWantReviewContentsView>

      <MyPageWantReviewContentsView>
        <MyPageWantReviewContentsImage source={require("../assets/book.jpg")} />

        <MyPageWantReviewContentsTextView>
          <MyPageWantReviewContentsTitleFlexView>
            <MyPageWantReviewContentsTitleText>
              불편한 편의점
            </MyPageWantReviewContentsTitleText>

            <MyPageWantReviewContentsDateText>
              23.01.06
            </MyPageWantReviewContentsDateText>
          </MyPageWantReviewContentsTitleFlexView>

          <MyPageWantReviewContentsStarText>
            ⭐️⭐️⭐️⭐️⭐️
          </MyPageWantReviewContentsStarText>

          <MyPageWantReviewContentsReviewText
            numberOfLines={reviewMoreButton ? 0 : 3}
            ellipsizeMode="tail"
          >
            오랜 기간 베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 오랜
            기간 베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 기간
            베스트 셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 베스트
            셀러여서 읽어보고 싶었는데 너무 재밌었습니다. 기간 베스트 셀러여서
            읽어보고 싶었는데 너무 재밌었습니다. 기간
          </MyPageWantReviewContentsReviewText>
          <MyPageWantReviewContentsReviewTouchableOpacity
            onPress={() => {
              setReviewMoreButton((t) => !t);
            }}
          >
            <MyPageWantReviewContentsReviewMoreText>
              {reviewMoreButton ? "접기" : `더보기`}
            </MyPageWantReviewContentsReviewMoreText>
          </MyPageWantReviewContentsReviewTouchableOpacity>
        </MyPageWantReviewContentsTextView>
      </MyPageWantReviewContentsView>
    </>
  );
}
const MyPageWantReviewView = styled.View`
  background-color: #cdff40;
  width: 90%;
  height: 40px;
  margin: 0 auto 25px auto;
  border-radius: 7px;
`;
const MyPageWantReviewText = styled.Text`
  font-size: 16px;
  line-height: 40px;
  text-align: center;
`;
const MyPageWantReviewContentsView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: space-between; */
  width: 90%;
  min-height: 150px;
  background-color: #ededed;
  margin: 0 auto 20px auto;
  border-radius: 7px;
`;
const MyPageWantReviewContentsTextView = styled.View`
  width: 100%;
  padding: 15px;
`;
const MyPageWantReviewContentsImage = styled.Image`
  width: 90px;
  height: 130px;
  margin-left: 10px;
`;
const MyPageWantReviewContentsTitleFlexView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 70%;
`;
const MyPageWantReviewContentsTitleText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -1px;
`;
const MyPageWantReviewContentsDateText = styled.Text`
  margin-left: auto;
  font-size: 12px;
  color: #727272;
`;
const MyPageWantReviewContentsStarText = styled.Text`
  font-size: 12px;
  margin: 10px 0;
`;
const MyPageWantReviewContentsReviewText = styled.Text`
  letter-spacing: -1px;
  font-size: 13px;
  width: 70%;
`;
const MyPageWantReviewContentsReviewTouchableOpacity = styled.TouchableOpacity`
  width: 40px;
  margin-top: 5px;
`;
const MyPageWantReviewContentsReviewMoreText = styled.Text`
  color: #0055ff;
  font-size: 12px;
  font-weight: 700;
`;
