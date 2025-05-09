import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Linking } from "react-native";
import { getMasterHealthAPI, uploadMasterHealth } from "@/api/masterHealthAPI";
import masterHealthRange from "@/components/Home Page/Master Health/masterHealthRange.json";
import masterHealthTextButton from "@/components/Home Page/Master Health/masterHeathTextButton.json";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";
import BloodTestTable from "./check_results";

function parseRange(rangeStr: string) {
  try {
    const parts = rangeStr.split("-");
    const minStr = parts[0].trim();
    const maxStr = parts[1].split(" ")[0];
    const minVal = parseFloat(minStr);
    const maxVal = parseFloat(maxStr);
    if (isNaN(minVal) || isNaN(maxVal)) return null;
    return { min: minVal, max: maxVal };
  } catch {
    return null;
  }
}

function parseValue(valueStr: string): number {
  const clean = valueStr.replace(/\*/g, "");
  return parseFloat(clean);
}

function getRatio(value: number, min: number, max: number): number {
  if (max <= min) return 0.5;
  if (value <= min) return 0;
  if (value >= max) return 1;
  return (value - min) / (max - min);
}

interface SubTestBarProps {
  range: string;
  valueText: string;
  color: string;
}

const SubTestBar: React.FC<SubTestBarProps> = ({ range, valueText, color }) => {
  const rangeObj = parseRange(range);
  const val = parseValue(valueText);
  let ratio = 0.5;
  if (rangeObj) {
    ratio = getRatio(val, rangeObj.min, rangeObj.max);
  }

  const fillWidth = `${(ratio * 100).toFixed(2)}%`;
  return (
    <View style={styles.subBarContainer}>
      <View style={styles.subBarBackground}>
        <View
          style={[
            styles.subBarFill,
            { width: fillWidth as any, backgroundColor: color },
          ]}
        />
      </View>
    </View>
  );
};

type TestData = {
  name: string;
  value: number;
};

type RangeData = {
  [key: string]: (string | number)[];
};

