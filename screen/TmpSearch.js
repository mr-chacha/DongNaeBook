import React, { useState, useEffect } from "react";
import { Text, View, TextInput, SafeAreaView, ScrollView } from "react-native";
import styled, { css } from "@emotion/native";
import { MaterialIcons } from "@expo/vector-icons";
import BookBox from "../components/Home/BookBox";

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
      `${BASE_URL}?key=${API_KEY}&categoryId=100&output=json`
    ).then((res) => res.json());
    setSearchBooks(item);
  };

  useEffect(() => {
    getSearchBooks();
  }, []);

  return (
    <>
      <SafeAreaView
        style={{ height: "100%", marginTop: 50, alignItems: "center" }}
      >
        <TextInput
          style={{
            backgroundColor: "lightgrey",
            padding: 7,
            paddingRight: 10,
            paddingLeft: 10,
            width: 300,
            borderRadius: 20,
          }}
          placeholder={"검색어를 입력하세요"}
        >
          <MaterialIcons name="search" size={24} color="black" />
        </TextInput>
        <ScrollView>
          <Text style={{ marginTop: 20 }}>{}n건의 검색 결과를 찾았어요</Text>
          {/* <View
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentContainerStyle={{ paddingVertical: 20 }}
          >
            {searchBooks.map((book) => (
              <BestSellerBookView key={book.itemId}>
                <BookBox book={book} />
              </BestSellerBookView>
            ))}
          </View> */}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const SearchBookView = styled.View``;

const MonthBookView = styled.View``;
// const MonthBookTitleText = styled.Text`
//   margin-left: 20px;
//   font-size: 20px;
//   font-weight: 700;
// `;
const MonthBookLoader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const MonthBookBoxView = styled.View`
  margin-left: 10px;
  margin-right: 10px;
`;
