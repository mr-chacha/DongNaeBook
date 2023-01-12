import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
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
  // Filter를 걸어놓은 카테고리변수선언
  const Filter = catBooks.filter((data) => data.categoryId === currentCategory);

  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{}}
        data={categoryName}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MiddleButtonAll onPress={() => getCategoryKey(item)}>
            <MiddleButtonText key={item}>{item}</MiddleButtonText>
          </MiddleButtonAll>
        )}
        ItemSeparatorComponent={<View style={{}} />}
      />

      {currentCategory === "전체보기" ? (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: 15,
            paddingHorizontal: 20,
            height: 250,
          }}
          data={catBooks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CategoryList books={item} key={uuid.v4()} />
          )}
          ItemSeparatorComponent={<View style={{ width: 20 }} />}
        />
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: 15,
            paddingHorizontal: 20,
            height: 250,
          }}
          data={Filter}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CategoryList books={item} key={uuid.v4()} />
          )}
          ItemSeparatorComponent={<View style={{ width: 20 }} />}
        />
      )}
    </View>
  );
}

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
