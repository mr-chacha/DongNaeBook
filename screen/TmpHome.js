import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Swiper from "react-native-swiper";
import styled from "@emotion/native";
import { SCREEN_HEIGHT } from "../util/test";
import { StatusBar } from "expo-status-bar";
import logo from "../assets/logo.png";
import CategoryList from "../components/Home/CategoryList";

const categoryName = [
  "전체보기",
  "인문/사회",
  "소설/에세이",
  "경영/경제",
  "자기계발",
  "수험서",
  "역사/문화",
  "기타",
];

const bookDatas = [
  {
    id: 1,
    title: "1번 책",
    category: "인문/사회",
  },
  {
    id: 2,
    title: "2번 책",
    category: "소설/에세이",
  },
  {
    id: 3,
    title: "3번 책",
    category: "인문/사회",
  },
  {
    id: 4,
    title: "4번 책",
    category: "역사/문화",
  },
  {
    id: 5,
    title: "5번 책",
    category: "소설/에세이",
  },
  {
    id: 6,
    title: "3번 책",
    category: "인문/사회",
  },
  {
    id: 7,
    title: "3번 책",
    category: "인문/사회",
  },
  {
    id: 8,
    title: "3번 책",
    category: "인문/사회",
  },
  {
    id: 9,
    title: "3번 책",
    category: "인문/사회",
  },
  {
    id: 10,
    title: "3번 책",
    category: "인문/사회",
  },
];

export default function HomePage() {
  const main =
    "https://storage.googleapis.com/sparta-image.appspot.com/lecture/main.png";

  const [currentCategory, setCurrentCategory] = useState("");

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <StatusBar style="dark" />
        <LogoImg>
          <Image source={logo} style={styles.logo} />
        </LogoImg>
        <Swiper height="100%">
          <SwiperChildView>
            <BackgroundImg
              style={StyleSheet.absoluteFill}
              source={{ uri: main }}
            />
          </SwiperChildView>
          <SwiperChildView>
            <BackgroundImg
              style={StyleSheet.absoluteFill}
              source={{ uri: main }}
            />
          </SwiperChildView>
          <SwiperChildView>
            <BackgroundImg
              style={StyleSheet.absoluteFill}
              source={{ uri: main }}
            />
          </SwiperChildView>
        </Swiper>
        <ListTitle>새로 출간된 도서 ✨</ListTitle>
        <ListTitle>NOW 베스트 셀러 🏝️</ListTitle>
        <ScrollView
          style={styles.middleContainer}
          horizontal
          indicatorStyle={"white"}
          showsHorizontalScrollIndicator={false}
        >
          <HomePageBestSellerBtnBox>
            {categoryName.map((category) => (
              <TouchableOpacity
                style={styles.middleButtonAll}
                onPress={() => setCurrentCategory(category)}
              >
                <Text style={styles.middleButtonText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </HomePageBestSellerBtnBox>
        </ScrollView>
        <HomePageBestSellerScrollBox horizontal>
          <HomePageCategoryBox>
            {bookDatas
              .filter((data) => data.category === currentCategory)
              .map((data) => (
                <CategoryList books={data} />
              ))}
          </HomePageCategoryBox>
        </HomePageBestSellerScrollBox>
        <View style={styles.cardContainer}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const HomePageCategoryBox = styled.View`
  width: 100%;
  height: ${SCREEN_HEIGHT / 3 + "px"};
  margin-top: -30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const HomePageBestSellerBox = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const HomePageBestSellerScrollBox = styled.ScrollView`
  width: 100%;
`;
const HomePageBestSellerBtnBox = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SwiperChildView = styled.View`
  flex: 1;
  justify-content: flex-end;
  height: ${SCREEN_HEIGHT / 4 + "px"};
  background-color: green;
`;

const BackgroundImg = styled.Image`
  height: 100%;
  width: 100%;
`;

const LogoImg = styled.View`
  height: 50px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  font-size: 20px;
  font-weight: 500;
`;

const styles = StyleSheet.create({
  container: {
    //앱의 배경 색
    backgroundColor: "#fff",
  },
  title: {
    //폰트 사이즈
    fontSize: 20,
    //폰트 두께
    fontWeight: "700",
    //위 공간으로 부터 이격
    marginTop: 50,
    //왼쪽 공간으로 부터 이격
    marginLeft: 20,
  },
  logo: {
    height: 40,
    width: 130,
    display: "block",
  },
  category: {
    display: "flex",
    flexDirection: "row",
  },
  middleContainer: {
    width: "100%",
    marginLeft: 10,
  },
  middleButtonAll: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#CDFF40",
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 7,
  },
  middleButtonText: {
    color: "black",
    fontWeight: "700",
    //텍스트의 현재 위치에서의 정렬
  },
  cardContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
});
