import { Alert, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AuthForm from './AuthForm';

export default function AuthContent({ isLogin, onAuthenticate }) {
  const [credentialsInvalid, setCredentialsInvalid] = seState({
    email: false,
    password: false,
    confirmPassWord: false,
    nickname: false,
  });

  function handleSwitchAuthMode() {}

  function handleSubmit(credentials) {
    let { email, password, confirmPassWord, nickname } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes('@');
    const passwrodIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassWord;
  }

  return (
    <View>
      <Text>AuthContent</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
