import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';

import { authService, db, storage } from '../firebase';
import { getAuth } from 'firebase/auth/react-native';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, doc, getDocs, query, where, updateDoc } from 'firebase/firestore';

import styled from '@emotion/native';
import * as ImagePicker from 'expo-image-picker';
import { SimpleLineIcons } from '@expo/vector-icons';
import MyPageContents from '../components/MyPage/MyPageContents';

export default function TmpMyPage() {
  // 프로필 이미지
  const [profileImg, setProfileImg] = useState(null);
  const [selectedImage, setSelectedImage] = useState(
    'https://firebasestorage.googleapis.com/v0/b/dongnaebook-2dd14.appspot.com/o/BasicProfile.jpeg?alt=media&token=4196a2a2-dffc-4dbe-90b7-45bdefe20c2b'
  );

  // 닉넥임
  const [updateNickName, setUpdateNickName] = useState('');
  // 유저 ID
  const [id, setId] = useState('');
  // 네비게이션
  const navigation = useNavigation();
  //로그인정보
  const currentUser = getAuth().currentUser;
  // 모달
  const [modalVisible, setModalVisible] = useState(false);

  // 모달창 열기
  const handleModalOpen = () => {
    setModalVisible(true);
  };

  //로그아웃
  const handleSignOut = () => {
    authService
      .signOut()
      .then(() => {
        navigation.navigate('Home');
      })
      .catch((error) => alert(error.message));
  };

  // 프로필 이미지 수정
  const handleProfileImgChange = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('이미지를 선택하지 않으셨습니다.');
      setSelectedImage(profileImg);
    }

    const response = await fetch(result.assets[0].uri);
    const blobFile = await response.blob();
    const reference = ref(storage, `images/${currentUser.uid}`);
    const snapshot = await uploadBytes(reference, blobFile);
    const downLoadImage = await getDownloadURL(snapshot.ref);
    // 닉네임 DB에 업데이트
    await updateDoc(doc(db, 'users', id), {
      nickName: updateNickName,
      profileImg: downLoadImage,
    });
  };

  // 모달 프로필 수정 취소
  const handleModalClose = async () => {
    Alert.alert(
      '프로필 수정을 취소 하시겠습니까?',
      '* 변경사항이 저장 되지 않습니다 *',
      [
        {
          text: '아니요',
          onPress: () => console.log(''),
          style: 'cancel',
        },
        {
          text: '네',
          onPress: () => setModalVisible(false),
        },
      ],
      { cancelable: false }
    );
  };
  // 모달 프로필 수정 완료
  const handleModalSubmit = async () => {
    // 프로필 이미지 FB에 업데이트

    // 닉네임 유효성 검사
    if (updateNickName.length < 2 || updateNickName.length > 10) {
      alert('닉네임 2글자 이상, 10글자 미만으로 적어주세요.');
    } else {
      try {
        await updateDoc(doc(db, 'users', id), {
          nickName: updateNickName,
        });
      } catch (event) {
      } finally {
        setModalVisible(false);
      }
    }
  };

  // 디비에 있는 유저 정보 가져오기
  const getUserInfo = async () => {
    const q = await query(collection(db, 'users'), where('uid', '==', currentUser.uid));
    getDocs(q).then((querySnapshot) => {
      const user = [];
      querySnapshot.forEach((doc) => {
        user.push({
          id: doc.data().id,
          nickName: doc.data().nickName,
          profileImg: doc.data().profileImg,
        });
      });
      setUpdateNickName(user[0].nickName);
      setId(user[0].id);
      setProfileImg(user[0].profileImg);
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <MypageContainer>
          <SimpleLineIcons onPress={handleModalOpen} name='options-vertical' size={20} color='black' style={{ flexDirection: 'row', marginLeft: 'auto' }} />
          <Image
            style={{ width: 158, height: 158, borderRadius: 79 }}
            source={{
              uri: `${selectedImage}`,
            }}
            onChangePhoto={setProfileImg}
          />
          <Nickname>
            <Text>{updateNickName}</Text>
          </Nickname>
          <MyEmail> dongnaebook@gmail.com</MyEmail>
          <LogoutBtn onPress={handleSignOut}>
            <Text>로그아웃</Text>
          </LogoutBtn>
          {/* 모달 */}
          <Modal visible={modalVisible} animationType='fade'>
            <ModalBox>
              <ModalProfileView>
                <ProfileImageContainer onPress={handleProfileImgChange}>
                  <ProfileImageInput
                    source={{
                      uri: `${selectedImage}`,
                    }}
                  />
                </ProfileImageContainer>
                <NicknameInput value={updateNickName} onChangeText={setUpdateNickName} />
                <InputBottomLine />
                <ModalButtonContainer>
                  <ModalButton onPress={handleModalSubmit}>
                    <Text>확인</Text>
                  </ModalButton>
                  <ModalButton onPress={handleModalClose}>
                    <Text>취소</Text>
                  </ModalButton>
                </ModalButtonContainer>
              </ModalProfileView>
            </ModalBox>
          </Modal>
        </MypageContainer>
        <MyPageContents />
      </ScrollView>
    </SafeAreaView>
  );
}

// 모달
const ModalBox = styled.View`
  margin-top: 30%;
`;

// 프로필(프사+닉네임) in 모달
const ModalProfileView = styled.View`
  margin: auto;
  justify-content: center;
  align-items: center;
`;

// 프로필input in 모달
const ProfileImageInput = styled.Image`
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
  border-radius: 100px;
`;

// 수정완료버튼 in 모달
const ModalButton = styled.TouchableOpacity`
  width: 90px;
  height: 30px;
  background-color: #cdff40;
  border-radius: 15px;
  align-items: center;
  margin-top: 20px;
  padding: 5px;
  justify-content: center;
`;

const NicknameInput = styled.TextInput`
  width: 140px;
  height: 30px;
  border-right: 1px solid #000;
  align-items: center;
  margin-top: 20px;
  text-align: center;
`;

const InputBottomLine = styled.View`
  width: 140px;
  border: 1px solid #cdff40;
`;

//마이페이지 전체 뷰
const MypageContainer = styled.View`
  align-items: center;
  margin-top: 33px;
  padding: 0px 20px 10px 20px;
`;

const Nickname = styled.View`
  height: 34px;
  border: 1px solid lightgray;
  border-radius: 10px;
  margin-top: 15px;
  padding: 8px 20px;
`;

const MyEmail = styled.Text`
  align-items: center;
  margin-top: 10px;
  opacity: 0.4;
`;

const LogoutBtn = styled.TouchableOpacity`
  margin-top: 15px;
`;

const ProfileImageContainer = styled.TouchableOpacity``;

const ModalButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 210px;
`;
