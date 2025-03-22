import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { getAddressFromCoordinates } from "@/api/other";

interface Donor {
  userName: string;
  userId: string;
  coordinates: [number, number];
  phno: number;
}

const BloodDonorList = ({ bloodType }: { bloodType: string }) => {
  const [nearestDonorLocation, setNearestDonorLocation] =
    useState<string>("Loading...");

  const nearestDonor: Donor = {
    userName: "Ravi Kumar H",
    userId: "1",
    coordinates: [12.9716, 77.5946],
    phno: 9876543210,
  };

  const topDonors: Donor[] = [
    {
      userName: "Aditi Sharma",
      userId: "2",
      coordinates: [28.7041, 77.1025],
      phno: 9876543211,
    },
    {
      userName: "Arjun Mehta",
      userId: "3",
      coordinates: [19.076, 72.8777],
      phno: 9876543212,
    },
    {
      userName: "Kavya Iyer",
      userId: "4",
      coordinates: [13.0827, 80.2707],
      phno: 9876543213,
    },
    {
      userName: "Rohan Kapoor",
      userId: "5",
      coordinates: [22.5726, 88.3639],
      phno: 9876543214,
    },
  ];

  useEffect(() => {
    console.log("Selected Blood Type:", bloodType);
  }, [bloodType]);
  useEffect(() => {
    const fetchLocation = async () => {
      const address = await getAddressFromCoordinates(
        nearestDonor.coordinates[0],
        nearestDonor.coordinates[1]
      );
      setNearestDonorLocation(address);
    };

    fetchLocation();
  }, []);
  return (
    <View style={{ padding: 16 }}>
      <View
        style={{
          backgroundColor: "#04364A",
          padding: 16,
          borderRadius: 10,
          marginBottom: 16,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
          {nearestDonor.userName}
        </Text>
        <Text style={{ color: "#ddd", fontSize: 14 }}>
          {nearestDonorLocation}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 8,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>{bloodType}</Text>
          <Text style={{ color: "#ddd", fontSize: 12 }}>
            Last Active: 5 min ago
          </Text>
        </View>
      </View>

      <FlatList
        data={topDonors}
        keyExtractor={(item) => item.userId}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: "#ddd",
            }}
          >
            <Text style={{ fontSize: 16 }}>{item.userName}</Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity>
                <Ionicons
                  name="information-circle-outline"
                  size={24}
                  color="#04364A"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name="phone" size={24} color="#04364A" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default BloodDonorList;
