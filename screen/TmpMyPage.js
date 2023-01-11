import React, { useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { authService } from "../firebase";
// import { Blurhash } from "react-native-blurhash";
//<npm i react-native-blurhash> or <npm i react-native-blurhash --force>

const Tab = createBottomTabNavigator();

export default function TmpMyPage() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  //모달 오픈되면 배경 블러

  const navigation = useNavigation();
  //로그아웃
  const handleSignOut = () => {
    authService
      .signOut()
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <View>
      <SafeAreaView>
        <ScrollView>
          <MypageContainer>
            {/* <ProfileEditModal /> */}
            <SimpleLineIcons
              onPress={handleModalOpen}
              name="options-vertical"
              size={20}
              color="black"
              style={{ flexDirection: "row", marginLeft: "auto" }}
              // onPress={}
            />
            <Image
              style={{ width: 170, height: 170, borderRadius: 85 }}
              source={require("../screen/image/BasicProfile.jpeg")}
            />
            <Nickname>집요정</Nickname>
            <MyEmail> dongnaebook@gmail.com</MyEmail>

            {/* 모달 */}
            <Modal
              visible={modalVisible}
              // transparent={true}
              animationType="fade"
            >
              {/* <Blurhash
                blurhash="LGFFaXYk^6#M@-5c,1J5@[or[Q6."
                style={{ flex: 1 }}
              /> */}
              <ModalBox>
                {/* 닫기버튼인데 모달배경컬러를 설정할 수 없어서 확인으로만 닫을 수 있게 하려고 합니다ㅠㅠ */}
                {/* <TouchableOpacity>
                  <AntDesign
                    onPress={handleModalClose}
                    name="close"
                    size={24}
                    color="black"
                    style={{ flexDirection: "row", marginLeft: "auto" }}
                  />
                </TouchableOpacity> */}
                <ModalProfileView>
                  <TouchableOpacity>
                    <ProfileImageInput
                      style={{ width: 158, height: 158, borderRadius: 79 }}
                      source={require("../screen/image/BasicProfile.jpeg")}
                    />
                  </TouchableOpacity>
                  <NicknameInput>집요정</NicknameInput>
                  <EditButton onPress={handleModalClose}>
                    <Text>확인</Text>
                  </EditButton>
                </ModalProfileView>
              </ModalBox>
            </Modal>
          </MypageContainer>
          <TouchableOpacity onPress={handleSignOut}>
            <Text>로그아웃</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// 모달
const ModalBox = styled.View`
  margin: auto;
  width: 300;
  height: 350px;
  border-radius: 15px;
  background-color: white;
  padding: 10px;

  /* justify-content: center; */
  /* align-items: center; */
`;

// 프로필(프사+닉네임) in 모달
const ModalProfileView = styled.View`
  margin: auto;
  justify-content: center;
  align-items: center;
`;

// 프로필input in 모달
const ProfileImageInput = styled.Image``;

// 수정완료버튼 in 모달
const EditButton = styled.TouchableOpacity`
  width: 90px;
  height: 30px;
  background-color: #cdff40;
  border-radius: 15px;
  align-items: center;
  margin-top: 20px;
  text-align: center;
  padding: 5px;
`;

const NicknameInput = styled.TextInput`
  width: 116px;
  height: 30px;
  border: 2px solid #cdff40;
  border-radius: 15px;
  align-items: center;
  margin-top: 20px;
  text-align: center;
  padding: 5px; // 텍스트 세로정렬 padding말고 다른방법 아는분 계실까요?ㅠ
`;

//마이페이지 전체 뷰
const MypageContainer = styled.View`
  align-items: center;
  margin-top: 84px;
  padding: 0px 20px 20px 20px;
`;

const Nickname = styled.Text`
  width: 116px;
  height: 30px;
  background: lightgrey;
  border-radius: 15px;
  align-items: center;
  margin-top: 20px;
  text-align: center;
  padding: 5px; // 텍스트 세로정렬 padding말고 다른방법 아는분 계실까요?ㅠ
`;

const MyEmail = styled.Text`
  align-items: center;
  margin-top: 10px;
  opacity: 0.4;
`;
