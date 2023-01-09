import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BestSeller from "../components/Home/BestSeller";
import MonthBook from "../components/Home/MonthBook";
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
];

const categoryId = ["전체보기", "119", "101", "117", "118", "123", "105"];

export default function TmpHome() {
  const main =
    "https://storage.googleapis.com/sparta-image.appspot.com/lecture/main.png";

  // 도서 state
  const [catBooks, setCatBooks] = useState([]);
  // 로딩 state

  // 도서 request url
  const BASE_URL = "http://book.interpark.com/api/bestSeller.api";
  // api key
  const API_KEY =
    "B23E30B9DF1AAD646A146C3020DC90CE504C270B6A6B8A3B372CF3B02DEE6077";
  //신간도서 api 가져오기
  const getApiCatBooks = async () => {
    const { item } = await fetch(
      `${BASE_URL}?key=${API_KEY}&categoryId=100&output=json`
    ).then((res) => res.json());
    setCatBooks(item);
  };
  useEffect(() => {
    getApiCatBooks();
  }, []);

  // state
  const [currentCategory, setCurrentCategory] = useState("");
  console.log(currentCategory);

  const getCategoryKey = (category) => {
    // 인무/사회

    const findIndex = categoryName.indexOf(category); // 1
    setCurrentCategory(categoryId[findIndex]); // 110
  };

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
        <MonthBook />
        <ListTitle>NOW 베스트 셀러 🏝️</ListTitle>
        <BestSeller />
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
                onPress={() => getCategoryKey(category)}
              >
                <Text key={category} style={styles.middleButtonText}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </HomePageBestSellerBtnBox>
        </ScrollView>
        <HomePageBestSellerScrollBox horizontal>
          <HomePageCategoryBox>
            {currentCategory === "전체보기"
              ? catBooks.map((data) => <CategoryList books={data} />)
              : catBooks
                  .filter((data) => data.categoryId === currentCategory)
                  .map((data) => <CategoryList books={data} />)}
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
