// import React from "react";
// import { View, TextInput, StyleSheet, Dimensions } from "react-native";
// import Svg, { Path } from "react-native-svg";

// const { width } = Dimensions.get("window");
// const scale = (size: number) => (width / 375) * size;

// const SearchBar = () => {
//   return (
//     <View style={styles.outerContainer}>
//       <View style={styles.innerContainer}>
//         <Svg
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           style={styles.searchIcon}
//         >
//           <Path
//             d="M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z"
//             stroke="#063247"
//             strokeWidth="1.94126"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//           <Path
//             d="M18.9304 20.6898C19.4604 22.2898 20.6704 22.4498 21.6004 21.0498C22.4504 19.7698 21.8904 18.7198 20.3504 18.7198C19.2104 18.7098 18.5704 19.5998 18.9304 20.6898Z"
//             stroke="#063247"
//             strokeWidth="1.94126"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </Svg>
//         <TextInput
//           style={styles.input}
//           placeholder="Search Doctors"
//           placeholderTextColor="#063247"
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   outerContainer: {
//     width: scale(390),
//     height: scale(50),
//     // flexShrink: 0,
//     // backgroundColor: '#FAFAFA',
//     // flexDirection: "row",
//     paddingLeft: scale(30),
//     marginTop: scale(10),
//     // alignItems: "center",
//     // justifyContent: "center",
//     paddingBottom: scale(80),
//   },
//   innerContainer: {
//     width: scale(320),
//     height: scale(48),

//     flexShrink: scale(0),
//     borderRadius: scale(12),
//     borderWidth: scale(2),
//     borderColor: "#063247",
//     backgroundColor: "#FFF",
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: scale(10),
//     marginTop: scale(8),
//   },
//   searchIcon: {
//     marginRight: scale(10),
//     // borderColor: "#",
//   },
//   input: {
//     flex: scale(1),
//     fontSize: scale(16),
//     borderColor: "white",
//     color: "#063247",
//     // borderColor: "#fffff"
//   },
// });

// export default SearchBar;


import React from "react";
import { View, TextInput, StyleSheet, Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useResponsive } from "../../hooks/useresponsive"; // Assuming you have this hook

const SearchBar = () => {
  const { scale, vs, ms } = useResponsive();

  return (
    <View style={[styles.outerContainer, { marginTop: vs(10), height: vs(70), }]}>
      <View
        style={[
          styles.innerContainer,
          {
            borderRadius: scale(12),
            borderWidth: scale(2),
            paddingHorizontal: scale(10),
            height: vs(46),
            marginBottom: vs(6)
          },
        ]}
      >
       <Svg
  width={20}
  height={20}
  viewBox="0 0 24 24"
  fill="none"
  style={{ marginRight: 10 }}
>

          <Path
            d="M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z"
            stroke="#063247"
            strokeWidth="1.94126"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M18.9304 20.6898C19.4604 22.2898 20.6704 22.4498 21.6004 21.0498C22.4504 19.7698 21.8904 18.7198 20.3504 18.7198C19.2104 18.7098 18.5704 19.5998 18.9304 20.6898Z"
            stroke="#063247"
            strokeWidth="1.94126"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
        <TextInput
            style={[
              styles.input,
              {
                fontSize: ms(16),
                textAlignVertical: "center", // ✅ Vertical alignment
                paddingVertical: vs(12),     // ✅ Balanced top and bottom padding
              },
            ]}
            placeholder="Search Doctors"
            placeholderTextColor="#063247"
          />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    
  },
  innerContainer: {
    width: "90%",
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center", // ✅ Ensures child components are vertically centered
    borderColor: "#063247",
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  
  input: {
    flex: 1,
    color: "#063247",
    fontSize: 16,
    paddingVertical: 0, // Remove extra space
    textAlignVertical: "center", // Critical for Android vertical alignment
  },
  
});

export default SearchBar;
