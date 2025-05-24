// import React from "react";
// import { View, Text, Image, TouchableOpacity } from "react-native";

// interface WelcomeTemplateProps {
//   imageSource: any;
//   title: string;
//   subtitle: string;
//   backgroundColor: string;
//   buttonColor: string;
//   titleColor: string;
//   skipColor: string;
//   onNext: () => void;
//   onSkip: () => void;
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
//   onSkip
// }: WelcomeTemplateProps) {
//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor,
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <View
//         style={{
//           width: "100%",
//           height: "65%",
//           marginTop: -75,
//           paddingRight: 30,
//         }}
//       >
//         <Image
//           source={imageSource}
//           style={{ width: "100%", height: "100%", borderBottomRightRadius: 75 }}
//           resizeMode="cover"
//         />
//       </View>
//       <View style={{ alignItems: "center", marginTop: 40 }}>
//         <Text
//           style={{
//             fontSize: 25,
//             fontWeight: "bold",
//             color: titleColor,
//             marginBottom: 6,
//           }}
//         >
//           {title}
//         </Text>
//         <Text
//           style={{ color: titleColor, textAlign: "center", marginBottom: 24 }}
//         >
//           {subtitle}
//         </Text>
//         <TouchableOpacity
//           style={{
//             backgroundColor: buttonColor,
//             borderRadius: 9999,
//             marginTop: 24,
//             paddingHorizontal: 32,
//             paddingVertical: 12,
//             width: 150,
//           }}
//           onPress={onNext}
//         >
//           <Text style={{ color: backgroundColor, textAlign: "center" }}>
//             Next
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={{ marginTop: 16, marginBottom: 20 }} onPress={onSkip}>
//           <Text style={{ color: skipColor, textAlign: "center", fontSize: 16 }} >
//             Skip
//           </Text>
//         </TouchableOpacity>
//       </View>
//       <View
//         style={{
//           position: "absolute",
//           bottom: 10,
//           width: "100%",
//           height: 40,
//           backgroundColor,
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <View
//           style={{
//             width: 200,
//             height: 5,
//             backgroundColor: "#9CA3AF",
//             borderRadius: 10,
//           }}
//         />
//       </View>
//     </View>
//   );
// }


// WelcomeTemplate.tsx
import React from "react";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useResponsive } from "../../hooks/useresponsive";

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
  const { scale, vs, responsiveFontSize, isPortrait, isTablet } = useResponsive();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: isTablet ? vs(20) : 0,
          }}
        >
          {/* Image */}
          <View
            style={{
              width: "100%",
              height: isPortrait ? vs(420) : "55%",
              paddingRight: scale(20),
              marginTop: vs(0)
            }}
          >
            <Image
              source={imageSource}
              style={{
                width: "100%",
                height: "103%",
                borderBottomRightRadius: scale(75),
              }}
              resizeMode="cover"
            />
          </View>

          {/* Text Content */}
          <View
            style={{
              alignItems: "center",
              marginTop: vs(30),
              paddingHorizontal: scale(20),
            }}
          >
            <Text
              style={{
                fontSize: responsiveFontSize(24),
                fontWeight: "bold",
                color: titleColor,
                marginBottom: vs(8),
                textAlign: "center",
              }}
            >
              {title}
            </Text>

            <Text
              style={{
                fontSize: responsiveFontSize(15),
                lineHeight: responsiveFontSize(22),
                color: titleColor,
                textAlign: "center",
                paddingHorizontal: scale(8),
                marginBottom: vs(20),
              }}
            >
              {subtitle}
            </Text>

            {/* Next Button */}
            <TouchableOpacity
              style={{
                backgroundColor: buttonColor,
                borderRadius: scale(50),
                paddingHorizontal: scale(32),
                paddingVertical: vs(14),
                minWidth: scale(160),
                minHeight: vs(48),
                marginTop: vs(12),
                marginBottom: vs(22),
          
              }}
              onPress={onNext}
              activeOpacity={0.8}
            >
              <Text
                style={{
                  color: backgroundColor,
                  fontSize: responsiveFontSize(15),
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Next
              </Text>
            </TouchableOpacity>

            {/* Skip Button */}
            <TouchableOpacity
              style={{ minHeight: vs(40) }}
              onPress={onSkip}
              activeOpacity={0.6}
            >
              <Text
                style={{
                  color: skipColor,
                  fontSize: responsiveFontSize(15),
                  textAlign: "center",
                  textDecorationLine: "underline" 
                }}
              >
                Skip
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Progress Indicator */}
      <View
        style={{
          height: vs(40),
          backgroundColor,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: scale(200),
            height: vs(5),
            backgroundColor: "#9CA3AF",
            borderRadius: scale(10),
          }}
        />
      </View>
    </SafeAreaView>
  );
}