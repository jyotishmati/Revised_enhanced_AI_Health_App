// import React from "react";
// import { 
//   ScrollView, 
//   View, 
//   Text, 
//   Image, 
//   TouchableOpacity, 
//   StyleSheet 
// } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";
// import Gold_bar from "./Home Page/Gold_bar";

// const InsuranceScreen = () => {
//   return (
//     <ScrollView style={styles.container}>
//       {/* Top Gold Bar */}
//       <Gold_bar />

//       {/* Profile Section */}
//       <View style={styles.profileContainer}>
//         {/* Profile Image */}
//         <Image
//           source={require('../assets/images/page1.jpg')}
//           style={styles.profileImage}
//         />
        
//         {/* Vertical Divider */}
//         <View style={styles.verticalDivider} />

//         {/* Profile Details */}
//         <View style={styles.profileDetails}>
//           <Text style={styles.userName}>Aditi Sharma</Text>
//           <Text style={styles.userInfo}>Mobile: 9876543210</Text>
//           <Text style={styles.userInfo}>MID: NS1234567890</Text>
//         </View>
//       </View>

//       {/* Insurance Type Buttons */}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.insuranceButton}>
//           <FontAwesome name="user" size={24} color="#FFF" />
//           <Text style={styles.buttonText}>Self Insurance</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.insuranceButton}>
//           <FontAwesome name="users" size={24} color="#FFF" />
//           <Text style={styles.buttonText}>Family Insurance</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Horizontal Divider AFTER the buttons */}
//       <View style={styles.horizontalLineFull} />

//       {/* Insurance Plans */}
//       <View style={styles.planContainer}>
//         {/* First Insurance Card */}
//         <View style={styles.insuranceCard}>
//           <View style={styles.insuranceHeader}>
//             <Image
//               source={{ uri: "https://via.placeholder.com/60" }}
//               style={styles.insuranceLogo}
//             />
//             <Text style={styles.insuranceCompany}>Niva Health Insurance</Text>
//           </View>

//           <Text style={styles.planPrice}>
//             ₹7,020
//             <Text style={styles.discountText}>  5% Off per year</Text>
//           </Text>
//           <Text style={styles.strikePrice}>₹7,389</Text>

//           <View style={styles.horizontalLine} />

//           <Text style={styles.planBenefitsTitle}>Plan Benefits</Text>
//           <Text style={styles.planBenefits}>
//             • Up to 3X cover in 3 yrs{"\n"}
//             • Unlimited Restoration Forever{"\n"}
//             • Maternity and IVF{"\n"}
//             • Tax Benefits
//           </Text>

//           <TouchableOpacity style={styles.buyButton}>
//             <Text style={styles.buyButtonText}>Buy Plan</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Second Insurance Card */}
//         <View style={styles.insuranceCard}>
//           <View style={styles.insuranceHeader}>
//             <Image
//               source={require("../assets/images/page1.jpg")}
//               style={styles.insuranceLogo}
//             />
//             <Text style={styles.insuranceCompany}>TATA AIA Life Insurance</Text>
//           </View>

//           <Text style={styles.planPrice}>
//             ₹7,120
//             <Text style={styles.discountText}>  5% Off per year</Text>
//           </Text>
//           <Text style={styles.strikePrice}>₹7,389</Text>

//           <View style={styles.horizontalLine} />

//           <Text style={styles.planBenefitsTitle}>Plan Benefits</Text>
//           <Text style={styles.planBenefits}>
//             • Up to 3X cover in 3 yrs{"\n"}
//             • Unlimited Restoration Forever{"\n"}
//             • Maternity and IVF{"\n"}
//             • Tax Benefits
//           </Text>

//           <TouchableOpacity style={styles.buyButton}>
//             <Text style={styles.buyButtonText}>Buy Plan</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default InsuranceScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F9FAFB",
//   },

//   /* PROFILE SECTION */
//   profileContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   profileImage: {
//     width: 125,
//     height: 125,
//     borderRadius: 10, // Slightly rounded corners
//   },
//   verticalDivider: {
//     width: 1,
//     height: "68%",
//     backgroundColor: "black",
//     marginHorizontal: 15,
//   },
//   profileDetails: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   userName: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 2,
//   },
//   userInfo: {
//     fontSize: 14,
//     color: "gray",
//     marginTop: 2,
//   },

