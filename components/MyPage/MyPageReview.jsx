import React from "react";
import { useState, useEffect } from "react";
import styled, { css } from "@emotion/native";
import { onSnapshot, query, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth/react-native";
import MyPageReviewComponent from "./MyPageReviewComponent";

export default function MyPageReview() {
  //리뷰 가져오기
  const [review, setReview] = useState([]);
  //아이디 정보 가져오기
  const currentUser = getAuth().currentUser;

  useEffect(() => {
    //리뷰 가져오기
    const r = query(collection(db, "reviews"));
    onSnapshot(r, (snapshot) => {
      const newReviews = snapshot.docs.map((doc) => {
        const newReview = {
          id: doc.id,
          ...doc.data(),
        };
        return newReview;
      });
      setReview(newReviews);
    });
  }, []);
  //리뷰 아이디와 필터
  const reviews = review.filter((i) => i.creatorId === currentUser.uid);

  return (
    <>
      <MyPageWantReviewView>
        <MyPageWantReviewText>내가 쓴 리뷰</MyPageWantReviewText>
      </MyPageWantReviewView>

      {reviews.map((review) => {
        return <MyPageReviewComponent key={review.commentId} review={review} />;
      })}
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
  font-weight: 600;
`;
