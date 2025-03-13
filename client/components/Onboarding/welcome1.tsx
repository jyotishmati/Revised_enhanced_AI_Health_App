import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import WelcomeTemplate from './WelcomeTemplate';

type Props = NativeStackScreenProps<any, 'Welcome1'>;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <WelcomeTemplate
      imageSource={require('../../assets/images/page1.jpg')}
      title="Your Health, Your Future"
      subtitle="Next-gen healthcare at your fingertips"
      backgroundColor="white"
      buttonColor="#0F172A"
      skipColor="#0F172A"
      titleColor="#0F172A"
      onNext={() => navigation.navigate('Welcome2')}
      onSkip={()=>navigation.navigate("Login/Signup")}
    />
  );
}