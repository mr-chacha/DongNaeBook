import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity, Text, TextInput, Button } from 'react-native';
import styled from '@emotion/native';
// import * as Font from 'expo-font';
import { useFonts } from 'expo-font';

export default function SignUp() {
  // 폰트
  const [isFontLoaded] = useFonts({
    PyeongChangPeace: require('../assets/fonts/PyeongChangPeace-Bold.otf'),
  });

  if (!isFontLoaded) {
    return null;
  }

  return (
    <SafeAreaView>
      <AuthenticationContainer>
        <ApplicationTitle>동네북</ApplicationTitle>
        <UserInfoInput placeholder='donnaebook@gmail.com' placeholderTextColor='#d4d4d4' />
        <UserInfoInput placeholder='비밀번호 입력' placeholderTextColor='#d4d4d4' />
        <UserInfoInput placeholder='비밀번호 확인' placeholderTextColor='#d4d4d4' />
        <AuthenticationFormSubmitButton>회원가입</AuthenticationFormSubmitButton>
        <AskingContainer>
          <AskingText>이미 가입하셨나요?</AskingText>
          <AuthenticationScreenChangeButton>로그인</AuthenticationScreenChangeButton>
        </AskingContainer>
      </AuthenticationContainer>
    </SafeAreaView>
  );
}

const AuthenticationContainer = styled.View`
  align-items: center;
  padding-top: 60px;
`;

const ApplicationTitle = styled.Text`
  font-size: 50px;
  margin-bottom: 80px;
  font-family: 'PyeongChangPeace';
`;

const UserInfoInput = styled.TextInput`
  font-size: 16px;
  height: 50px;
  width: 90%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #b5b5b5;
  border-radius: 7px;
  color: #000;
`;

const AuthenticationFormSubmitButton = styled.Text`
  height: 50px;
  width: 90%;
  background: #bdff00;
  border: none;
  border-radius: 7px;
  font-size: 18px;
  padding-top: 16px;
  text-align: center;
  margin-bottom: 10px;
  margin-top: 30px;
  /* font-weight: 600; */
`;

const AskingContainer = styled.TouchableOpacity`
  flex-direction: row;
`;

const AskingText = styled.Text`
  font-size: 13px;
  color: #b5b5b5;
  margin-right: 10px;
`;

const AuthenticationScreenChangeButton = styled.Text`
  font-weight: 700;
`;
