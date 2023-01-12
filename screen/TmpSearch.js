import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import styled, { css } from "@emotion/native";
import { MaterialIcons } from "@expo/vector-icons";
import BookBox2 from "../components/Home/BookBox2";
import {} from "@react-navigation/core";
import { getSearchBooks } from "../util/api";
import { useQuery } from "react-query";
import { Linking } from "react-native";

export default function TmpSearch() {
  const [inputText, setInputText] = useState("");
  const { data: searchBooks, isLoading: isLoadingSB } = useQuery(
    [inputText, "searchBooks"],
    getSearchBooks
  );
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    if (searchBooks.length > 20) {
      setLoading(true);
      await DataFetch();
      setLoading(false);
    }
  };
  const onEndReached = () => {
    if (!loading) {
      getData();
    }
  };

  return (
    <SearchBackGround>
      <SafeAreaView
        style={{
          height: "100%",
          marginTop: 50,
          alignItems: "center",
        }}
      >
        <SearchBox>
          <MaterialIcons name="search" size={24} color="black" />
          <TextInput
            style={{
              width: 200,
              height: 50,
              paddingLeft: 10,
            }}
            placeholderTextColor="#727272"
            placeholder="검색어를 입력하세요"
            onChangeText={(newText) => setInputText(newText)}
            onSubmitEditing={getSearchBooks}
          />
        </SearchBox>
        {/* 검색결과 */}
        <SearchText>
          {searchBooks?.totalResults ?? 0}건의 검색 결과를 찾았어요
        </SearchText>
        {/* 검색도서내역 */}
        <FlatScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            contentContainerStyle={{
              paddingVertical: 15,
              paddingHorizontal: 20,
            }}
            numColumns={3}
            data={searchBooks?.item ?? []}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
                <BookBox2 book={item} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.itemId}
            ItemSeparatorComponent={<View style={{ height: 20 }} />}
          />
        </FlatScrollView>
      </SafeAreaView>
    </SearchBackGround>
  );
}

const SearchBox = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #cdff40;
  padding: 10px;
  width: 260px;
  height: 40px;
  border-radius: 20px;
`;

const SearchBackGround = styled.View`
  background-color: ${(props) => props.theme.back};
`;

const FlatScrollView = styled.ScrollView`
  width: 100%;
`;

const SearchText = styled.Text`
  color: ${(props) => props.theme.text};
  margin-top: 20px;
  margin-bottom: 20px;
`;
