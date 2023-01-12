import React from "react";
import styled, { css } from "@emotion/native";
import { useNavigation } from "@react-navigation/native";

export default function MyPageReviewComponent({ review }) {
  const navigation = useNavigation();
  const HandleMoveToDetail = () => {
    navigation.navigate("Detail", {
      params: {
        bookId: review.bookId,
        bookTitle: review.bookTitle,
        bookImage: review.bookImage,
      },
    });
  };
  return (
    <MyPageWantReviewContentsView
      key={review.commentId}
      onPress={HandleMoveToDetail}
    >
      <MyPageWantReviewContentsImage
        source={{
          uri: `${review.bookImage}`,
        }}
      />

      <MyPageWantReviewContentsTextView>
        <MyPageWantReviewContentsTitleFlexView>
          <MyPageWantReviewContentsTitleText
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {review.bookTitle}
          </MyPageWantReviewContentsTitleText>

          <MyPageWantReviewContentsDateText>
            {review.createdDate}
          </MyPageWantReviewContentsDateText>
        </MyPageWantReviewContentsTitleFlexView>

        <MyPageWantReviewContentsStarText>
          ⭐️{review.rating}
        </MyPageWantReviewContentsStarText>

        <MyPageWantReviewContentsReviewText>
          {review.comment}
        </MyPageWantReviewContentsReviewText>
      </MyPageWantReviewContentsTextView>
    </MyPageWantReviewContentsView>
  );
}

const MyPageWantReviewContentsView = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: space-between; */
  width: 90%;
  min-height: 150px;
  background-color: ${(props) => props.theme.boxback};
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
  margin-top: 20px;
  margin-bottom: 20px;
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
  max-width: 150px;
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
  min-height: 60px;
`;
