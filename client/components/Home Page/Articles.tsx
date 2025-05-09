// import React from "react";
// import {
//   View,
//   Text,
//   ImageBackground,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
// } from "react-native";

// const { width } = Dimensions.get("window");
// const scale = (size: number) => (width / 375) * size;

// const App = () => {
//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Articles</Text>
//         <Text style={styles.seeAll}>See all</Text>
//       </View>

//       {/* Article Card */}
//       <ImageBackground
//         source={require("../../assets/images/article.jpg")}
//         style={styles.articleCard}
//         imageStyle={styles.articleImage}
//       >
//         <View style={styles.overlay}>
//           <Text style={styles.articleTitle}>
//             Looking for Specialist Doctors?
//           </Text>
//           <Text style={styles.articleSubtitle}>
//             Schedule an appointment with our top doctors.
//           </Text>
//           <View style={styles.dotsContainer}>
//             <View style={[styles.dot, styles.activeDot]} />
//             <View style={styles.dot} />
//             <View style={styles.dot} />
//             <View style={styles.dot} />
//           </View>
//         </View>
//       </ImageBackground>

//       {/* Join Community Section */}
//       <Text style={styles.joinTitle}>Join Community</Text>

//       {/* Underline */}
//       {/* <View style={styles.underline} /> */}

//       <Text style={styles.joinSubtitle}>
//         Join now to get all the information about Health Industry! (#)
//       </Text>
//       <TouchableOpacity style={styles.joinButton}>
//         <Text style={styles.joinButtonText}>Join Now</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: scale(18),
//     marginTop: scale(-1),
//     // paddingBottom: 12
//     // marginBottom: 12
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: scale(15),
//   },
//   headerText: {
//     fontSize: scale(18),
//     fontWeight: "bold",
//   },
//   seeAll: {
//     fontSize: scale(12),
//     color: "#7D8A95",
//   },
//   articleCard: {
//     width: "100%",
//     height: scale(180),
//     borderRadius: scale(15),
//     overflow: "hidden",
//   },
//   articleImage: {
//     borderRadius: scale(15),
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.2)",
//     // flexDirection: "column",
//     justifyContent: "flex-end",
//     alignItems: "flex-start",
//     paddingHorizontal: scale(15),
//     paddingBottom: scale(15),
//     // padding: scale(50),
//   },
//   articleTitle: {
//     color: "#fff",
//     fontSize: scale(19),
//     fontWeight: "bold",
//     maxWidth: scale(200),
//     marginBottom: scale(12),
//   },
//   articleSubtitle: {
//     color: "#fff",
//     fontSize: scale(12),
//     marginBottom: scale(25),
//     maxWidth: scale(200),
//   },
//   dotsContainer: {
//     flexDirection: "row",
//     alignSelf: "center",
//     marginTop: scale(10),
//   },
//   dot: {
//     width: scale(8),
//     height: scale(8),
//     borderRadius: scale(4),
//     backgroundColor: "#ddd",
//     marginHorizontal: scale(4),
//   },
//   activeDot: {
//     backgroundColor: "#fff",
//     width: scale(35),
//   },
//   joinTitle: {
//     fontSize: scale(22),
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 8,
//     marginTop: scale(20),
//     color: "#0F172A",
//   },
//   underline: {
//     width: "82%",
//     height: scale(1),
//     backgroundColor: "#ccc",
//     alignSelf: "center",
//     marginVertical: scale(18),
//   },
//   joinSubtitle: {
//     textAlign: "center",
//     color: "gray",
//     marginTop: scale(5),
//     fontSize: scale(16),
//   },
//   joinButton: {
//     backgroundColor: "#0F172A",
//     padding: scale(15),
//     borderRadius: scale(30),
//     alignItems: "center",
//     marginTop: scale(15),
//   },
//   joinButtonText: {
//     color: "#fff",
//     fontSize: scale(16),
//     // fontWeight: "bold",
//   },
// });

// export default App;

import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useResponsive } from "../../hooks/useresponsive";

const Articles = () => {
  const { scale, ms, vs } = useResponsive();

  return (
    <View style={[styles.container, { padding: scale(18), marginTop: vs(-1) }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerText, { fontSize: ms(18) }]}>Articles</Text>
        <TouchableOpacity>
          <Text style={[styles.seeAll, { fontSize: ms(12) }]}>See all</Text>
        </TouchableOpacity>
      </View>

      {/* Article Card */}
      <ImageBackground
        source={require("../../assets/images/article.jpg")}
        style={[styles.articleCard, { height: vs(180), borderRadius: scale(15) }]}
        imageStyle={{ borderRadius: scale(15) }}
      >
        <View style={styles.overlay}>
          <Text style={[styles.articleTitle, { fontSize: ms(19), maxWidth: scale(200) }]}>
            Looking for Specialist Doctors?
          </Text>
          <Text style={[styles.articleSubtitle, { fontSize: ms(12), maxWidth: scale(200) }]}>
            Schedule an appointment with our top doctors.
          </Text>

          {/* Dots Indicator */}
          <View style={styles.dotsContainer}>
            {[0, 1, 2, 3].map((_, idx) => (
              <View
                key={idx}
                style={[
                  styles.dot,
                  idx === 0 && styles.activeDot,
                  { width: idx === 0 ? scale(35) : scale(8), height: scale(8) },
                ]}
              />
            ))}
          </View>
        </View>
      </ImageBackground>

      {/* Join Community Section */}
      <Text style={[styles.joinTitle, { fontSize: ms(22), marginTop: vs(20) }]}>
        Join Community
      </Text>

      <Text style={[styles.joinSubtitle, { fontSize: ms(16), marginTop: vs(5) }]}>
        Join now to get all the information about the Health Industry! (#)
      </Text>

      <TouchableOpacity
        style={[
          styles.joinButton,
          {
            paddingVertical: vs(15),
            borderRadius: scale(30),
            marginTop: vs(15),
          },
        ]}
      >
        <Text style={[styles.joinButtonText, { fontSize: ms(16) }]}>Join Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerText: {
    fontWeight: "bold",
    color: "#1E293B",
  },
  seeAll: {
    color: "#7D8A95",
  },
  articleCard: {
    width: "100%",
    overflow: "hidden",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  articleTitle: {
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 12,
  },
  articleSubtitle: {
    color: "#FFFFFF",
    marginBottom: 25,
  },
  dotsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
  },
  dot: {
    borderRadius: 4,
    backgroundColor: "#DDD",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#FFFFFF",
  },
  joinTitle: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#0F172A",
    marginBottom: 8,
  },
  joinSubtitle: {
    textAlign: "center",
    color: "gray",
  },
  joinButton: {
    backgroundColor: "#0F172A",
    alignItems: "center",
  },
  joinButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

export default Articles;
