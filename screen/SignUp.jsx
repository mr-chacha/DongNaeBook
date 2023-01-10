import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useFonts } from 'expo-font';
import styled from '@emotion/native';
import { v4 as uuidv4 } from 'uuid';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { authService, db } from '../firebase';
import { collection, setDoc, doc } from 'firebase/firestore';

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickName, setNickName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState('');
  const { goBack, setOptions } = useNavigation();

  // 폰트
  const [isFontLoaded] = useFonts({
    PyeongChangPeace: require('../assets/fonts/PyeongChangPeace-Bold.otf'),
  });

  if (!isFontLoaded) {
    return null;
  }

  // 회원가입 또는 로그인 버튼
  const handleAuthentication = () => {
    const generateId = uuidv4();
    const usersRef = collection(db, 'users');

    // 회원가입 요청
    createUserWithEmailAndPassword(authService, email, password)
      .then(() => {
        alert('동네북 회원이 되신걸 환영합니다!');
        setDoc(doc(usersRef, generateId), {
          nickName: nickName,
          id: generateId,
          uid: authService.currentUser.uid,
          email: email,
        });
        console.log('성공!');
      })
      .catch((err) => {
        console.log(err.message);
        alert('이미 존재하는 계정 입니다.');
      });
  };

  const handleEmailChange = (email) => {
    const changedEmail = removeWhitespace(email);
    setEmail(changedEmail);
    setErrorMessage(validateEmail(changedEmail) ? '' : '이메일을 입력해주세요.');
  };

  const handlePasswordChange = (password) => {
    setPassword(removeWhitespace(password));
  };

  return (
    <SafeAreaView>
      <AuthenticationContainer>
        <ApplicationTitle>동네북</ApplicationTitle>
        <UserInfoInput placeholder='닉네임' placeholderTextColor='#d4d4d4' autoCapitalize='none' value={nickName} onChangeText={setNickName} />
        <UserInfoInput placeholder='donnaebook@gmail.com' placeholderTextColor='#d4d4d4' autoCapitalize='none' value={email} onChangeText={setEmail} />
        <UserInfoInput placeholder='비밀번호 입력' autoCapitalize='none' placeholderTextColor='#d4d4d4' value={password} onChangeText={setPassword} secureTextEntry={true} />
        <UserInfoInput placeholder='비밀번호 확인' autoCapitalize='none' placeholderTextColor='#d4d4d4' value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true} />
        <AuthenticationFormSubmitButton onPress={handleAuthentication}>
          <Text>회원가입</Text>
        </AuthenticationFormSubmitButton>
        <AskingContainer>
          <AskingText>이미 가입하셨나요?</AskingText>
          <AuthenticationScreenChangeButton onPress={() => navigation.navigate('Login')}>로그인</AuthenticationScreenChangeButton>
        </AskingContainer>
      </AuthenticationContainer>
    </SafeAreaView>
  );
}

const Contents = styled.View`
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 4px;
`;

const WhiteText = styled.Text`
  width: 100%;
  height: 20px;
  line-height: 20px;
  color: white;
`;

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

const AuthenticationFormSubmitButton = styled.TouchableOpacity`
  height: 50px;
  width: 90%;
  background: #bdff00;
  border: none;
  border-radius: 7px;
  font-size: 18px;
  margin-bottom: 10px;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
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
