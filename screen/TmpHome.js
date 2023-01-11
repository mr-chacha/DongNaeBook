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
        <LogoImg>
          <Image source={logo} style={styles.logo} />
        </LogoImg>
        <Banner />
        <ListTitle>새로 출간된 도서 ✨</ListTitle>

        <MonthBook />
        <ListTitle>NOW 베스트 셀러 🏝️</ListTitle>
        <BestSeller />
        <CategoryList2 />
      </Container>
    </Safe>
  );
}

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

const ListTitle = styled.Text`
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 20px;
  font-size: 20px;
  font-weight: 500;
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
