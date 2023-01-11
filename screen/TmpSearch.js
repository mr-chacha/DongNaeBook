import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import styled, { css } from "@emotion/native";
import { MaterialIcons } from "@expo/vector-icons";
import BookBox from "../components/Home/BookBox";

//확인쳌

export default function TmpSearch() {
  // 검색 state
  const [searchBooks, setSearchBooks] = useState([]);

  // search request url
  const BASE_URL = "http://book.interpark.com/api/search.api";

  // api key
  const API_KEY =
    "87B80D6175094F2DB547B7571483B3A72C2492B12CA1B1754121E5255BECA991";

  //api 가져오기

  const getSearchBooks = async () => {
    const { item } = await fetch(
      `${BASE_URL}?key=${API_KEY}&query=%EC%82%BC%EA%B5%AD%EC%A7%80&output=json` // ${BASE_URL}?key=${API_KEY}&query=${searchKeyword}&output=json 로 교체
    ).then((res) => res.json());
    setSearchBooks(item);
  };

  useEffect(() => {
    getSearchBooks();
  }, []);

  return (
    <View style={{ backgroundColor: "white" }}>
      <SafeAreaView
        style={{
          height: "100%",
          marginTop: 50,
          alignItems: "center",
        }}
      >
        <SearchBox>
          <MaterialIcons
            name="search"
            size={24}
            color="black"
            style={{ marginRight: 8 }}
          />
          <TextInput
            style={{ width: 200 }}
            placeholder="검색어를 입력하세요"
          ></TextInput>
        </SearchBox>

        {/* 검색결과 */}
        <Text style={{ marginTop: 20, marginBottom: 10 }}>
          {}n건의 검색 결과를 찾았어요
        </Text>

        {/* 검색도서내역 */}
        <ScrollView>
          <SearchBookBoxView
            contentContainerStyle={{ paddingVertical: 20 }}
            style={{ marginBottom: 70 }}
          >
            {searchBooks.map((book) => (
              <SearchBookView key={book.itemId}>
                <BookBox book={book} />
              </SearchBookView>
            ))}
          </SearchBookBoxView>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const SearchBox = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: lightgrey;
  padding: 10px;
  width: 260px;
  height: 40px;
  border-radius: 20px;
`;

// 검색결과 나오는 책 배열
const SearchBookBoxView = styled.View`
  /* background-color: grey; */
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
`;

// bookbox 하나
const SearchBookView = styled.View`
  margin: 7px;

  /* margin-left: 10px; */
  /* margin-right: 10px; */
`;
