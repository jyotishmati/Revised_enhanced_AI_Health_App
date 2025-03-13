import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import WelcomeTemplate from './WelcomeTemplate';

type Props = NativeStackScreenProps<any, 'Welcome3'>;

export default function WelcomeScreen3({ navigation }: Props) {
  return (
    <WelcomeTemplate
      imageSource={require('../../assets/images/page1.jpg')}
      title="Secure & Trusted"
      subtitle="Your data is safe, your health is in good hands"
      backgroundColor="white"
      buttonColor="#0F172A"
      titleColor="#0F172A"
      skipColor="#0F172A"
      onNext={() => navigation.navigate('Login/Signup')}
      onSkip={()=>navigation.navigate("Login/Signup")}
    />
  );
}