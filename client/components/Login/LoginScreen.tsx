import React from 'react';
import { useNavigation } from '@react-navigation/native';
import LoginTemplate from './LoginTemplate';

export default function LoginScreen() {
  const navigation = useNavigation();

  return (
    <LoginTemplate
      title="Welcome to Next Life!"
      subtitle="Enter your Email ID and Password to login/signup"
      buttonText="Sign In"
      // onButtonPress={() => navigation.navigate('Login(OTP)' as never)}
      // onLoginPress={() => navigation.navigate('Login' as never)}
      imageSource={require('../../assets/images/login.png')}
      onVerifyPage={()=>navigation.navigate("Login(OTP)" as never)}
      onProfilePage={()=>navigation.navigate("Profile" as never)}
      onHomePage={()=>navigation.navigate("HomeTemplate" as never)}
    />
  );
}