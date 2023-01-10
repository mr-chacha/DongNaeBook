import React from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import styled, { css } from '@emotion/native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect } from 'react';

export default function DetailContent({ book }) {
  //더보기 버튼
  const [introduceButton, setIntroduceButton] = useState(false);
  return (
    <>
      {/* 책이미지 */}
      <DetailContentImg
        source={{
          uri: `${book.coverLargeUrl}`,
        }}
      />
      {/* 책 이름*/}
      <DetailContentTitleText>{book.title}</DetailContentTitleText>

      {/* 상세 타이틀*/}
      <DetailContentTitleView>
        {/* 카운터 firebase연결 필요*/}
        <DetailContentCountText>👀300명이 이 책을 봤어요!</DetailContentCountText>

        {/* 찜 */}
        <DetailContentIconTouchableOpacity>
          <AntDesign
            name='hearto'
            size={16}
            color='black'
          />
        </DetailContentIconTouchableOpacity>
        {/* 읽은 책 firebase연결 필요*/}
        <DetailContentIconTouchableOpacity>
          <Ionicons
            name='bookmark-outline'
            size={18}
            color='black'
          />
        </DetailContentIconTouchableOpacity>
      </DetailContentTitleView>

      {/* 상세 정보 글자가 길어지면 줄바꿈 활성*/}
      <DetailContentInformationView>
        {/* 출판 */}
        <DetailContentInformationBoxView>
          <DetailContentInformationTitleText>출판</DetailContentInformationTitleText>
          {/* 중앙라인 */}
          <DetailContentInformationLineView />

          <DetailContentInformationText>{book.publisher}</DetailContentInformationText>
        </DetailContentInformationBoxView>

        {/* 저자 */}
        <DetailContentInformationBoxView>
          <DetailContentInformationTitleText>저자</DetailContentInformationTitleText>
          {/* 중앙라인 */}
          <DetailContentInformationLineView />

          <DetailContentInformationText>{book.author}</DetailContentInformationText>
        </DetailContentInformationBoxView>

        {/* 발행 */}
        <DetailContentInformationBoxView>
          <DetailContentInformationTitleText>발행</DetailContentInformationTitleText>
          {/* 중앙라인 */}
          <DetailContentInformationLineView />

          <DetailContentInformationText>{book.pubDate}</DetailContentInformationText>
        </DetailContentInformationBoxView>
      </DetailContentInformationView>

      {/* 책 소개 */}
      <DetailContentIntroduceView>
        <DetailContentIntroduceTitleText>책 소개</DetailContentIntroduceTitleText>

        <DetailContentIntroduceBoxView>
          {/* 책 소개 내용 */}
          <DetailContentIntroduceText
            numberOfLines={introduceButton ? 0 : 3}
            ellipsizeMode='tail'>
            {book.description}
          </DetailContentIntroduceText>
          {/* 더보기 버튼 */}
          <DetailContentIntroduceMoreTouchableOpacity
            //  더보기 클릭 이벤트
            onPress={() => {
              setIntroduceButton((t) => !t);
            }}>
            <DetailContentIntroduceMoreText>
              {introduceButton ? '접기' : `더보기`}
            </DetailContentIntroduceMoreText>
            <DetailContentIntroduceMoreText>
              {introduceButton ? (
                <MaterialIcons
                  name='expand-less'
                  size={22}
                  color='black'
                />
              ) : (
                <MaterialIcons
                  name='expand-more'
                  size={22}
                  color='black'
                />
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
  margin: 20px auto 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 85%;
`;
const DetailContentTitleText = styled.Text`
  max-width: 85%;
  font-size: 20px;
  margin: 20px auto 0 auto;
`;
const DetailContentCountText = styled.Text`
  color: #727272;
  font-size: 12px;
  margin-right: auto;
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
