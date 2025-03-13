import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import WelcomeTemplate from './WelcomeTemplate';

type Props = NativeStackScreenProps<any, 'Welcome2'>;

export default function WelcomeScreen2({ navigation }: Props) {
  return (
    <WelcomeTemplate
      imageSource={require('../../assets/images/page1.jpg')}
      title="Personalized Care, Anytime"
      subtitle="Access doctors, track health, and manage your records seamlessly"
      backgroundColor="#0F172A"
      buttonColor="white"
      titleColor="white"
      skipColor="white"
      onNext={() => navigation.navigate('Welcome3')}
      onSkip={()=>navigation.navigate("Login/Signup")}
    />
  );
}