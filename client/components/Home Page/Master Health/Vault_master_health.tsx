import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { getMasterHealthAPI } from "@/api/masterHealthAPI";
import masterHealthRange from "@/components/Home Page/Master Health/masterHealthRange.json";
import masterHealthTextButton from "@/components/Home Page/Master Health/masterHeathTextButton.json";

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
  console.log(parameters);
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
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FontAwesome name="arrow-left" size={20} color="black" />
        <Text style={styles.headerTitle}>Master Health Vault</Text>
        <View style={styles.iconGroup}>
          <FontAwesome
            name="camera"
            size={20}
            color="black"
            style={styles.icon}
          />
          <Feather name="upload" size={20} color="black" />
        </View>
      </View>

      {/* Panels */}
      <ScrollView>
        {data.map((panel, index) => (
          <HealthPanel key={index} {...panel} />
        ))}
      </ScrollView>
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
