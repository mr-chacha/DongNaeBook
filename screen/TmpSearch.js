import React, { createContext, useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from "react-native";
import styled, { css } from "@emotion/native";
import { MaterialIcons } from "@expo/vector-icons";
import BookBox2 from "../components/Home/BookBox2";
import { useNavigation } from "@react-navigation/core";
import { getApiRecentBooks, getBestSeller, getSearchBooks } from "../util/api";
import { useQuery, useQueryClient } from "react-query";
import Hyperlink from "react-native-hyperlink";
import { Linking } from "react-native";

//디테일 페이지로 이동하면 자꾸 리뷰만 떠요ㅠㅠ

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
        {/* View태그 안에 TextInput이 있으면 안먹히나요?????? 어제는 계속 됐는데 왜 안되는거지ㅠㅠ */}
        {/* 머때문인지 모르겠는데 TextInput이 터치를 인식하는게 너무 느려요.. */}

        {/* 검색결과 */}
        <Text style={{ marginTop: 20, marginBottom: 10 }}>
          {searchBooks?.totalResults ?? 0}건의 검색 결과를 찾았어요
        </Text>

        {/* 검색도서내역 */}
        {/* <SearchBookBoxView> */}
        <FlatScrollView>
          <FlatList
            // showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: 15,
              paddingHorizontal: 20,
              // flexDirection: "row",
              // justifyContent: "flex-start",
              backgoundColor: "green",

              // width: "90%",
            }}
            numColumns={3}
            data={searchBooks?.item ?? []}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
                <BookBox2 book={item} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.itemId}
            ItemSeparatorComponent={<View style={{ width: 0, height: 20 }} />}
            onEndReached={onEndReached} // 화면 맨 아래가 나오면 실행
            onEndReachedThreshold={0.6} //함수가 호출할 시점 (0~1)
            ListFooterComponent={loading && <ActivityIndicator />}
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

// 검색결과 나오는 책 배열
const SearchBookBoxView = styled.View`
  /* background-color: grey;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start; */
`;

// bookbox 하나
const SearchBookView = styled.View`
  margin: 7px;

  /* margin-left: 10px; */
  /* margin-right: 10px; */
`;

const SearchText = styled.Text`
  margin-top: 20px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.text};
`;
const SearchBackGround = styled.View`
  background-color: ${(props) => props.theme.back};
`;

const SearchInput = styled.TextInput`
  width: 200px;
`;
const FlatScrollView = styled.ScrollView`
  width: 100%;
`;
