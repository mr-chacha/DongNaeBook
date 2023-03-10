import React from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import styled, { css } from '@emotion/native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { onSnapshot, query, collection, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import { LogBox } from 'react-native';
import { getAuth } from 'firebase/auth/react-native';
import { authService } from '../../firebase';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';

export default function DetailContent({ book }) {
  //async경고 무시
  LogBox.ignoreLogs(['Warning: AsyncStorage has been extracted from react-native core']);
  //네비게이션
  const navigation = useNavigation();

  //더보기 버튼
  const [readBook, setReadbook] = useState([]);
  const [introduceButton, setIntroduceButton] = useState(false);
  const [bookMarkButton, setBookMarkButton] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //로그인정보
  let currentUser = false;
  currentUser = isLoggedIn ? getAuth().currentUser : false;
  const bookUUID = uuidv4();
  const setRead = async () => {
    if (isLoggedIn == false) {
      Alert.alert(
        '로그인 후 사용이 가능합니다.',
        '로그인 하시겠습니까?',
        [
          {
            text: '아니요',
            onPress: () => console.log(''),
            style: 'cancel',
          },
          {
            text: '네',
            onPress: () => navigation.navigate('Login'),
          },
        ],
        { cancelable: false }
      );
    } else {
      await setDoc(doc(db, 'readbook', bookUUID), newReadBook);
      Alert.alert('동네북', '읽고 싶은 책으로 등록했습니다.');
    }
  };
  const setBookMark = async () => {
    if (isLoggedIn == false) {
      Alert.alert(
        '로그인 후 사용이 가능합니다.',
        '로그인 하시겠습니까?',
        [
          {
            text: '아니요',
            onPress: () => console.log(''),
            style: 'cancel',
          },
          {
            text: '네',
            onPress: () => navigation.navigate('Login'),
          },
        ],
        { cancelable: false }
      );
    } else {
      await setDoc(doc(db, 'bookmark', bookUUID), newReadBook);
      Alert.alert('동네북', '읽은 책으로 등록했습니다.');
    }
  };

  // 들어온 사람의 id와 문서의 id를 비교
  let deleteReadBook = async () => {
    if (readBookTrueButton.userId === currentUser.uid) {
      const docRef = doc(db, 'readbook', readBookTrueButton.bookUUID);
      await deleteDoc(docRef);
    }
  };

  //북마크
  let deleteBookMark = async () => {
    if (bookMarkTrueButton.userId === currentUser.uid) {
      const docRef = doc(db, 'bookmark', bookMarkTrueButton.bookUUID);
      await deleteDoc(docRef);
    }
  };
  //readbook 데이터 모두 불러오기
  useEffect(() => {
    //로그인 정보
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    const q = query(collection(db, 'readbook'));
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
    });
  }, []);
  // 파이어베이스 bookid랑 현재페이지의 itemid같은 것만 map
  const readBookFilter = readBook
    .filter(
      (i) => i.bookId === book.itemId && i.userId === currentUser.uid // && i.readBook === true //&& i.userId === 1 //여기에 유저아이디와 책아이디비교
    )
    .map((i) => i); //여기에 유저아이디와 책아이디비교
  //readBookFilter분해
  const [readBookTrueButton] = readBookFilter;

  //북마크
  useEffect(() => {
    const b = query(collection(db, 'bookmark'));
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
    });
  }, []);

  //북마크
  const bookMarkFilter = bookMarkButton
    .filter(
      (i) => i.bookId === book.itemId && i.userId === currentUser.uid // && i.readBook === true //&& i.userId === 1 //여기에 유저아이디와 책아이디비교
    )
    .map((i) => i);
  const [bookMarkTrueButton] = bookMarkFilter;
  const howMany = bookMarkButton.filter((i) => i.bookId === book.itemId).map((i) => i);

  const newReadBook = {
    userId: currentUser.uid,
    bookId: book.itemId,
    readBook: true,
    bookUUID: bookUUID,
  };
  const isDark = useColorScheme() === 'dark';

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
        <DetailContentCountText>👀 {howMany.length} 명이 이 책을 읽었어요!</DetailContentCountText>
        {/* 찜 */}
        {/* 유저 아이디,책 아이디 , response 를 넣어서 파이어베이스로 */}
        {/* 옵셔널체이닝 */}
        {readBookTrueButton?.readBook ? (
          <DetailContentIconTouchableOpacity onPress={deleteReadBook}>
            <AntDesign name='heart' size={16} color='red' />
          </DetailContentIconTouchableOpacity>
        ) : (
          <DetailContentIconTouchableOpacity onPress={setRead}>
            <AntDesign name='hearto' size={16} color={isDark === false ? 'black' : 'white'} />
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
              <Ionicons name='bookmark' size={18} color='red' />
            </DetailContentIconTouchableOpacity>
          ) : (
            <DetailContentIconTouchableOpacity onPress={setBookMark}>
              <Ionicons name='bookmark-outline' size={18} color={isDark === false ? 'black' : 'white'} />
            </DetailContentIconTouchableOpacity>
          )}
        </DetailContentIconTouchableOpacity>
      </DetailContentTitleView>

      {/* 상세 정보 글자가 길어지면 줄바꿈 활성*/}
      <DetailContentInformationView>
        {/* 출판 */}
        <DetailContentInformationBoxView>
          <DetailContentInformationTitleText>출판</DetailContentInformationTitleText>
          {/* 중앙라인 */}
          <DetailContentInformationLineView />

          <DetailContentInformationText>{book.publisher}</DetailContentInformationText>
        </DetailContentInformationBoxView>

        {/* 저자 */}
        <DetailContentInformationBoxView>
          <DetailContentInformationTitleText>저자</DetailContentInformationTitleText>
          {/* 중앙라인 */}
          <DetailContentInformationLineView />

          <DetailContentInformationText>{book.author}</DetailContentInformationText>
        </DetailContentInformationBoxView>

        {/* 발행 */}
        <DetailContentInformationBoxView>
          <DetailContentInformationTitleText>발행</DetailContentInformationTitleText>
          {/* 중앙라인 */}
          <DetailContentInformationLineView />

          <DetailContentInformationText>{book.pubDate}</DetailContentInformationText>
        </DetailContentInformationBoxView>
      </DetailContentInformationView>

      {/* 책 소개 */}
      <DetailContentIntroduceView>
        <DetailContentIntroduceTitleText>책 소개</DetailContentIntroduceTitleText>

        <DetailContentIntroduceBoxView>
          {/* 책 소개 내용 */}
          <DetailContentIntroduceText numberOfLines={introduceButton ? 0 : 3} ellipsizeMode='tail'>
            {book.description}
          </DetailContentIntroduceText>
          {/* 더보기 버튼 */}
          <DetailContentIntroduceMoreTouchableOpacity
            //  더보기 클릭 이벤트
            onPress={() => {
              setIntroduceButton((t) => !t);
            }}
          >
            <DetailContentIntroduceMoreText>{introduceButton ? '접기' : `더보기`}</DetailContentIntroduceMoreText>
            <DetailContentIntroduceMoreText>
              {introduceButton ? <MaterialIcons name='expand-less' size={22} color='black' /> : <MaterialIcons name='expand-more' size={22} color='black' />}
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
  margin: 100px auto 0 auto;
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
  color: ${(props) => props.theme.text};
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
  color: ${(props) => props.theme.text};
`;
const DetailContentInformationLineView = styled.View`
  background-color: #000;
  width: 1px;
  height: 13px;
  margin: 0 5px;
`;
const DetailContentInformationText = styled.Text`
  color: ${(props) => props.theme.text};
`;

const DetailContentIntroduceView = styled.View`
  width: 85%;
  margin: 0 auto;
`;
const DetailContentIntroduceTitleText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  margin: 25px 0 15px 0;
  color: ${(props) => props.theme.text};
`;
const DetailContentIntroduceBoxView = styled.View``;
const DetailContentIntroduceText = styled.Text`
  color: ${(props) => props.theme.text};
`;
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
