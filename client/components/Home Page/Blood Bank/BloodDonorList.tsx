import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { getAddressFromCoordinates } from "@/api/other";
import { getNearestDonor, IBloodType } from "@/api/bloodBankAPI";

interface Donor {
  userName: string;
  userId: string;
  coordinates: [number, number];
  phno: string;
}

const BloodDonorList = ({ bloodType }: { bloodType: IBloodType }) => {
  const [nearestDonorLocation, setNearestDonorLocation] =
    useState<string>("Loading...");

  const [nearestDonor, setNearestDonor] = useState<Donor>();
  const [topDonors, setTopDonors] = useState<Donor[]>();

  useEffect(() => {
    const getDonorList = async () => {
      const donorList = await getNearestDonor(bloodType);
      if (donorList) {
        setNearestDonor(donorList.nearestDonor);
        setTopDonors(donorList.topDonors);
      }
    };

    getDonorList();
  }, [bloodType]);

  useEffect(() => {
    console.log("Selected Blood Type:", bloodType);
  }, [bloodType]);
  useEffect(() => {
    const fetchLocation = async () => {
      if (nearestDonor) {
        const address = await getAddressFromCoordinates(
          nearestDonor.coordinates[0],
          nearestDonor.coordinates[1]
        );
        setNearestDonorLocation(address);
      }
    };

    fetchLocation();
  }, [nearestDonor]);

  return (
    <View style={{ padding: 16 }}>
      {nearestDonor ? (
        <View
          style={{
            backgroundColor: "#04364A",
            padding: 16,
            borderRadius: 10,
            marginBottom: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 8,
            }}
          >
            <View>
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
                {nearestDonor.userName}
              </Text>
              <Text style={{ color: "#ddd", fontSize: 14 }}>
                {nearestDonorLocation}
              </Text>
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <TouchableOpacity>
                  <Ionicons
                    name="information-circle-outline"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <FontAwesome name="phone" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 8,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>
              {bloodType.bloodType}
            </Text>
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "#333",
          }}
        >
          <Text style={{ color: "grey", fontSize: 16, fontWeight: "bold" }}>
            No Nearest Donor
          </Text>
        </View>
      )}

      {topDonors ? (
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
      ) : (
        <View>
          <Text></Text>
        </View>
      )}
    </View>
  );
};

export default BloodDonorList;
