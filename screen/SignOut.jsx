import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { authService } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignOut() {
  const navigation = useNavigation();

  const handleSignOut = () => {
    authService
      .signOut()
      .then(() => {
        navigation.navigate('Home');
      })
      .catch((error) => alert(error.message));
  };
  return (
    <SafeAreaView>
      <Text>SignOut</Text>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>로그아웃</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
