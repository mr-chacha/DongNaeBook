import React from "react";
import { useState } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import { LogBox } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
          style={
            contentsIcon === "내가읽은책"
              ? { backgroundColor: "#000" }
              : { backgroundColor: "#ccc" }
          }
          onPress={() => {
            setContentsIcon("내가읽은책");
          }}
        >
          {contentsIcon === "내가읽은책" ? (
            <Ionicons name="bookmark-outline" size={24} color="#fff" />
          ) : (
            <Ionicons name="bookmark-outline" size={24} color="black" />
          )}
        </MyPageContentsIcon>

        <MyPageContentsIcon
          style={
            contentsIcon === "읽고싶은책"
              ? { backgroundColor: "#000" }
              : { backgroundColor: "#ccc" }
          }
          onPress={() => {
            setContentsIcon("읽고싶은책");
          }}
        >
          {contentsIcon === "읽고싶은책" ? (
            <AntDesign name="hearto" size={24} color="#fff" />
          ) : (
            <AntDesign name="hearto" size={24} color="black" />
          )}
        </MyPageContentsIcon>

        <MyPageContentsIcon
          style={
            contentsIcon === "내가쓴리뷰"
              ? { backgroundColor: "#000" }
              : { backgroundColor: "#ccc" }
          }
          onPress={() => {
            setContentsIcon("내가쓴리뷰");
          }}
        >
          {contentsIcon === "내가쓴리뷰" ? (
            <MaterialCommunityIcons
              name="pencil-outline"
              size={24}
              color="#fff"
            />
          ) : (
            <MaterialCommunityIcons
              name="pencil-outline"
              size={24}
              color="black"
            />
          )}
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
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 20px auto 20px auto;
`;
const MyPageContentsIcon = styled.TouchableOpacity`
  background-color: #ccc;
  width: 45px;
  height: 45px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
