import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import CategoryList from "./CategoryList";
import uuid from "react-native-uuid";
import styled, { css } from "@emotion/native";
import { SCREEN_HEIGHT } from "../../util/test";
const categoryName = [
  "전체보기",
  "인문 / 사회",
  "소설 / 에세이",
  "경영 / 경제",
  "자기계발",
  "수험서",
  "역사 / 문화",
];
const categoryId = ["전체보기", "119", "101", "117", "118", "123", "105"];
export default function CategoryList2() {
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
  const [currentCategory, setCurrentCategory] = useState("전체보기");

  const getCategoryKey = (category) => {
    // 인문/사회
    const findIndex = categoryName.indexOf(category); // 1
    setCurrentCategory(categoryId[findIndex]); // 110
  };

  return (
    <View>
      <MiddleContainer
        horizontal
        indicatorStyle={"white"}
        showsHorizontalScrollIndicator={false}
      >
        <HomePageBestSellerBtnBox>
          {categoryName.map((category) => (
            <MiddleButtonAll
              onPress={() => getCategoryKey(category)}
              key={uuid.v4()}
            >
              <MiddleButtonText key={category}>{category}</MiddleButtonText>
            </MiddleButtonAll>
          ))}
        </HomePageBestSellerBtnBox>
      </MiddleContainer>

      <HomePageBestSellerScrollBox horizontal>
        <HomePageCategoryBox>
          {currentCategory === "전체보기"
            ? catBooks.map((data) => (
                <CategoryList books={data} key={uuid.v4()} />
              ))
            : catBooks
                .filter((data) => data.categoryId === currentCategory)
                .map((data) => <CategoryList books={data} key={uuid.v4()} />)}
        </HomePageCategoryBox>
      </HomePageBestSellerScrollBox>
    </View>
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

const HomePageBestSellerScrollBox = styled.ScrollView`
  width: 100%;
`;

const HomePageBestSellerBtnBox = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

const MiddleContainer = styled.ScrollView`
  width: 100%;
`;

const MiddleButtonAll = styled.TouchableOpacity`
  width: 93px;
  height: 40px;
  padding: 10px;
  background-color: #cdff40;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 7px;
`;

const MiddleButtonText = styled.Text`
  color: black;
  font-weight: 700;
`;
