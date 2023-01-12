import React, { useState, useEffect } from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useFonts } from 'expo-font';
import styled from '@emotion/native';
import { v4 as uuidv4 } from 'uuid';

import { authService, db } from '../firebase';
import { collection, setDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { removeWhitespace } from '../util/Validation';

export default function SignUp({ navigation }) {
  // 초기값
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  // 오류메세지 상태
  const [nickNameErrorMessage, setNickNameErrorMessage] = React.useState('');
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] = React.useState('');

  // 유효성 검사
  const [isNickName, setIsNickName] = React.useState(false);
  const [isEmail, setIsEmail] = React.useState(false);
  const [isPassword, setIsPassword] = React.useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = React.useState(false);

  // 버튼 활성화
  const [btnDisabled, setBtnDisabled] = useState(true);

  // 회원가입 버튼 활성화 확인
  useEffect(() => {
    if (isNickName && isEmail && isPassword && isPasswordConfirm) {
      setBtnDisabled(false);
      return;
    }
    setBtnDisabled(true);
  }, [isNickName, isEmail, isPassword, isPasswordConfirm]);

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
          profileImg: 'https://firebasestorage.googleapis.com/v0/b/dongnaebook-2dd14.appspot.com/o/BasicProfile.jpeg?alt=media&token=4196a2a2-dffc-4dbe-90b7-45bdefe20c2b',
        });
        navigation.navigate('Home');
      })
      .catch((err) => {
        console.log(err.message);
        alert('이미 존재하는 계정 입니다.');
      });
  };

  // 닉네임
  const handleNickNameChange = (nickname) => {
    const currentNickName = removeWhitespace(nickname);
    setNickName(currentNickName);
    if (currentNickName.length < 2 || currentNickName.length > 10) {
      setNickNameErrorMessage('2글자 이상, 10글자 미만으로만 사용할 수 있습니다.');
      setIsNickName(false);
    } else {
      setNickNameErrorMessage('');
      setIsNickName(true);
    }
  };

  //* 이메일
  const handleEmailChange = (email) => {
    const currentEmail = removeWhitespace(email);
    setEmail(currentEmail);
    const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (!emailRegex.test(currentEmail)) {
      setEmailErrorMessage('잘못된 이메일 주소입니다.');
      setIsEmail(false);
    } else {
      setEmailErrorMessage('');
      setIsEmail(true);
    }
  };

  // 비밀번호
  const handlePasswordChange = (password) => {
    const currentPassword = removeWhitespace(password);
    setPassword(currentPassword);
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(currentPassword)) {
      setPasswordErrorMessage('숫자, 영문자, 특수문자 조합으로 8자리 이상 입력해주세요!');
      setIsPassword(false);
    } else {
      setPasswordErrorMessage('');
      setIsPassword(true);
    }
  };

  // 비밀번호 확인
  const handlePasswordConfirmChange = (passwordConfirm) => {
    const currentPasswordConfirm = removeWhitespace(passwordConfirm);
    setPasswordConfirm(currentPasswordConfirm);
    if (currentPasswordConfirm === password) {
      setPasswordConfirmErrorMessage('');
      setIsPasswordConfirm(true);
    } else {
      setPasswordConfirmErrorMessage('비밀번호가 일치하지 않아요. 다시 입력해주세요.');
      setIsPasswordConfirm(false);
    }
  };

  return (
    <SafeAreaView>
      <AuthenticationContainer>
        <ApplicationTitle>동네북</ApplicationTitle>
        <UserInfoInput placeholder='닉네임' placeholderTextColor='#d4d4d4' autoCapitalize='none' value={nickName} onChangeText={handleNickNameChange} />
        <ErrorMessgeWrap>
          <ErrorMessge>{nickNameErrorMessage}</ErrorMessge>
        </ErrorMessgeWrap>
        <UserInfoInput placeholder='donnaebook@gmail.com' placeholderTextColor='#d4d4d4' autoCapitalize='none' value={email} onChangeText={handleEmailChange} />
        <ErrorMessgeWrap>
          <ErrorMessge>{emailErrorMessage}</ErrorMessge>
        </ErrorMessgeWrap>
        <UserInfoInput placeholder='비밀번호 입력' autoCapitalize='none' placeholderTextColor='#d4d4d4' value={password} onChangeText={handlePasswordChange} secureTextEntry={true} />
        <ErrorMessgeWrap>
          <ErrorMessge>{passwordErrorMessage}</ErrorMessge>
        </ErrorMessgeWrap>
        <UserInfoInput placeholder='비밀번호 확인' autoCapitalize='none' placeholderTextColor='#d4d4d4' value={passwordConfirm} onChangeText={handlePasswordConfirmChange} secureTextEntry={true} />
        <ErrorMessgeWrap>
          <ErrorMessge>{passwordConfirmErrorMessage}</ErrorMessge>
        </ErrorMessgeWrap>

        <AuthenticationFormSubmitButton onPress={handleAuthentication} disabled={btnDisabled} style={[StyleSheet.button, { backgroundColor: btnDisabled ? '#dadada' : '#bdff00' }]}>
          <BtnText>회원가입</BtnText>
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
  padding-top: 40px;
`;

const ApplicationTitle = styled.Text`
  font-size: 50px;
  margin-bottom: 60px;
  font-family: 'PyeongChangPeace';
  color: ${(props) => props.theme.text};
`;

const UserInfoInput = styled.TextInput`
  font-size: 16px;
  height: 50px;
  width: 90%;
  margin-bottom: 3px;
  padding: 10px;
  border: 1px solid #b5b5b5;
  border-radius: 7px;
  color: ${(props) => props.theme.text};
`;

const AuthenticationFormSubmitButton = styled.Pressable`
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

const BtnText = styled.Text`
  font-size: 19px;
  font-weight: 600;
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
  color: ${(props) => props.theme.text};
`;

const ErrorMessgeWrap = styled.View`
  align-items: left;
  width: 90%;
`;
const ErrorMessge = styled.Text`
  margin-bottom: 3px;
  font-size: 12px;

  color: #ff2727;
`;
