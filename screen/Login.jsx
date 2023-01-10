import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity, Text, TextInput, Button, Alert } from 'react-native';
import styled from '@emotion/native';
// import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import { authService } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthInput } from '../components/Auth/AuthInput.js';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState('');

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
        .then(() => console.log('Login success'))
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
  // <AuthInput value={email} onChangeText={handleEmailChange} onSubmitEditing={() => {}} placeholder='donnaebook@gmail.com' returnKeyType='next' />;
  // <AuthInput value={password} onChangeText={handlePasswordChange} onSubmitEditing={() => {}} placeholder='비밀번호 입력' returnKeyType='done' isPassword />;
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
        <AuthenticationFormSubmitButton onPress={handleAuthentication}>로그인</AuthenticationFormSubmitButton>
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
