import React from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import styled, { css } from "@emotion/native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { useEffect } from "react";
import {
  onSnapshot,
  query,
  collection,
  doc,
  orderBy,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth/react-native";
import MyPageReview from "./MyPageReview";
import MyPageWant from "./MyPageWant";
import MyPageRead from "./MyPageRead";
import { LogBox } from "react-native";

export default function MyPageContents() {
  //컨텐츠 아이콘
  const [contentsIcon, setContentsIcon] = useState("내가읽은책");
  //   console.log(contentsIcon);

  //파이어베이스
  const [readBook, setReadbook] = useState([]);
  const [introduceButton, setIntroduceButton] = useState(false);
  const [bookMarkButton, setBookMarkButton] = useState([]);

  //async경고 무시
  LogBox.ignoreLogs([
    "Warning: AsyncStorage has been extracted from react-native core",
  ]);
  //로그인정보
  const currentUser = getAuth().currentUser;
  //   console.log(currentUser.uid);

  //readbook 데이터 모두 불러오기
  useEffect(() => {
    const q = query(collection(db, "readbook"));
    onSnapshot(q, (snapshot) => {
      const newReadBooks = snapshot.docs.map((doc) => {
        const newReadBook = {
          id: doc.id,
          ...doc.data(),
        };
        return newReadBook;
      });
      setReadbook(newReadBooks);
    });
  }, []);
  // 파이어베이스 bookid랑 현재페이지의 itemid같은 것만 map
  const readBookFilter = readBook
    .filter((i) => i.userId === currentUser.uid)
    .map((i) => i.bookId);
  //   console.log(readBookFilter);

  //읽고싶은책
  useEffect(() => {
    const b = query(collection(db, "bookmark"));
    onSnapshot(b, (snapshot) => {
      const newBookMarks = snapshot.docs.map((doc) => {
        const newReadBook = {
          id: doc.id,
          ...doc.data(),
        };
        return newReadBook;
      });
      setBookMarkButton(newBookMarks);
    });
  }, []);

  //북마크
  const bookMarkFilter = bookMarkButton
    .filter((i) => i.userId === currentUser.uid)
    .map((i) => i.bookId);
  //   const [bookMarkTrueButton] = bookMarkFilter;
  //   console.log(bookMarkFilter);

  return (
    <>
      <MyPageContentsView>
        <MyPageContentsIcon
          onPress={() => {
            setContentsIcon("내가읽은책");
          }}
        >
          <Text
            style={
              contentsIcon === "내가읽은책"
                ? { color: "blue" }
                : { color: "#000" }
            }
          >
            내가 읽은 책
          </Text>
        </MyPageContentsIcon>

        <MyPageContentsIcon
          onPress={() => {
            setContentsIcon("읽고싶은책");
          }}
        >
          <Text
            style={
              contentsIcon === "읽고싶은책"
                ? { color: "blue" }
                : { color: "#000" }
            }
          >
            읽고 싶은 책
          </Text>
        </MyPageContentsIcon>

        <MyPageContentsIcon
          onPress={() => {
            setContentsIcon("내가쓴리뷰");
          }}
        >
          <Text
            style={
              contentsIcon === "내가쓴리뷰"
                ? { color: "blue" }
                : { color: "#000" }
            }
          >
            내가 쓴 리뷰
          </Text>
        </MyPageContentsIcon>
      </MyPageContentsView>
      {/* 마이페이지 컨텐츠 내용 */}

      {/* {bookMarkFilter.map((book) => (
        <MyPageWant book={book} />
      ))} */}
      {contentsIcon === "내가쓴리뷰" ? <MyPageReview /> : <></>}
      {contentsIcon === "내가읽은책" ? (
        <MyPageWant bookMarkFilter={bookMarkFilter} />
      ) : (
        <></>
      )}
      {contentsIcon === "읽고싶은책" ? (
        <MyPageRead readBookFilter={readBookFilter} />
      ) : (
        <></>
      )}
    </>
  );
}

/***************/
/***************/
/***************/
//마이페이지 컨텐츠
const MyPageContentsView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 20px;
`;
const MyPageContentsIcon = styled.TouchableOpacity``;
