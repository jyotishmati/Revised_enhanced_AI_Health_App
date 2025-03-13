import React from "react";
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
  // Define the header that includes Blood Groups and the User Info Card
  const ListHeader = () => (
    <View>
      {/* Blood Groups (Horizontal) */}
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
            style={{
              backgroundColor: "white",
              borderRadius: scale(20),
              paddingHorizontal: scale(16),
              paddingVertical: scale(6),
              marginHorizontal: scale(6),
              borderWidth: scale(1),
              borderColor: "#0C3C5F",
              justifyContent: "center",
              alignItems: "center",
              height: scale(35),
            }}
          >
            <Text
              style={{
                color: "#0C3C5F",
                fontWeight: "bold",
                fontSize: scale(14),
              }}
            >
              {group}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* User Info Card */}
      <View
        style={{
          backgroundColor: "#0C3C5F",
          marginHorizontal: scale(16),
          borderRadius: scale(10),
          padding: scale(16),
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: scale(10),
        }}
      >
        <View>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: scale(16) }}>
            Ravi Kumar H
          </Text>
          <Text style={{ color: "white", fontSize: scale(14) }}>
            Jayanagar, Bengaluru, India
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: scale(16),
              marginRight: scale(6),
            }}
          >
            B +ve
          </Text>
          <Ionicons name="water" size={scale(20)} color="white" />
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F9FA" }}>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", padding: scale(16) }}>
        <Ionicons
          name="arrow-back"
          size={scale(24)}
          color="#0C3C5F"
          style={{ marginRight: scale(10) }}
        />
        <Text style={{ color: "#0C3C5F", fontSize: scale(18), fontWeight: "bold" }}>
          Blood Bank
        </Text>
      </View>

      {/* Search Bar */}
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

      {/* FlatList with Header */}
      <FlatList
        data={bloodBanks}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
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
              {/* Horizontal Line */}
              <View
                style={{
                  height: scale(1),
                  backgroundColor: "#E0E0E0",
                  marginVertical: scale(8),
                }}
              />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="navigate" size={scale(16)} color="gray" />
                <Text style={{ marginLeft: scale(4), color: "gray" }}>
                  {item.distance}
                </Text>
                <Ionicons
                  name="medkit"
                  size={scale(16)}
                  color="gray"
                  style={{ marginLeft: scale(10) }}
                />
                <Text style={{ marginLeft: scale(4), color: "gray" }}>Hospital</Text>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={
          <View
            style={{
              width: "100%",
              height: scale(40),
              backgroundColor: "#D1D5DB",
              alignItems: "center",
              justifyContent: "center",
              marginTop: scale(10),
            }}
          >
            <View
              style={{
                width: scale(150),
                height: scale(5),
                backgroundColor: "#6B7280",
                borderRadius: scale(10),
              }}
            />
          </View>
        }
      />
    </View>
  );
};

export default BloodBankScreen;