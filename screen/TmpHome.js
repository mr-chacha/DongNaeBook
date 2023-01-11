import React from "react";
import { StyleSheet, Image } from "react-native";
import BestSeller from "../components/Home/BestSeller";
import MonthBook from "../components/Home/MonthBook";
import Banner from "../components/Home/Banner";

import styled from "@emotion/native";

import { StatusBar } from "expo-status-bar";
import logo from "../assets/logo.png";

import CategoryList2 from "../components/Home/CategoryList2";

export default function TmpHome() {
  return (
    <Safe>
      <Container>
        <StatusBar style="dark" />

        <ApplicationTitle>동네북</ApplicationTitle>

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

const ApplicationTitle = styled.Text`
  font-size: 35px;
  margin-bottom: 5px;
  text-align: center;
  font-family: "PyeongChangPeace";
`;

const Safe = styled.SafeAreaView`
  background-color: #fff;
  margin: auto;
`;

const LogoImg = styled.View`
  height: 50px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Container = styled.ScrollView`
  background-color: #fff;
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
