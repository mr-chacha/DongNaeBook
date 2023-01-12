import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity, Text, TextInput, Alert, Pressable, StyleSheet } from 'react-native';
import styled from '@emotion/native';
import { useFonts } from 'expo-font';
import { authService } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 버튼 활성화
  const [btnDisabled, setBtnDisabled] = useState(true);

  // 회원가입 버튼 활성화 확인
  useEffect(() => {
    if (email.length > 0 && password.length > 0) {
      setBtnDisabled(false);
      return;
    }
    setBtnDisabled(true);
  }, [email, password]);

  const handleEmailChange = (email) => {
    const changedEmail = removeWhitespace(email);
    setEmail(changedEmail);
    setErrorMessage(validateEmail(changedEmail) ? '' : '이메일을 입력해주세요.');
  };

  const handlePasswordChange = (password) => {
    setPassword(removeWhitespace(password));
  };

  const passwordRef = useRef(null);

  const handleAuthentication = () => {
    if (email !== '' && password !== '') {
      signInWithEmailAndPassword(authService, email, password)
        .then(() => navigation.navigate('Home'))
        .catch((err) => Alert.alert('Login error', err.message));
    }
  };

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
        <UserInfoInput
          placeholder='donnaebook@gmail.com'
          placeholderTextColor='#d4d4d4'
          autoCapitalize='none'
          keyboardType='email-address'
          textContentType='email-address'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <UserInfoInput
          placeholder='비밀번호 입력'
          placeholderTextColor='#d4d4d4'
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={true}
          textContentType='password'
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <AuthenticationFormSubmitButton onPress={handleAuthentication} disabled={btnDisabled} style={[StyleSheet.button, { backgroundColor: btnDisabled ? '#dadada' : '#bdff00' }]}>
          <BtnText>로그인</BtnText>
        </AuthenticationFormSubmitButton>
        <AskingContainer>
          <AskingText>이미 가입하셨나요?</AskingText>
          <AuthenticationScreenChangeButton onPress={() => navigation.navigate('SignUp')}>회원가입</AuthenticationScreenChangeButton>
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
  color: ${(props) => props.theme.text};
`;

const UserInfoInput = styled.TextInput`
  font-size: 16px;
  height: 50px;
  width: 90%;
  margin-bottom: 10px;
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
  padding-top: 16px;
  margin-bottom: 10px;
  margin-top: 30px;
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
