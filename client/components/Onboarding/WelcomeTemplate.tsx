// import React from 'react';
// import { View, Text, Image, TouchableOpacity } from 'react-native';

// interface WelcomeTemplateProps {
//   imageSource: any;
//   title: string;
//   subtitle: string;
//   backgroundColor: string;
//   buttonColor: string;
//   titleColor: string;
//   skipColor: string;
//   onNext: () => void;
// }

// export default function WelcomeTemplate({
//   imageSource,
//   title,
//   subtitle,
//   backgroundColor,
//   buttonColor,
//   titleColor,
//   skipColor,
//   onNext,
// }: WelcomeTemplateProps) {
//   return (
//     <View style={{ flex: 1, backgroundColor, alignItems: 'center', justifyContent: 'center' }}>
//       <View style={{ width: '100%', height: '65%', marginTop: -75, paddingRight: 30 }}>
//         <Image
//           source={imageSource}
//           style={{ width: '100%', height: '100%', borderBottomRightRadius: 75 }}
//           resizeMode="cover"
//         />
//       </View>
//       <View style={{ alignItems: 'center', marginTop: 40 }}>
//         <Text style={{ fontSize: 25, fontWeight: 'bold', color: titleColor, marginBottom: 6 }}>
//           {title}
//         </Text>
//         <Text style={{ color: titleColor, textAlign: 'center', marginBottom: 24 }}>
//           {subtitle}
//         </Text>
//         <TouchableOpacity
//           style={{ backgroundColor: buttonColor, borderRadius: 9999, marginTop: 24, paddingHorizontal: 32, paddingVertical: 12, width: 150 }}
//           onPress={onNext}
//         >
//           <Text style={{ color: backgroundColor, textAlign: 'center' }}>Next</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={{ marginTop: 16 }}>
//           <Text style={{ color: skipColor, textAlign: 'center' }}>Skip</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={{ position: 'absolute', bottom: 0, width: '100%', height: 60, backgroundColor, alignItems: 'center', justifyContent: 'center' }}>
//         <View style={{ width: 200, height: 5, backgroundColor: '#9CA3AF', borderRadius: 10}} />
//       </View>
//     </View>
//   );
// }

import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

interface WelcomeTemplateProps {
  imageSource: any;
  title: string;
  subtitle: string;
  backgroundColor: string;
  buttonColor: string;
  titleColor: string;
  skipColor: string;
  onNext: () => void;
  onSkip: () => void;
}

export default function WelcomeTemplate({
  imageSource,
  title,
  subtitle,
  backgroundColor,
  buttonColor,
  titleColor,
  skipColor,
  onNext,
  onSkip
}: WelcomeTemplateProps) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "65%",
          marginTop: -75,
          paddingRight: 30,
        }}
      >
        <Image
          source={imageSource}
          style={{ width: "100%", height: "100%", borderBottomRightRadius: 75 }}
          resizeMode="cover"
        />
      </View>
      <View style={{ alignItems: "center", marginTop: 40 }}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: titleColor,
            marginBottom: 6,
          }}
        >
          {title}
        </Text>
        <Text
          style={{ color: titleColor, textAlign: "center", marginBottom: 24 }}
        >
          {subtitle}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: buttonColor,
            borderRadius: 9999,
            marginTop: 24,
            paddingHorizontal: 32,
            paddingVertical: 12,
            width: 150,
          }}
          onPress={onNext}
        >
          <Text style={{ color: backgroundColor, textAlign: "center" }}>
            Next
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 16, marginBottom: 20 }} onPress={onSkip}>
          <Text style={{ color: skipColor, textAlign: "center", fontSize: 16 }} >
            Skip
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 10,
          width: "100%",
          height: 40,
          backgroundColor,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: 200,
            height: 5,
            backgroundColor: "#9CA3AF",
            borderRadius: 10,
          }}
        />
      </View>
    </View>
  );
}
