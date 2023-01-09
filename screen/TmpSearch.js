import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, TextInput } from "react-native";
import styled, { css } from "@emotion/native";
import { MaterialIcons } from "@expo/vector-icons";

export default function TmpSearch() {
  // 전체도서 request url
  const SEARCH_URL = "http://book.interpark.com/api/search.api";
  // api key

  //도서 api 가져오기

  return (
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

      <Text style={{ marginTop: 20 }}>{}건의 검색 결과를 찾았어요</Text>
      <SearchBookView></SearchBookView>
    </SafeAreaView>
  );
}

const SearchBookView = styled.View``;