interface CategoryIndicatorProps {
  tests: TestData[];
  ranges: RangeData;
}
const CategoryIndicator: React.FC<CategoryIndicatorProps> = ({
  tests,
  ranges,
}) => {
  let sum = 0;
  let count = 0;

  tests.forEach((test) => {
    const range = ranges[test.name];
    if (range) {
      let [min, max] = range;
      let value: string | number = test.value;
      if (typeof value === "string") {
        value = parseFloat(value);
      }
      if (typeof min === "string") {
        min = parseFloat(min);
      }
      if (typeof max === "string") {
        max = parseFloat(max);
      }
      if (typeof value === "number" && !isNaN(value)) {
        const normalizedValue = Math.max(
          0,
          Math.min(100, ((value - min) / (max - min)) * 100)
        );
        sum += normalizedValue;
        count++;
      }
    }
  });
  if (count === 0) count = 1;
  const avg = sum / count;

  const ratio = Math.min(Math.max(avg / 100, 0), 1);
  const pointerLeft = `${(ratio * 100).toFixed(2)}%`;

  return (
    <View style={styles.categoryIndicatorContainer}>
      <LinearGradient
        colors={["red", "orange", "green"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.categoryIndicatorBar}
      >
        <View style={[styles.categoryPointer, { left: pointerLeft as any }]} />
      </LinearGradient>
      <View style={styles.categoryIndicatorLabels}>
        <Text style={styles.warningText}>Danger</Text>
        <Text style={styles.warningText}>Warning</Text>
        <Text style={styles.warningText}>Normal</Text>
      </View>
    </View>
  );
};

interface HealthPanelProps {
  categories?: string;
  parameters?: {
    [key: string]: number;
  };
}

const HealthPanel: React.FC<HealthPanelProps> = ({
  categories,
  parameters,
}) => {
  if (!parameters) {
    return;
  }
  if (Object.keys(parameters).length === 0) {
    return;
  }
  const tests: TestData[] = Object.entries(parameters).map(([key, value]) => ({
    name: key,
    value: value as number,
  }));

  return (
    <View style={styles.panel}>
      <View style={styles.panelHeader}>
        <Text style={styles.panelTitle}>{categories}</Text>
        <Feather name="download" size={18} color="#023047" />
      </View>

      <ScrollView
        style={styles.testContainer}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      >
        {/* {parameters&&Object.entries(parameters).forEach(([key, value]) => {
          <View key={index} style={styles.testBlock}>
            <View style={styles.testRow}>
              <Text style={styles.testName}>{key}</Text>

              <View style={styles.rangeValueContainer}>
                <Text style={styles.testRange}>{test.range}</Text>
                <Text style={styles.testValue}>{value}</Text>
              </View>
            </View>
            <SubTestBar
              range={test.range}
              valueText={test.value}
              color={test.color}
            />
          </View>
        }) */}
        {parameters &&
          Object.entries(parameters ?? {}).map(([key, value], index) => (
            <View key={index} style={styles.testBlock}>
              <View style={styles.testRow}>
                <Text style={styles.testName}>{key}</Text>

                <View style={styles.rangeValueContainer}>
                  <Text style={styles.testRange}>
                    {
                      masterHealthRange[
                        key as keyof typeof masterHealthRange
                      ]?.[0]
                    }{" "}
                    -{" "}
                    {
                      masterHealthRange[
                        key as keyof typeof masterHealthRange
                      ]?.[1]
                    }{" "}
                    {
                      masterHealthRange[
                        key as keyof typeof masterHealthRange
                      ]?.[2]
                    }
                  </Text>
                  <Text style={styles.testValue}>
                    {typeof value === "string" || typeof value === "number"
                      ? value
                      : JSON.stringify(value)}
                  </Text>
                </View>
              </View>
              <SubTestBar
                range={`${
                  masterHealthRange[key as keyof typeof masterHealthRange]?.[0]
                } - ${
                  masterHealthRange[key as keyof typeof masterHealthRange]?.[1]
                } ${
                  masterHealthRange[key as keyof typeof masterHealthRange]?.[2]
                }`}
                valueText={value.toString()}
                color={
                  typeof value === "number" &&
                  !isNaN(
                    Number(
                      masterHealthRange[
                        key as keyof typeof masterHealthRange
                      ]?.[0]
                    )
                  ) &&
                  !isNaN(
                    Number(
                      masterHealthRange[
                        key as keyof typeof masterHealthRange
                      ]?.[1]
                    )
                  ) &&
                  value >=
                    Number(
                      masterHealthRange[
                        key as keyof typeof masterHealthRange
                      ]?.[0]
                    ) &&
                  value <=
                    Number(
                      masterHealthRange[
                        key as keyof typeof masterHealthRange
                      ]?.[1]
                    )
                    ? "green"
                    : "red"
                }
              />
            </View>
          ))}
      </ScrollView>

      {/* Buttons */}
      <View style={styles.buttonGroup}>
        {masterHealthTextButton?.[
          categories as keyof typeof masterHealthTextButton
        ]?.map((text, idx) => {
          if (idx === 0) {
            return (
              <TouchableOpacity key={idx} style={[styles.btnWhite]}>
                <Text style={[styles.btnWhiteText]}>{text}</Text>
              </TouchableOpacity>
            );
          } else {
            return (
              <TouchableOpacity key={idx} style={[styles.btnNavy]}>
                <Text style={[styles.btnNavyText]}>{text}</Text>
              </TouchableOpacity>
            );
          }
        })}
      </View>

      <CategoryIndicator tests={tests} ranges={masterHealthRange} />
    </View>
  );
};

// 7) MAIN SCREEN
const MasterHealthVault: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [verifyResult, setVeifyResult] = useState<boolean>();
  const navigation = useNavigation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMasterHealthAPI();
        setData(result || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpload = async (
    file: {
      uri: string;
      name: string;
      type: string | null | undefined;
      size: number | null | undefined;
      buffer?: Uint8Array;
      blob: Blob;
    },
    fileType: "image" | "pdf"
  ) => {
    try {
      console.log("working in handle upload");

      const [success, acceptValue] = await uploadMasterHealth(file, fileType);
      if (success) {
        Alert.alert("Success", "File uploaded successfully!");
        setVeifyResult(true);
      } else {
        Alert.alert("Error", "File upload failed.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong.");
    }
  };

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*"],
        copyToCacheDirectory: Platform.OS !== "web",
      });

      if (result.canceled) return;
      const file = result.assets[0];
      if (!file) return;

      let fileBuffer: Uint8Array | undefined = undefined;
      let fileBlob: Blob;

      if (Platform.OS === "web") {
        const response = await fetch(file.uri);
        fileBlob = await response.blob();
      } else {
        // For React Native
        const fileContent = await FileSystem.readAsStringAsync(file.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        fileBuffer = new Uint8Array(Buffer.from(fileContent, "base64"));
        fileBlob = new Blob([fileBuffer], {
          type: file.mimeType || "application/octet-stream",
        });
      }

      handleUpload(
        {
          uri: file.uri,
          name: file.name,
          type: file.mimeType,
          size: file.size,
          buffer: fileBuffer,
          blob: fileBlob,
        },
        file.mimeType?.startsWith("image") ? "image" : "pdf"
      );
    } catch (error) {
      console.error("Error picking file:", error);
      Alert.alert("Error", "Failed to pick the file");
    }
  };

  const openCamera = async () => {
    try {
      // 1. Request camera permissions
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please enable camera access in settings to continue.",
          [
            { text: "OK" },
            {
              text: "Open Settings",
              onPress: () => Linking.openSettings(),
            },
          ]
        );
        return;
      }

      // 2. Launch camera
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3], // Standard aspect ratio
        quality: 0.8, // Balanced quality (0-1)
        base64: false, // We'll handle file reading separately
      });

      if (result.canceled || !result.assets?.[0]) return;
      const image = result.assets[0];
      const fileInfo = await FileSystem.getInfoAsync(image.uri);

      if (!fileInfo.exists) {
        throw new Error("File does not exist");
      }

      // Read file content (for gRPC)
      const fileContent = await FileSystem.readAsStringAsync(image.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const fileBuffer = Buffer.from(fileContent, "base64");
      const blob = new Blob([fileBuffer], { type: "image/jpeg" });

      // Prepare file data
      const fileData = {
        uri: image.uri,
        name: `photo_${Date.now()}.jpg`, // Generate filename
        type: "image/jpeg", // Default type
        size: fileInfo.size || 0,
        buffer: fileBuffer,
        blob: blob,
      };

      // 4. Handle upload
      handleUpload(fileData, "image");
    } catch (error) {
      console.error("Camera Error:", error);
      Alert.alert("Error", "Failed to capture image. Please try again.", [
        { text: "OK" },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FontAwesome name="arrow-left" size={20} color="black" onPress={() => navigation.goBack()}/>
        <Text style={styles.headerTitle}>Master Health Vault</Text>
        <View style={styles.iconGroup}>
          <TouchableOpacity onPress={openCamera}>
            <FontAwesome
              name="camera"
              size={20}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={pickFile}>
            <Feather name="upload" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Panels */}
      {verifyResult ? (
        <BloodTestTable />
      ) : (
        <ScrollView>
          {data.map((panel, index) => (
            <HealthPanel key={index} {...panel} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default MasterHealthVault;

const screenWidth = Dimensions.get("window").width;

const NAVY_BLUE = "#003366";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  iconGroup: {
    flexDirection: "row",
  },
  icon: {
    marginRight: 12,
  },

  // Panels
  panel: {
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 12,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    // Shadow for Android
    elevation: 2,
  },
  panelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginBottom: 8,
  },
  panelTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#023047",
  },

  // Scrollable test container
  testContainer: {
    maxHeight: 200, // can scroll if many sub-tests
    marginBottom: 10,
  },
  testBlock: {
    marginBottom: 16,
  },
  testRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // Container for range + value
  rangeValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  // TEXT STYLES
  testName: {
    fontSize: 14,
    fontWeight: "600",
    color: NAVY_BLUE,
    maxWidth: "50%", // so name doesn't overlap range
  },
  testRange: {
    fontSize: 12,
    color: NAVY_BLUE,
  },
  testValue: {
    fontSize: 14,
    fontWeight: "600",
    color: NAVY_BLUE,
  },

  // Single-color partial fill bar
  subBarContainer: {
    marginTop: 6,
  },
  subBarBackground: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#EAEAEA",
    overflow: "hidden",
  },
  subBarFill: {
    height: 6,
    borderRadius: 3,
  },

  // Buttons container
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },

  // FIRST BUTTON: White background, navy border, navy text
  btnWhite: {
    backgroundColor: "#FFFFFF",
    borderColor: NAVY_BLUE,
    borderWidth: 1,
    borderRadius: 24,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginHorizontal: 5,
  },
  btnWhiteText: {
    color: NAVY_BLUE,
    fontWeight: "bold",
  },

  // SECOND BUTTON: Navy background, white text
  btnNavy: {
    backgroundColor: NAVY_BLUE,
    borderRadius: 24,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginHorizontal: 5,
  },
  btnNavyText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  // Category Indicator
  categoryIndicatorContainer: {
    marginTop: 8,
  },
  categoryIndicatorBar: {
    height: 8,
    borderRadius: 4,
    width: "100%",
    position: "relative",
    overflow: "hidden",
  },
  categoryPointer: {
    position: "absolute",
    top: -5,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#023047",
  },
  categoryIndicatorLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  warningText: {
    fontSize: 12,
    color: "gray",
  },
});



