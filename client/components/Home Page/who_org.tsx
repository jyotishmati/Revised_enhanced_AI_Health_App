// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
// } from "react-native";

// const { width } = Dimensions.get("window");
// const scale = (size: number) => (width / 375) * size;

// const NewsCard = () => {
//   return (
//     <View style={styles.container}>
//       {/* Top Horizontal Bar */}
//       <View style={styles.horizontalBar} />

//       {/* Header Section */}
//       <View style={styles.header}>
//         <Text style={styles.headerText}>World Health Organization</Text>
//         <TouchableOpacity>
//           <Text style={styles.seeAllText}>See all</Text>
//         </TouchableOpacity>
//       </View>

//       {/* News Card */}
//       <View style={styles.card}>
//         {/* Image */}
//         <Image
//           source={require("../../assets/images/WHO.jpg")} // Replace with your image
//           style={styles.image}
//         />

//         {/* News Content */}
//         <View style={styles.textContainer}>
//           <Text style={styles.title}>
//             WHO urges rapid access to mpox diagnostic tests, invites
//             manufacturers to emergency review
//           </Text>
//           <Text style={styles.date}>29 August 2024</Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: scale(-1),
//     backgroundColor: "#fff",
//     paddingHorizontal: scale(16),
//     paddingVertical: scale(10),
//     marginBottom: scale(-22),
//   },
//   horizontalBar: {
//     height: scale(2),
//     backgroundColor: "#E5E7EB",
//     width: "100%",
//     marginBottom: scale(10),
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: scale(10),
//   },
//   headerText: {
//     fontSize: scale(16),
//     fontWeight: "bold",
//     color: "#063247",
//   },
//   seeAllText: {
//     fontSize: scale(12),
//     color: "#6B7280",
//   },
//   card: {
//     marginTop: scale(11),
//     height: scale(280),
//     backgroundColor: "#F1F1F1",
//     borderRadius: scale(12),
//     overflow: "hidden",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: scale(2) },
//     shadowOpacity: 0.1,
//     shadowRadius: scale(4),
//     elevation: scale(4),
//   },
//   image: {
//     width: "100%",
//     height: scale(180),
//     borderTopLeftRadius: scale(12),
//     borderTopRightRadius: scale(12),
//   },
//   textContainer: {
//     padding: scale(15),
//   },
//   title: {
//     fontSize: scale(14),
//     fontWeight: "bold",
//     color: "#063247",
//     marginBottom: scale(6),
//   },
//   date: {
//     fontSize: scale(12),
//     color: "#6B7280",
//   },
// });

// export default NewsCard;


import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useResponsive } from "../../hooks/useresponsive";

const NewsCard = () => {
  const { scale, ms, vs } = useResponsive();

  return (
    <View style={[styles.container, { paddingHorizontal: scale(16), paddingVertical: vs(10), marginTop: vs(-1) }]}>
      {/* Top Horizontal Bar */}
      <View style={[styles.horizontalBar, { height: vs(2), marginBottom: vs(10) }]} />

      {/* Header Section */}
      <View style={styles.header}>
        <Text style={[styles.headerText, { fontSize: ms(16) }]}>
          World Health Organization
        </Text>
        <TouchableOpacity>
          <Text style={[styles.seeAllText, { fontSize: ms(12) }]}>See all</Text>
        </TouchableOpacity>
      </View>

      {/* News Card */}
      <View style={[styles.card, { height: vs(280), borderRadius: scale(12) }]}>
        {/* Image */}
        <Image
          source={require("../../assets/images/WHO.jpg")}
          style={[styles.image, { height: vs(180), borderTopLeftRadius: scale(12), borderTopRightRadius: scale(12) }]}
        />

        {/* News Content */}
        <View style={{ padding: scale(15) }}>
          <Text style={[styles.title, { fontSize: ms(14), marginBottom: vs(6) }]}>
            WHO urges rapid access to mpox diagnostic tests, invites manufacturers to emergency review
          </Text>
          <Text style={[styles.date, { fontSize: ms(12) }]}>29 August 2024</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    marginBottom: -22,
  },
  horizontalBar: {
    backgroundColor: "#E5E7EB",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontWeight: "bold",
    color: "#063247",
  },
  seeAllText: {
    color: "#6B7280",
  },
  card: {
    backgroundColor: "#F1F1F1",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    marginTop: 11,
  },
  image: {
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    color: "#063247",
  },
  date: {
    color: "#6B7280",
  },
});

export default NewsCard;
