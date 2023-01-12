import React, { useState } from "react";
import { StyleSheet, Image, useColorScheme, Text } from "react-native";
import BestSeller from "../components/Home/BestSeller";
import MonthBook from "../components/Home/MonthBook";
import Banner from "../components/Home/Banner";
import styled from "@emotion/native";
import { StatusBar } from "expo-status-bar";
import logo from "../assets/logo.png";
import CategoryList2 from "../components/Home/CategoryList2";
import Switch from "expo-dark-mode-switch";
export default function TmpHome() {
  return (
    <Safe>
      <Container showsVerticalScrollIndicator={false}>
        <LogoImg>
          <Image source={logo} style={styles.logo} />
        </LogoImg>
        <Banner />
        {/* 신간 */}
        <MonthBook />
        {/* 베스트셀러 */}
        <BestSeller />
        {/* 카테고리 */}
        <CategoryList2 />
      </Container>
    </Safe>
  );
}

const Safe = styled.SafeAreaView``;

const LogoImg = styled.View`
  height: 50px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.back};
`;

const styles = StyleSheet.create({
  logo: {
    height: 40,
    width: 130,
    // display: "block",
  },
  category: {
    display: "flex",
    flexDirection: "row",
  },
});
