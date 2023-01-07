import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import styled, { css } from "@emotion/native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function DetailContent() {
  //더보기 버튼
  const [introduceButton, setIntroduceButton] = useState(false);

  return (
    <>
      {/* 책이미지 */}
      <DetailContentImg source={require("../assets/book.jpg")} />

      {/* 상세 타이틀*/}
      <DetailContentTitleView>
        {/* 책 이름 길이 수정 필요 */}
        <DetailContentTitleText>불편한 편의점</DetailContentTitleText>
        {/* 찜 */}
        <DetailContentIconTouchableOpacity>
          <AntDesign name="hearto" size={16} color="black" />
        </DetailContentIconTouchableOpacity>
        {/* 읽은 책 firebase연결 필요*/}
        <DetailContentIconTouchableOpacity>
          <Ionicons name="bookmark-outline" size={18} color="black" />
        </DetailContentIconTouchableOpacity>
        {/* 카운터 firebase연결 필요*/}
        <DetailContentCountText>
          👀300명이 이 책을 봤어요!
        </DetailContentCountText>
      </DetailContentTitleView>

      {/* 상세 정보 글자가 길어지면 줄바꿈 활성*/}
      <DetailContentInformationView>
        {/* 출판 */}
        <DetailContentInformationBoxView>
          <DetailContentInformationTitleText>
            출판
          </DetailContentInformationTitleText>
          {/* 중앙라인 */}
          <DetailContentInformationLineView />

          <DetailContentInformationText>
            나무옆의자
          </DetailContentInformationText>
        </DetailContentInformationBoxView>

        {/* 저자 */}
        <DetailContentInformationBoxView>
          <DetailContentInformationTitleText>
            저자
          </DetailContentInformationTitleText>
          {/* 중앙라인 */}
          <DetailContentInformationLineView />

          <DetailContentInformationText>김호연</DetailContentInformationText>
        </DetailContentInformationBoxView>

        {/* 발행 */}
        <DetailContentInformationBoxView>
          <DetailContentInformationTitleText>
            발행
          </DetailContentInformationTitleText>
          {/* 중앙라인 */}
          <DetailContentInformationLineView />

          <DetailContentInformationText>
            2021.04.20
          </DetailContentInformationText>
        </DetailContentInformationBoxView>
      </DetailContentInformationView>

      {/* 책 소개 */}
      <DetailContentIntroduceView>
        <DetailContentIntroduceTitleText>
          책 소개
        </DetailContentIntroduceTitleText>

        <DetailContentIntroduceBoxView>
          {/* 책 소개 내용 */}
          <DetailContentIntroduceText
            numberOfLines={introduceButton ? 0 : 3}
            ellipsizeMode="tail"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis
            nibh vitae mi ultricies ultrices quis in eros. Suspendisse cursus
            congue pharetra. Sed nulla eros, congue sit amet urna dignissim,
            bibendum auctor erat. Maecenas vitae placerat nisi, id feugiat
            ipsum. Aenean vitae massa quis enim convallis blandit eget at nunc.
            Proin volutpat eget odio vitae rutrum. Phasellus interdum turpis
            eget rhoncus facilisis. Maecenas consequat venenatis euismod. Donec
            et dolor vel elit posuere auctor.
          </DetailContentIntroduceText>
          {/* 더보기 버튼 */}
          <DetailContentIntroduceMoreTouchableOpacity
            //  더보기 클릭 이벤트
            onPress={() => {
              setIntroduceButton((t) => !t);
            }}
          >
            <DetailContentIntroduceMoreText>
              {introduceButton ? "접기" : `더보기`}
            </DetailContentIntroduceMoreText>
            <DetailContentIntroduceMoreText>
              {introduceButton ? (
                <MaterialIcons name="expand-less" size={22} color="black" />
              ) : (
                <MaterialIcons name="expand-more" size={22} color="black" />
              )}
            </DetailContentIntroduceMoreText>
          </DetailContentIntroduceMoreTouchableOpacity>
        </DetailContentIntroduceBoxView>
      </DetailContentIntroduceView>
    </>
  );
}

const DetailContentImg = styled.Image`
  width: 160px;
  height: 250px;
  margin: 30px auto 0 auto;
`;
const DetailContentTitleView = styled.View`
  margin: 30px auto 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 85%;
`;
const DetailContentTitleText = styled.Text`
  width: 110px;
  font-size: 20px;
`;
const DetailContentCountText = styled.Text`
  color: #727272;
  font-size: 12px;
  margin-left: auto;
`;
const DetailContentIconTouchableOpacity = styled.TouchableOpacity`
  margin-left: 7px;
`;
const DetailContentInformationView = styled.View`
  width: 85%;
  margin: 15px auto 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const DetailContentInformationBoxView = styled.View`
  max-width: 85%;
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const DetailContentInformationTitleText = styled.Text`
  font-weight: 700;
`;
const DetailContentInformationLineView = styled.View`
  background-color: #000;
  width: 1px;
  height: 13px;
  margin: 0 5px;
`;
const DetailContentInformationText = styled.Text``;

const DetailContentIntroduceView = styled.View`
  width: 85%;
  margin: 0 auto;
`;
const DetailContentIntroduceTitleText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  margin: 25px 0 15px 0;
`;
const DetailContentIntroduceBoxView = styled.View``;
const DetailContentIntroduceText = styled.Text``;
const DetailContentIntroduceMoreTouchableOpacity = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #cdff40;
  width: 100%;
  height: 30px;
  border-radius: 7px;
  margin-top: 5px;
`;
const DetailContentIntroduceMoreText = styled.Text`
  font-weight: 700;
`;
