import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import BloodDonorList from "./BloodDonorList";
// import { useNavigation } from "expo-router";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size; // Base width is 375

const bloodGroups = ["A +ve", "A -ve", "B +ve", "B -ve", "O +ve", "O -ve"];

const bloodBanks = [
  {
    id: "1",
    name: "Grace Blood Bank",
    location: "Ganganagar, Bengaluru, Karnataka 560032",
    distance: "4.5 km/45min",
    image: require("../../../assets/images/WHO.jpg"),
  },
  {
    id: "2",
    name: "Grace Blood Bank",
    location: "Ganganagar, Bengaluru, Karnataka 560032",
    distance: "4.5 km/45min",
    image: require("../../../assets/images/WHO.jpg"),
  },
];

const BloodBankScreen = () => {
  const [selectBloodGroup, setSelectBloodGroup] = useState<string>("");
  const navigation = useNavigation();

  const handleBloodGroup = (grp: string) => {
    setSelectBloodGroup((prev) =>
      prev === "" ? grp : prev === grp ? "" : grp
    );
  };

  const ListHeader = () => (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          paddingVertical: scale(10),
          paddingLeft: scale(10),
          marginBottom: scale(10),
        }}
      >
        {bloodGroups.map((group, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleBloodGroup(group)}
            style={{
              backgroundColor:
                selectBloodGroup === group ? "#808080" : "#D3D3D3",
              borderRadius: scale(20),
              paddingHorizontal: scale(16),
              paddingVertical: scale(6),
              marginHorizontal: scale(6),
              borderWidth: scale(1),
              borderColor: "#808080",
              justifyContent: "center",
              alignItems: "center",
              height: scale(35),
            }}
          >
            <Text
              style={{
                color: selectBloodGroup === group ? "white" : "#0C3C5F",
                fontWeight: "bold",
                fontSize: scale(14),
              }}
            >
              {group}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F9FA" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: scale(16),
        }}
      >
        <Ionicons
          name="arrow-back"
          size={scale(24)}
          color="#0C3C5F"
          style={{ marginRight: scale(10) }}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{ color: "#0C3C5F", fontSize: scale(18), fontWeight: "bold" }}
        >
          Blood Bank
        </Text>
      </View>

      <View style={{ backgroundColor: "#0C3C5F", padding: scale(16) }}>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: scale(25),
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: scale(10),
            height: scale(40),
          }}
        >
          <FontAwesome
            name="search"
            size={scale(18)}
            color="gray"
            style={{ marginRight: scale(8) }}
          />
          <TextInput
            placeholder="Search Blood Center"
            style={{ flex: 1, fontSize: scale(16) }}
          />
        </View>
      </View>

      <View style={{ flex: 1 }}>
        {/* List Header always shown */}
        <ListHeader />

        {selectBloodGroup ? (
          <BloodDonorList bloodType={selectBloodGroup} />
        ) : (
          <FlatList
            data={bloodBanks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: scale(10),
                  marginHorizontal: scale(16),
                  marginBottom: scale(10),
                  paddingBottom: scale(10),
                  elevation: scale(3),
                }}
              >
                <Image
                  source={item.image}
                  style={{
                    width: "100%",
                    height: scale(150),
                    borderTopLeftRadius: scale(10),
                    borderTopRightRadius: scale(10),
                  }}
                />
                <View style={{ padding: scale(16) }}>
                  <Text style={{ fontSize: scale(16), fontWeight: "bold" }}>
                    {item.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: scale(4),
                    }}
                  >
                    <Ionicons name="location" size={scale(16)} color="gray" />
                    <Text style={{ marginLeft: scale(4), color: "gray" }}>
                      {item.location}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default BloodBankScreen;

