import React, { useState } from 'react';
import { StyleSheet, Image, useColorScheme, Text } from 'react-native';
import BestSeller from '../components/Home/BestSeller';
import MonthBook from '../components/Home/MonthBook';
import Banner from '../components/Home/Banner';
import styled from '@emotion/native';
import logo from '../assets/logo.png';
import { useFonts } from 'expo-font';
import { View } from 'react-native';

import CategoryList2 from '../components/Home/CategoryList2';
import Switch from 'expo-dark-mode-switch';
export default function TmpHome() {
  // 폰트
  const [isFontLoaded] = useFonts({
    PyeongChangPeace: require('../assets/fonts/PyeongChangPeace-Bold.otf'),
  });

  if (!isFontLoaded) {
    return null;
  }
  return (
    <View>
      <Container showsVerticalScrollIndicator={false}>
        <ApplicationTitle>동네북</ApplicationTitle>

        <Banner />
        {/* 신간 */}
        <MonthBook />
        {/* 베스트셀러 */}
        <BestSeller />
        {/* 카테고리 */}
        <CategoryList2 />
      </Container>
    </View>
  );
}

// const Safe = styled.SafeAreaView``;
const ApplicationTitle = styled.Text`
  font-size: 35px;
  margin-bottom: 5px;
  text-align: center;
  font-family: 'PyeongChangPeace';
`;

// const Safe = styled.View`
//   background-color: #fff;
//   margin: auto;
//   padding-top: 50px;
// `;

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.back};
`;
