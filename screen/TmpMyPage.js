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

const Tab = createBottomTabNavigator();

export default function TmpMyPage() {
  const [isModify, setIsModify] = useState(false);

  const handleModalOpen = () => {
    setIsModify(true);
  };

  const handleModalClose = () => {
    setIsModify(false);
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
            <ProfileImage style={{ width: 158, height: 158 }} />
            <Nickname>집요정</Nickname>
            <MyEmail> dongnaebook@gmail.com</MyEmail>

            <Modal visible={isModify} style={{ width: 250, height: 300 }}>
              <TouchableOpacity>
                <AntDesign
                  onPress={handleModalClose}
                  name="close"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              <View>
                <ProfileImage style={{ width: 158, height: 158 }} />
                <Nickname>집요정</Nickname>
                <MyEmail> dongnaebook@gmail.com</MyEmail>
              </View>
            </Modal>
          </MypageContainer>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

{
  /* 프로필이미지 */
}
const ProfileImage = styled.TouchableOpacity`
  width: 158px;
  height: 158px;
  border-radius: 79px;
  background-color: grey;
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
