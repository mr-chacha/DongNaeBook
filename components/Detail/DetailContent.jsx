import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import styled, { css } from "@emotion/native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
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
// import { async } from "@firebase/util";
import { v4 as uuidv4 } from "uuid";
//async경고 무시
import { LogBox } from "react-native";
import { getAuth } from "firebase/auth/react-native";

export default function DetailContent({ book }) {
  //async경고 무시
  LogBox.ignoreLogs([
    "Warning: AsyncStorage has been extracted from react-native core",
  ]);
  //로그인정보
  const currentUser = getAuth().currentUser;

  //더보기 버튼
  const [readBook, setReadbook] = useState([]);
  const [introduceButton, setIntroduceButton] = useState(false);
  const [bookMarkButton, setBookMarkButton] = useState([]);

  const bookUUID = uuidv4();
  // console.log(bookUUID);

  const setRead = async () => {
    // setReadBookButton((prev) => [...prev, newReadBook]);

    //setDoc
    await setDoc(doc(db, "readbook", bookUUID), newReadBook);
    // alert("읽고 싶은 책으로 등록했습니다");
  };
  const setBookMark = async () => {
    // setReadBookButton((prev) => [...prev, newReadBook]);
    //setDoc
    await setDoc(doc(db, "bookmark", bookUUID), newReadBook);
    // alert("읽고 싶은 책으로 등록했습니다");
  };

  // 들어온 사람의 id와 문서의 id를 비교
  let deleteReadBook = async () => {
    if (readBookTrueButton.userId === currentUser.uid) {
      const docRef = doc(db, "readbook", readBookTrueButton.bookUUID);
      await deleteDoc(docRef);
    }
    // const q = query(
    //   collection(db, "readbook"),
    //   where("userId", "==", 1),
    //   where("bookId", "==", readBookTrueButton.bookUUID)
    // );

    // const docRef = doc(q);
    // // const docRef = doc(db, "readbook", readBookTrueButton.bookUUID);
    // await deleteDoc(docRef);
  };

  //북마크
  let deleteBookMark = async () => {
    if (bookMarkTrueButton.userId === currentUser.uid) {
      const docRef = doc(db, "bookmark", bookMarkTrueButton.bookUUID);
      await deleteDoc(docRef);
    }
  };
  //readbook 데이터 모두 불러오기
  useEffect(() => {
    const q = query(collection(db, "readbook"));
    onSnapshot(q, (snapshot) => {
      //isloading 불러오기전에
      const newReadBooks = snapshot.docs.map((doc) => {
        const newReadBook = {
          id: doc.id, // 문서 이름
          ...doc.data(), // doc.data() : { text, createdAt, ...  }
        };
        return newReadBook;
      });
      setReadbook(newReadBooks);
      //loadingfalse
    });
  }, []);
  // 파이어베이스 bookid랑 현재페이지의 itemid같은 것만 map
  const readBookFilter = readBook
    .filter(
      (i) => i.bookId === book.itemId && i.userId === currentUser.uid // && i.readBook === true //&& i.userId === 1 //여기에 유저아이디와 책아이디비교
    )
    .map((i) => i); //여기에 유저아이디와 책아이디비교
  // console.log(readBookFilter);
  //readBookFilter분해
  const [readBookTrueButton] = readBookFilter;
  // console.log(readBookTrueButton); //나중에 유저아이디도 대조

  //북마크
  useEffect(() => {
    const b = query(collection(db, "bookmark"));
    onSnapshot(b, (snapshot) => {
      //isloading 불러오기전에
      const newBookMarks = snapshot.docs.map((doc) => {
        const newReadBook = {
          id: doc.id, // 문서 이름
          ...doc.data(), // doc.data() : { text, createdAt, ...  }
        };
        return newReadBook;
      });
      setBookMarkButton(newBookMarks);
      //loadingfalse
    });
  }, []);

  //북마크
  const bookMarkFilter = bookMarkButton
    .filter(
      (i) => i.bookId === book.itemId && i.userId === currentUser.uid // && i.readBook === true //&& i.userId === 1 //여기에 유저아이디와 책아이디비교
    )
    .map((i) => i);
  const [bookMarkTrueButton] = bookMarkFilter;
  console.log(bookMarkTrueButton);

  const newReadBook = {
    userId: currentUser.uid,
    bookId: book.itemId,
    readBook: true,
    bookUUID: bookUUID,
  };

  //
  return (
    <>
      {/* 책이미지 */}
      <DetailContentImg
        source={{
          uri: `${book.coverLargeUrl}`,
        }}
      />
      {/* 책 이름*/}
      <DetailContentTitleText>{book.title}</DetailContentTitleText>

      {/* 상세 타이틀*/}
      <DetailContentTitleView>
        {/* 카운터 firebase연결 필요*/}
        <DetailContentCountText>
          👀300명이 이 책을 봤어요!
        </DetailContentCountText>
        {/* 찜 */}
        {/* 유저 아이디,책 아이디 , response 를 넣어서 파이어베이스로 */}
        {/* 옵셔널체이닝 */}
        {readBookTrueButton?.readBook ? (
          <DetailContentIconTouchableOpacity onPress={deleteReadBook}>
            <AntDesign name="heart" size={16} color="red" />
          </DetailContentIconTouchableOpacity>
        ) : (
          <DetailContentIconTouchableOpacity onPress={setRead}>
            <AntDesign name="hearto" size={16} color="black" />
          </DetailContentIconTouchableOpacity>
        )}

        {/* 읽은 책 firebase연결 필요*/}
        <DetailContentIconTouchableOpacity
          onPress={() => {
            setBookMarkButton((i) => !i);
          }}
        >
          {bookMarkTrueButton?.readBook ? (
            <DetailContentIconTouchableOpacity onPress={deleteBookMark}>
              <Ionicons name="bookmark" size={18} color="red" />
            </DetailContentIconTouchableOpacity>
          ) : (
            <DetailContentIconTouchableOpacity onPress={setBookMark}>
              <Ionicons name="bookmark-outline" size={18} color="black" />
            </DetailContentIconTouchableOpacity>
          )}
        </DetailContentIconTouchableOpacity>
      </DetailContentTitleView>

      {/* 상세 정보 글자가 길어지면 줄바꿈 활성*/}
      <DetailContentInformationView>
        {/* 출판 */}
        <DetailContentInformationBoxView>
          <DetailContentInformationTitleText>
            출판
          </DetailContentInformationTitleText>
          {/* 중앙라인 */}
          <DetailContentInformationLineView />

          <DetailContentInformationText>
            {book.publisher}
          </DetailContentInformationText>
        </DetailContentInformationBoxView>

        {/* 저자 */}
        <DetailContentInformationBoxView>
          <DetailContentInformationTitleText>
            저자
          </DetailContentInformationTitleText>
          {/* 중앙라인 */}
          <DetailContentInformationLineView />

          <DetailContentInformationText>
            {book.author}
          </DetailContentInformationText>
        </DetailContentInformationBoxView>

        {/* 발행 */}
        <DetailContentInformationBoxView>
          <DetailContentInformationTitleText>
            발행
          </DetailContentInformationTitleText>
          {/* 중앙라인 */}
          <DetailContentInformationLineView />

          <DetailContentInformationText>
            {book.pubDate}
          </DetailContentInformationText>
        </DetailContentInformationBoxView>
      </DetailContentInformationView>

      {/* 책 소개 */}
      <DetailContentIntroduceView>
        <DetailContentIntroduceTitleText>
          책 소개
        </DetailContentIntroduceTitleText>

        <DetailContentIntroduceBoxView>
          {/* 책 소개 내용 */}
          <DetailContentIntroduceText
            numberOfLines={introduceButton ? 0 : 3}
            ellipsizeMode="tail"
          >
            {book.description}
          </DetailContentIntroduceText>
          {/* 더보기 버튼 */}
          <DetailContentIntroduceMoreTouchableOpacity
            //  더보기 클릭 이벤트
            onPress={() => {
              setIntroduceButton((t) => !t);
            }}
          >
            <DetailContentIntroduceMoreText>
              {introduceButton ? "접기" : `더보기`}
            </DetailContentIntroduceMoreText>
            <DetailContentIntroduceMoreText>
              {introduceButton ? (
                <MaterialIcons name="expand-less" size={22} color="black" />
              ) : (
                <MaterialIcons name="expand-more" size={22} color="black" />
              )}
            </DetailContentIntroduceMoreText>
          </DetailContentIntroduceMoreTouchableOpacity>
        </DetailContentIntroduceBoxView>
      </DetailContentIntroduceView>
    </>
  );
}

