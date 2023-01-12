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
import BookBox from "../components/Home/BookBox";
import { useNavigation } from "@react-navigation/core";
import { getApiRecentBooks, getBestSeller, getSearchBooks } from "../util/api";
import { useQuery, useQueryClient } from "react-query";

//디테일 페이지로 이동하면 자꾸 리뷰만 떠요ㅠㅠ

export default function TmpSearch() {
  // const { navigate } = useNavigation();
  // const HandleMoveToDetail = () => {
  //   navigate("Detail", {
  //     params: { bookId: searchBooks?.item.itemId },
  //   });
  // };

  // const { data: searchBooks, isLoading: isLoadingSB } = useQuery(
  //   "searchBooks",
  //   getSearchBooks
  // );
  // const [isRefreshing, setIsRefreshing] = useState(false);
  // const queryClient = useQueryClient();

  const [inputText, setInputText] = useState("");

  // const { data: searchBooks, isLoading: isLoadingSB } = useQuery(
  //   [inputText, "searchBooks"],
  //   getSearchBooks
  // );

  // console.log("searchBooks:", searchBooks);

  const [searchBooks, setSearchBooks] = useState([]);

  // search request url
  const BASE_SEARCH_URL = "http://book.interpark.com/api/search.api";

  // api key
  const API_KEY =
    "87B80D6175094F2DB547B7571483B3A72C2492B12CA1B1754121E5255BECA991";

  // 검색 api 가져오기
  const getSearchBooks = async () => {
    // console.log("in");
    const { item } = await fetch(
      `${BASE_SEARCH_URL}?key=${API_KEY}&query=${inputText}&sort=salesPoint&start=1&maxResults=100&output=json`
    ).then((res) => res.json());
    setSearchBooks(item);
  };
  // http://book.interpark.com/api/search.api?key=87B80D6175094F2DB547B7571483B3A72C2492B12CA1B1754121E5255BECA991&query=삼국지&sort=salesPoint&start=1&maxResults=20&output=json

  // 다음버튼으로 다음페이지 될때마다 start = n + 1, +1될때마다 새로 호출 - 검색결과가 너무 많으면????
  // 반복문으로 끝이 나올때까지 계속 호출 / now = page 수???

  const [loading, setLoading] = useState(false); // 로딩

  const getData = async () => {
    if (searchBooks.length > 20) {
      // 무한스크롤...만들고싶어요.....
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
              // backgroundColor: "lightgrey",
            }}
            placeholder="검색어를 입력하세요"
            onChangeText={(newText) => setInputText(newText)}
            onSubmitEditing={getSearchBooks}
          />
        </SearchBox>
        {/* View태그 안에 TextInput이 있으면 안먹히나요?????? 어제는 계속 됐는데 왜 안되는거지ㅠㅠ */}
        {/* 머때문인지 모르겠는데 TextInput이 터치를 인식하는게 너무 느려요.. */}

        {/* 검색결과 */}
        <Text style={{ marginTop: 20, marginBottom: 10 }}>
          {searchBooks?.length ?? 0}건의 검색 결과를 찾았어요
        </Text>

        {/* 검색도서내역 */}
        {/* <SearchBookBoxView> */}
        <ScrollView>
          <FlatList
            // showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              width: "100%",
              height: "100%",
              paddingVertical: 15,
              paddingHorizontal: 20,
              // flexDirection: "row",
              // justifyContent: "flex-start",
              backgoundColor: "green",

              // width: "90%",
            }}
            numColumns={3}
            data={searchBooks}
            // data={searchBooks?.item ?? []}
            renderItem={({ item }) => <BookBox book={item} />}
            keyExtractor={(item) => item.itemId}
            ItemSeparatorComponent={<View style={{ width: 20 }} />}
            onEndReached={onEndReached} // 화면 맨 아래가 나오면 실행
            onEndReachedThreshold={0.6} //함수가 호출할 시점 (0~1)
            ListFooterComponent={loading && <ActivityIndicator />}
            // 무한 스크롤이 되려면 화면이 아래에 닿아야 하고 데이터를 받아오는 동안 로딩창ㄱㄱ
            // 이 props을 이용해서 로딩 컴포넌트 넣음
          />
        </ScrollView>
        {/* </SearchBookBoxView> */}
        {/* <ScrollView>
        <SearchText>{}n건의 검색 결과를 찾았어요</SearchText>

        {/* 검색도서내역 */}
        {/* <ScrollView showsVerticalScrollIndicator={false}>
          <SearchBookBoxView
            contentContainerStyle={{ paddingVertical: 20 }}
            style={{ marginBottom: 70 }}
          >
            {searchBooks.map((book) => (
              <SearchBookView key={book.itemId}>
                <BookBox onPress={HandleMoveToDetail} book={book} />
              </SearchBookView>
            ))}
          </SearchBookBoxView>
        </ScrollView> */}
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
