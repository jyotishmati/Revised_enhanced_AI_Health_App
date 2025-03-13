import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";

const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;

const App = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Articles</Text>
        <Text style={styles.seeAll}>See all</Text>
      </View>
      
      {/* Article Card */}
      <ImageBackground
        source={require("../../assets/images/article.jpg")}
        style={styles.articleCard}
        imageStyle={styles.articleImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.articleTitle}>
            Looking for Specialist Doctors?
          </Text>
          <Text style={styles.articleSubtitle}>
            Schedule an appointment with our top doctors.
          </Text>
          <View style={styles.dotsContainer}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
      </ImageBackground>

      {/* Join Community Section */}
      <Text style={styles.joinTitle}>Join Community</Text>
      
      {/* Underline */}
      <View style={styles.underline} />

      <Text style={styles.joinSubtitle}>
        Join now to get all the information about Health Industry! (#)
      </Text>
      <TouchableOpacity style={styles.joinButton}>
        <Text style={styles.joinButtonText}>Join Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: scale(18),
    marginTop: scale(-1),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: scale(15),
  },
  headerText: {
    fontSize: scale(18),
    fontWeight: "bold",
  },
  seeAll: {
    fontSize: scale(14),
    color: "#007AFF",
  },
  articleCard: {
    width: "100%",
    height: scale(180),
    borderRadius: scale(15),
    overflow: "hidden",
  },
  articleImage: {
    borderRadius: scale(15),
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingHorizontal: scale(15),
    paddingBottom: scale(15),
  },
  articleTitle: {
    color: "#fff",
    fontSize: scale(20),
    fontWeight: "bold",
    maxWidth: scale(200),
  },
  articleSubtitle: {
    color: "#fff",
    fontSize: scale(14),
    marginBottom: scale(45),
    maxWidth: scale(200),
  },
  dotsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: scale(10),
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: "#ddd",
    marginHorizontal: scale(4),
  },
  activeDot: {
    backgroundColor: "#fff",
    width: scale(35),
  },
  joinTitle: {
    fontSize: scale(22),
    fontWeight: "bold",
    textAlign: "center",
    marginTop: scale(20),
    color: "#0F172A",
  },
  underline: {
    width: "82%",
    height: scale(1),
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginVertical: scale(18),
  },
  joinSubtitle: {
    textAlign: "center",
    color: "gray",
    marginTop: scale(5),
    fontSize: scale(16),
  },
  joinButton: {
    backgroundColor: "#0F172A",
    padding: scale(15),
    borderRadius: scale(10),
    alignItems: "center",
    marginTop: scale(15),
  },
  joinButtonText: {
    color: "#fff",
    fontSize: scale(16),
    fontWeight: "bold",
  },
});

export default App;