const DetailContentImg = styled.Image`
  width: 160px;
  height: 250px;
  margin: 30px auto 0 auto;
`;
const DetailContentTitleView = styled.View`
  margin: 20px auto 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 85%;
`;
const DetailContentTitleText = styled.Text`
  max-width: 85%;
  font-size: 20px;
  margin: 20px auto 0 auto;
`;
const DetailContentCountText = styled.Text`
  color: #727272;
  font-size: 12px;
  margin-right: auto;
`;
const DetailContentIconTouchableOpacity = styled.TouchableOpacity`
  margin-left: 7px;
`;
const DetailContentInformationView = styled.View`
  width: 85%;
  margin: 15px auto 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const DetailContentInformationBoxView = styled.View`
  max-width: 85%;
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const DetailContentInformationTitleText = styled.Text`
  font-weight: 700;
`;
const DetailContentInformationLineView = styled.View`
  background-color: #000;
  width: 1px;
  height: 13px;
  margin: 0 5px;
`;
const DetailContentInformationText = styled.Text``;

const DetailContentIntroduceView = styled.View`
  width: 85%;
  margin: 0 auto;
`;
const DetailContentIntroduceTitleText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  margin: 25px 0 15px 0;
`;
const DetailContentIntroduceBoxView = styled.View``;
const DetailContentIntroduceText = styled.Text``;
const DetailContentIntroduceMoreTouchableOpacity = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #cdff40;
  width: 100%;
  height: 30px;
  border-radius: 7px;
  margin-top: 5px;
`;
const DetailContentIntroduceMoreText = styled.Text`
  font-weight: 700;
`;