//   /* INSURANCE TYPE BUTTONS */
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingHorizontal: 16,
//     marginTop: 20,
//     // No bottom margin here since we'll place the divider after these
//   },
//   insuranceButton: {
//     // Stack icon above text
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#003366",
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   buttonText: {
//     color: "#FFF",
//     fontSize: 16,
//     fontWeight: "bold",
//     marginTop: 5,
//     textAlign: "center",
//   },

//   /* HORIZONTAL DIVIDER AFTER BUTTONS */
//   horizontalLineFull: {
//     height: 1,
//     backgroundColor: "black",
//     marginVertical: 20,
//     marginHorizontal: 20,
//   },

//   /* INSURANCE CARDS */
//   planContainer: {
//     paddingHorizontal: 20,
//     marginBottom: 20,
//   },
//   insuranceCard: {
//     backgroundColor: "#FFF",
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 15,
//     // Shadow for iOS
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     // Shadow for Android
//     elevation: 2,
//   },
//   insuranceHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   insuranceLogo: {
//     width: 50,
//     height: 50,
//     marginRight: 10,
//     borderRadius: 5,
//   },
//   insuranceCompany: {
//     fontSize: 16,
//     fontWeight: "bold",
//     flex: 1,
//   },
//   planPrice: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginTop: 5,
//   },
//   discountText: {
//     fontSize: 16,
//     color: "green",
//     fontWeight: "bold",
//   },
//   strikePrice: {
//     fontSize: 16,
//     color: "gray",
//     textDecorationLine: "line-through",
//     marginTop: 2,
//   },
//   horizontalLine: {
//     height: 1,
//     backgroundColor: "#DDD",
//     marginVertical: 10,
//   },
//   planBenefitsTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   planBenefits: {
//     fontSize: 14,
//     color: "gray",
//     marginBottom: 15,
//     lineHeight: 20,
//   },
//   buyButton: {
//     backgroundColor: "#003366",
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   buyButtonText: {
//     color: "#FFF",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });


import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  StyleSheet,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Gold_bar from "./Home Page/Gold_bar";

const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size; // Base width is 375

const InsuranceScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Top Gold Bar */}
      <Gold_bar />

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        {/* Profile Image */}
        <Image
          source={require("../assets/images/page1.jpg")}
          style={styles.profileImage}
        />

        {/* Vertical Divider */}
        <View style={styles.verticalDivider} />

        {/* Profile Details */}
        <View style={styles.profileDetails}>
          <Text style={styles.userName}>Aditi Sharma</Text>
          <Text style={styles.userInfo}>Mobile: 9876543210</Text>
          <Text style={styles.userInfo}>MID: NS1234567890</Text>
        </View>
      </View>

      {/* Insurance Type Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.insuranceButton}>
          <FontAwesome name="user" size={scale(24)} color="#FFF" />
          <Text style={styles.buttonText}>Self Insurance</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.insuranceButton}>
          <FontAwesome name="users" size={scale(24)} color="#FFF" />
          <Text style={styles.buttonText}>Family Insurance</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Divider AFTER the buttons */}
      <View style={styles.horizontalLineFull} />

      {/* Insurance Plans */}
      <View style={styles.planContainer}>
        {/* First Insurance Card */}
        <View style={styles.insuranceCard}>
          <View style={styles.insuranceHeader}>
            <Image
              source={{ uri: "https://via.placeholder.com/60" }}
              style={styles.insuranceLogo}
            />
            <Text style={styles.insuranceCompany}>Niva Health Insurance</Text>
          </View>

          <Text style={styles.planPrice}>
            ₹7,020
            <Text style={styles.discountText}>  5% Off per year</Text>
          </Text>
          <Text style={styles.strikePrice}>₹7,389</Text>

          <View style={styles.horizontalLine} />

          <Text style={styles.planBenefitsTitle}>Plan Benefits</Text>
          <Text style={styles.planBenefits}>
            • Up to 3X cover in 3 yrs{"\n"}
            • Unlimited Restoration Forever{"\n"}
            • Maternity and IVF{"\n"}
            • Tax Benefits
          </Text>

          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Buy Plan</Text>
          </TouchableOpacity>
        </View>

        {/* Second Insurance Card */}
        <View style={styles.insuranceCard}>
          <View style={styles.insuranceHeader}>
            <Image
              source={require("../assets/images/page1.jpg")}
              style={styles.insuranceLogo}
            />
            <Text style={styles.insuranceCompany}>TATA AIA Life Insurance</Text>
          </View>

          <Text style={styles.planPrice}>
            ₹7,120
            <Text style={styles.discountText}>  5% Off per year</Text>
          </Text>
          <Text style={styles.strikePrice}>₹7,389</Text>

          <View style={styles.horizontalLine} />

          <Text style={styles.planBenefitsTitle}>Plan Benefits</Text>
          <Text style={styles.planBenefits}>
            • Up to 3X cover in 3 yrs{"\n"}
            • Unlimited Restoration Forever{"\n"}
            • Maternity and IVF{"\n"}
            • Tax Benefits
          </Text>

          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Buy Plan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default InsuranceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  /* PROFILE SECTION */
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(20),
    paddingTop: scale(20),
  },
  profileImage: {
    width: scale(125),
    height: scale(125),
    borderRadius: scale(10),
  },
  verticalDivider: {
    width: scale(1),
    height: "68%",
    backgroundColor: "black",
    marginHorizontal: scale(15),
  },
  profileDetails: {
    flex: 1,
    justifyContent: "center",
  },
  userName: {
    fontSize: scale(18),
    fontWeight: "bold",
    marginBottom: scale(2),
  },
  userInfo: {
    fontSize: scale(14),
    color: "gray",
    marginTop: scale(2),
  },

  /* INSURANCE TYPE BUTTONS */
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: scale(16),
    marginTop: scale(20),
  },
  insuranceButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#003366",
    paddingVertical: scale(12),
    paddingHorizontal: scale(20),
    borderRadius: scale(8),
    flex: 1,
    marginHorizontal: scale(5),
  },
  buttonText: {
    color: "#FFF",
    fontSize: scale(16),
    fontWeight: "bold",
    marginTop: scale(5),
    textAlign: "center",
  },

  /* HORIZONTAL DIVIDER AFTER BUTTONS */
  horizontalLineFull: {
    height: scale(1),
    backgroundColor: "black",
    marginVertical: scale(20),
    marginHorizontal: scale(20),
  },

  /* INSURANCE CARDS */
  planContainer: {
    paddingHorizontal: scale(20),
    marginBottom: scale(20),
  },
  insuranceCard: {
    backgroundColor: "#FFF",
    borderRadius: scale(10),
    padding: scale(15),
    marginBottom: scale(15),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    shadowOffset: { width: 0, height: scale(2) },
    elevation: scale(2),
  },
  insuranceHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scale(10),
  },
  insuranceLogo: {
    width: scale(50),
    height: scale(50),
    marginRight: scale(10),
    borderRadius: scale(5),
  },
  insuranceCompany: {
    fontSize: scale(16),
    fontWeight: "bold",
    flex: 1,
  },
  planPrice: {
    fontSize: scale(20),
    fontWeight: "bold",
    marginTop: scale(5),
  },
  discountText: {
    fontSize: scale(16),
    color: "green",
    fontWeight: "bold",
  },
  strikePrice: {
    fontSize: scale(16),
    color: "gray",
    textDecorationLine: "line-through",
    marginTop: scale(2),
  },
  horizontalLine: {
    height: scale(1),
    backgroundColor: "#DDD",
    marginVertical: scale(10),
  },
  planBenefitsTitle: {
    fontSize: scale(16),
    fontWeight: "bold",
    marginBottom: scale(5),
  },
  planBenefits: {
    fontSize: scale(14),
    color: "gray",
    marginBottom: scale(15),
    lineHeight: scale(20),
  },
  buyButton: {
    backgroundColor: "#003366",
    paddingVertical: scale(12),
    borderRadius: scale(8),
    alignItems: "center",
  },
  buyButtonText: {
    color: "#FFF",
    fontSize: scale(16),
    fontWeight: "bold",
  },
});