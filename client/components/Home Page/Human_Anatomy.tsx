import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useResponsive } from "../../hooks/useresponsive";

const HumanAnatomy = () => {
  const { scale, ms, vs, isTablet } = useResponsive();

  return (
    <View style={[styles.container, { paddingHorizontal: scale(20), paddingTop: vs(8) }]}>
      <Text style={[styles.title, { fontSize: ms(22) }]}>AI Agent</Text>
      <View style={[styles.imageWrapper, { height: isTablet ? vs(400) : vs(300), marginBottom: vs(25) }]}>
        <Image
          source={require("../../assets/images/human_updated.png")}
          style={styles.humanImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  title: {
    fontWeight: "bold",
    color: "#0F172A",
    textAlign: "left",
    marginBottom: 0,
  },
  imageWrapper: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  humanImage: {
    width: "100%",
    height: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default HumanAnatomy;
