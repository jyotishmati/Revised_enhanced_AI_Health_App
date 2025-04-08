import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React from "react";
  import { MaterialIcons } from "@expo/vector-icons";
  import {
    NavigationProp,
    ParamListBase,
    useNavigation,
  } from "@react-navigation/native";
  
  const { width } = Dimensions.get("window");
  const scale = (size: number) => (width / 375) * size;
  
  type BackNavigationProps = {
    heading: string;
  };
  
  const BackNavigation = ({ heading }: BackNavigationProps) => {
    const navigation: NavigationProp<ParamListBase> = useNavigation();
  
    return (
      <View style={styles.navigation}>
        <TouchableOpacity
          style={{ padding: scale(5) }}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={scale(24)}
            color="#063247"
          />
        </TouchableOpacity>
        <Text style={{ fontSize: scale(14), color: "#063247" }}>{heading}</Text>
      </View>
    );
  };
  
  export default BackNavigation;
  
  const styles = StyleSheet.create({
    navigation: {
      backgroundColor: "#FAFAFA",
      paddingVertical: scale(19),
      paddingLeft: scale(24),
      flexDirection: "row",
      alignItems: "center",
      columnGap: scale(10),
    },
  });