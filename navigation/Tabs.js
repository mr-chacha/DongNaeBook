import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Search from '../screen/Search';
import Home from '../screen/Home';
import MyPage from '../screen/MyPage';
import { getAuth } from 'firebase/auth';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import { BLACK, RED } from '../colors';
const Tab = createBottomTabNavigator();

export default function Tabs() {
  const navigation = useNavigation();
  const currentUser = getAuth().currentUser;

  // 로그인 하지 않은 상태에서 MyPage를 누르면 Alert이 뜬다.
  const alert = () => {
    Alert.alert(
      // Alert문구
      '로그인 후 사용이 가능합니다.',
      '로그인 하시겠습니까?',
      [
        // 버튼 배열
        {
          text: '아니요',
          onPress: () => console.log('아니요'),
          style: 'cancel',
        },
        {
          text: '네',
          onPress: () => navigation.navigate('Login'),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarActiveTintColor: '#BDFF00',
      }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <MaterialIcons name='search' size={size} color={color} />,
        }}
        name='Search'
        component={Search}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size }) => <MaterialIcons name='home' size={size} color={color} />,
        }}
        name='Home'
        component={Home}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size }) => <MaterialIcons name='person-outline' size={size} color={color} />,
        }}
        listeners={{
          tabPress: (e) => {
            {
              /* MyPage 버튼을 누른다고 바로 MyPage로 화면이 넘어가는것을 방비해준다. */
            }
            e.preventDefault();
            {
              currentUser ? navigation.navigate('MyPage') : alert();
            }
          },
        }}
        name='MyPage'
        component={MyPage}
      />
    </Tab.Navigator>
  );
}
