// import React from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
// } from "react-native";
// import { FontAwesome, Feather } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";

// // 1) DATA INTERFACES
// interface TestData {
//   name: string;
//   range: string;
//   value: string;
//   color: string;
// }

// interface PanelData {
//   title: string;
//   tests: TestData[];
//   buttonText: string[];
// }

// // 2) SAMPLE DATA
// const data: PanelData[] = [
//   {
//     title: "Hemogram",
//     tests: [
//       { name: "Hemoglobin", range: "13.0 - 18.0 g/dl", value: "8.0*", color: "red" },
//       { name: "Hematocrit", range: "39.0 - 54.0 %", value: "26.8*", color: "red" },
//       { name: "Red Blood Cells", range: "4.2 - 6.5 Million/uL", value: "2.95*", color: "red" },
//       { name: "MCV", range: "75.0 - 95.0 fl", value: "90.9", color: "green" },
//       { name: "MCH", range: "26.0 - 32.0 pg", value: "27.2", color: "green" },
//     ],
//     buttonText: ["CBC", "Differential Count"],
//   },
//   {
//     title: "Electrolytes Panel",
//     tests: [
//       { name: "Sodium", range: "136.0 - 145.0 mEq/l", value: "110.0*", color: "red" },
//       { name: "Potassium", range: "3.5 - 5.0 mEq/l", value: "8.0*", color: "red" },
//       { name: "Chloride", range: "98 - 107 mEq/l", value: "99.0", color: "green" },
//       { name: "Bicarbonate", range: "22.0 - 28.0 mEq/l", value: "25.0", color: "green" },
//       { name: "Calcium", range: "8.6 - 10.2 mg/dl", value: "18.0*", color: "red" },
//       { name: "Magnesium", range: "1.8 - 2.3 mg/dl", value: "1.9", color: "green" },
//       { name: "RDW", range: "11.5 - 14.5 %", value: "16.5*", color: "red" },
//       { name: "TLC Count", range: "4.0 - 11.0 10^/mm^3", value: "16.65*", color: "red" },
//       { name: "Platelets", range: "140 - 440 10^/mm^3", value: "267", color: "green" },
//     ],
//     buttonText: ["Electrolytes"],
//   },
//   {
//     title: "Liver Panel",
//     tests: [
//       { name: "Bilirubin, Total", range: "0.3 - 1.2 mg/dl", value: "0.47*", color: "green" },
//       { name: "Bilirubin, Direct", range: "0 - 0.19 mg/dl", value: "0.10*", color: "green" },
//       { name: "Bilirubin, Indirect", range: "0 - 0.19 mg/dl", value: "0.37", color: "green" },
//       { name: "Alanine Aminotransferase", range: "0 - 35 U/l", value: "20.0", color: "green" },
//       { name: "Aspartate Aminotransferase", range: "0 - 34.99 U/l", value: "15.0", color: "green" },
//       { name: "Alkaline Phosphatase", range: "30 - 120 U/l", value: "90.0", color: "green" },
//     ],
//     buttonText: ["Liver Function"],
//   },
// ];

// // 3) UTILITY FUNCTIONS
// function parseRange(rangeStr: string) {
//   try {
//     const parts = rangeStr.split("-");
//     const minStr = parts[0].trim();
//     const maxStr = parts[1].split(" ")[0];
//     const minVal = parseFloat(minStr);
//     const maxVal = parseFloat(maxStr);
//     if (isNaN(minVal) || isNaN(maxVal)) return null;
//     return { min: minVal, max: maxVal };
//   } catch {
//     return null;
//   }
// }

// function parseValue(valueStr: string): number {
//   const clean = valueStr.replace(/\*/g, "");
//   return parseFloat(clean);
// }

// /** Returns a 0..1 ratio if within range, 0 if below range, 1 if above range. */
// function getRatio(value: number, min: number, max: number): number {
//   if (max <= min) return 0.5;
//   if (value <= min) return 0;
//   if (value >= max) return 1;
//   return (value - min) / (max - min);
// }

// // 4) SINGLE-COLOR PARTIAL FILL BAR (SUB-TEST)
// interface SubTestBarProps {
//   range: string;
//   valueText: string;
//   color: string;
// }

// const SubTestBar: React.FC<SubTestBarProps> = ({ range, valueText, color }) => {
//   const rangeObj = parseRange(range);
//   const val = parseValue(valueText);
//   let ratio = 0.5;
//   if (rangeObj) {
//     ratio = getRatio(val, rangeObj.min, rangeObj.max);
//   }

//   const fillWidth = `${(ratio * 100).toFixed(2)}%`;
//   return (
//     <View style={styles.subBarContainer}>
//       <View style={styles.subBarBackground}>
//         <View
//           style={[
//             styles.subBarFill,
//             { width: fillWidth as any, backgroundColor: color },
//           ]}
//         />
//       </View>
//     </View>
//   );
// };

// // 5) CATEGORY-LEVEL INDICATOR (DANGER → WARNING → NORMAL)
// interface CategoryIndicatorProps {
//   tests: TestData[];
// }

// const CategoryIndicator: React.FC<CategoryIndicatorProps> = ({ tests }) => {
//   // example logic: average all numeric values
//   let sum = 0;
//   let count = 0;
//   tests.forEach((t) => {
//     const val = parseValue(t.value);
//     if (!isNaN(val)) {
//       sum += val;
//       count++;
//     }
//   });
//   if (count === 0) count = 1;
//   const avg = sum / count;
//   // assume 0-100 range
//   const ratio = Math.min(Math.max(avg / 100, 0), 1);
//   const pointerLeft = `${(ratio * 100).toFixed(2)}%`;

//   return (
//     <View style={styles.categoryIndicatorContainer}>
//       <LinearGradient
//         colors={["red", "orange", "green"]}
//         start={{ x: 0, y: 0.5 }}
//         end={{ x: 1, y: 0.5 }}
//         style={styles.categoryIndicatorBar}
//       >
//         <View style={[styles.categoryPointer, { left: pointerLeft as any }]} />
//       </LinearGradient>
//       <View style={styles.categoryIndicatorLabels}>
//         <Text style={styles.warningText}>Danger</Text>
//         <Text style={styles.warningText}>Warning</Text>
//         <Text style={styles.warningText}>Normal</Text>
//       </View>
//     </View>
//   );
// };

// // 6) PANEL COMPONENT
// interface HealthPanelProps {
//   title: string;
//   tests: TestData[];
//   buttonText: string[];
// }

// const HealthPanel: React.FC<HealthPanelProps> = ({ title, tests, buttonText }) => {
//   return (
//     <View style={styles.panel}>
//       {/* Header */}
//       <View style={styles.panelHeader}>
//         <Text style={styles.panelTitle}>{title}</Text>
//         <Feather name="download" size={18} color="#023047" />
//       </View>

//       {/* Scrollable sub-tests */}
//       <ScrollView
//         style={styles.testContainer}
//         nestedScrollEnabled
//         showsVerticalScrollIndicator={false}
//       >
//         {tests.map((test, index) => (
//           <View key={index} style={styles.testBlock}>
//             {/* Row: test name on left, range & value on right (side by side) */}
//             <View style={styles.testRow}>
//               <Text style={styles.testName}>{test.name}</Text>

//               {/* Container for range + value in a row */}
//               <View style={styles.rangeValueContainer}>
//                 <Text style={styles.testRange}>{test.range}</Text>
//                 <Text style={styles.testValue}>{test.value}</Text>
//               </View>
//             </View>

//             {/* Single-color partial fill bar */}
//             <SubTestBar
//               range={test.range}
//               valueText={test.value}
//               color={test.color}
//             />
//           </View>
//         ))}
//       </ScrollView>

//       {/* Buttons */}
//       <View style={styles.buttonGroup}>
//         {buttonText.map((text, idx) => (
//           <TouchableOpacity key={idx} style={styles.button}>
//             <Text style={styles.buttonText}>{text}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Category-level indicator */}
//       <CategoryIndicator tests={tests} />
//     </View>
//   );
// };

// // 7) MAIN SCREEN
// const MasterHealthVault: React.FC = () => {
//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <FontAwesome name="arrow-left" size={20} color="black" />
//         <Text style={styles.headerTitle}>Master Health Vault</Text>
//         <View style={styles.iconGroup}>
//           <FontAwesome name="camera" size={20} color="black" style={styles.icon} />
//           <Feather name="upload" size={20} color="black" />
//         </View>
//       </View>

//       {/* Panels */}
//       <ScrollView>
//         {data.map((panel, index) => (
//           <HealthPanel key={index} {...panel} />
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// export default MasterHealthVault;

// // 8) STYLES
// const screenWidth = Dimensions.get("window").width;

// const NAVY_BLUE = "#003366";

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F6F6F6",
//   },

//   // Header
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     backgroundColor: "white",
//     justifyContent: "space-between",
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   iconGroup: {
//     flexDirection: "row",
//   },
//   icon: {
//     marginRight: 12,
//   },

//   // Panels
//   panel: {
//     backgroundColor: "white",
//     borderRadius: 10,
//     marginHorizontal: 10,
//     marginVertical: 10,
//     padding: 12,
//     // Shadow for iOS
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     // Shadow for Android
//     elevation: 2,
//   },
//   panelHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingBottom: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E0E0E0",
//     marginBottom: 8,
//   },
//   panelTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#023047",
//   },

//   // Scrollable test container
//   testContainer: {
//     maxHeight: 200, // can scroll if many sub-tests
//     marginBottom: 10,
//   },
//   testBlock: {
//     marginBottom: 16,
//   },
//   testRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   // Container for range + value
//   rangeValueContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     // Gap between range and value
//     // If your RN version doesn't support "gap", use marginRight on range or marginLeft on value
//     gap: 8, 
//   },

//   // TEXT STYLES
//   testName: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: NAVY_BLUE,
//     maxWidth: "50%", // so name doesn't overlap range
//   },
//   testRange: {
//     fontSize: 12,
//     color: NAVY_BLUE,
//   },
//   testValue: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: NAVY_BLUE,
//   },

//   // Single-color partial fill bar
//   subBarContainer: {
//     marginTop: 6,
//   },
//   subBarBackground: {
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: "#EAEAEA",
//     overflow: "hidden",
//   },
//   subBarFill: {
//     height: 6,
//     borderRadius: 3,
//   },

//   // Buttons
//   buttonGroup: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginVertical: 10,
//   },
//   button: {
//     backgroundColor: "#023047",
//     paddingVertical: 6,
//     paddingHorizontal: 16,
//     borderRadius: 12,
//     marginHorizontal: 5,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 14,
//     fontWeight: "bold",
//   },

//   // Category Indicator
//   categoryIndicatorContainer: {
//     marginTop: 8,
//   },
//   categoryIndicatorBar: {
//     height: 8,
//     borderRadius: 4,
//     width: "100%",
//     position: "relative",
//     overflow: "hidden",
//   },
//   categoryPointer: {
//     position: "absolute",
//     top: -5,
//     width: 18,
//     height: 18,
//     borderRadius: 9,
//     backgroundColor: "#fff",
//     borderWidth: 2,
//     borderColor: "#023047",
//   },
//   categoryIndicatorLabels: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 4,
//   },
//   warningText: {
//     fontSize: 12,
//     color: "gray",
//   },
// });



import React from "react";
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

// 1) DATA INTERFACES
interface TestData {
  name: string;
  range: string;
  value: string;
  color: string;
}

interface PanelData {
  title: string;
  tests: TestData[];
  buttonText: string[]; // e.g. ["CBC", "Differential Count"]
}

// 2) SAMPLE DATA
const data: PanelData[] = [
  {
    title: "Hemogram",
    tests: [
      { name: "Hemoglobin", range: "13.0 - 18.0 g/dl", value: "8.0*", color: "red" },
      { name: "Hematocrit", range: "39.0 - 54.0 %", value: "26.8*", color: "red" },
      { name: "Red Blood Cells", range: "4.2 - 6.5 Million/uL", value: "2.95*", color: "red" },
      { name: "MCV", range: "75.0 - 95.0 fl", value: "90.9", color: "green" },
      { name: "MCH", range: "26.0 - 32.0 pg", value: "27.2", color: "green" },
      { name: "MCHC", range: "31.0 - 36.0 g/dl", value: "29.9*", color: "red" },
      { name: "RDW", range: "11.5 - 14.5 %", value: "16.5*", color: "green" },
      { name: "TLC Count", range: "4.0 - 11.0 10^3/mm^3", value: "16.65*", color: "green" },
      { name: "Platelets", range: "140.0 - 440.0 10^3/mm^3", value: "267", color: "green" },
    ],
    buttonText: ["CBC", "Differential Count"],
  },
  {
    title: "Electrolytes Panel",
    tests: [
      { name: "Sodium", range: "136.0 - 145.0 mEq/l", value: "110.0*", color: "red" },
      { name: "Potassium", range: "3.5 - 5.0 mEq/l", value: "8.0*", color: "red" },
      { name: "Chloride", range: "98 - 107 mEq/l", value: "99.0", color: "green" },
      { name: "Bicarbonate", range: "22.0 - 28.0 mEq/l", value: "25.0", color: "green" },
      { name: "Calcium", range: "8.6 - 10.2 mg/dl", value: "18.0*", color: "red" },
      { name: "Magnesium", range: "1.8 - 2.3 mg/dl", value: "1.9", color: "green" },
      { name: "RDW", range: "11.5 - 14.5 %", value: "16.5*", color: "red" },
      { name: "TLC Count", range: "4.0 - 11.0 10^/mm^3", value: "16.65*", color: "red" },
      { name: "Platelets", range: "140 - 440 10^/mm^3", value: "267", color: "green" },
    ],
    buttonText: ["Electrolytes"],
  },
  {
    title: "Liver Panel",
    tests: [
      { name: "Bilirubin, Total", range: "0.3 - 1.2 mg/dl", value: "0.47*", color: "green" },
      { name: "Bilirubin, Direct", range: "0 - 0.19 mg/dl", value: "0.10*", color: "green" },
      { name: "Bilirubin, Indirect", range: "0 - 0.19 mg/dl", value: "0.37", color: "green" },
      { name: "Alanine Aminotransferase", range: "0 - 35 U/l", value: "20.0", color: "green" },
      { name: "Aspartate Aminotransferase", range: "0 - 34.99 U/l", value: "15.0", color: "green" },
      { name: "Alkaline Phosphatase", range: "30 - 120 U/l", value: "90.0", color: "green" },
      { name: "Protien", range: "6.6 - 8.3 g/dl", value: "7.50", color: "green" },
      { name: "Albumin", range: "3.5 - 5.2 g/dl", value: "4.50", color: "green" },
      { name: "A/G Ration", range: "0.9 - 2", value: "1.5", color: "green" },
    ],
    buttonText: ["Liver Function"],
  },
  {
    title: "Diabetes Panel",
    tests: [

    ],
    buttonText: ["Diabetes"],
  },
  {
    title: "Thyroid Panel",
    tests: [
      
    ],
    buttonText: ["Thyroid Panel"],
  },
  {
    title: "Lipid Panel",
    tests: [
      
    ],
    buttonText: ["Lipid Panel"],
  },
];

// 3) UTILITY FUNCTIONS
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

/** Returns a 0..1 ratio if within range, 0 if below range, 1 if above range. */
function getRatio(value: number, min: number, max: number): number {
  if (max <= min) return 0.5;
  if (value <= min) return 0;
  if (value >= max) return 1;
  return (value - min) / (max - min);
}

// 4) SINGLE-COLOR PARTIAL FILL BAR (SUB-TEST)
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

// 5) CATEGORY-LEVEL INDICATOR (DANGER → WARNING → NORMAL)
interface CategoryIndicatorProps {
  tests: TestData[];
}

const CategoryIndicator: React.FC<CategoryIndicatorProps> = ({ tests }) => {
  // example logic: average all numeric values
  let sum = 0;
  let count = 0;
  tests.forEach((t) => {
    const val = parseValue(t.value);
    if (!isNaN(val)) {
      sum += val;
      count++;
    }
  });
  if (count === 0) count = 1;
  const avg = sum / count;
  // assume 0-100 range
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

// 6) PANEL COMPONENT
interface HealthPanelProps {
  title: string;
  tests: TestData[];
  buttonText: string[];
}

const HealthPanel: React.FC<HealthPanelProps> = ({ title, tests, buttonText }) => {
  return (
    <View style={styles.panel}>
      {/* Header */}
      <View style={styles.panelHeader}>
        <Text style={styles.panelTitle}>{title}</Text>
        <Feather name="download" size={18} color="#023047" />
      </View>

      {/* Scrollable sub-tests */}
      <ScrollView
        style={styles.testContainer}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      >
        {tests.map((test, index) => (
          <View key={index} style={styles.testBlock}>
            {/* Row: test name on left, range & value on right (side by side) */}
            <View style={styles.testRow}>
              <Text style={styles.testName}>{test.name}</Text>

              {/* Container for range + value in a row */}
              <View style={styles.rangeValueContainer}>
                <Text style={styles.testRange}>{test.range}</Text>
                <Text style={styles.testValue}>{test.value}</Text>
              </View>
            </View>

            {/* Single-color partial fill bar */}
            <SubTestBar
              range={test.range}
              valueText={test.value}
              color={test.color}
            />
          </View>
        ))}
      </ScrollView>

      {/* Buttons */}
      <View style={styles.buttonGroup}>
        {buttonText.map((text, idx) => {
          // We'll style the first button differently from the second.
          // If you have more than two, you'll need a custom logic for each
          // or a toggle approach for "active" vs. "inactive".
          if (idx === 0) {
            // FIRST BUTTON (white background, navy text)
            return (
              <TouchableOpacity key={idx} style={[styles.btnWhite]}>
                <Text style={[styles.btnWhiteText]}>{text}</Text>
              </TouchableOpacity>
            );
          } else {
            // SECOND BUTTON (navy background, white text)
            return (
              <TouchableOpacity key={idx} style={[styles.btnNavy]}>
                <Text style={[styles.btnNavyText]}>{text}</Text>
              </TouchableOpacity>
            );
          }
        })}
      </View>

      {/* Category-level indicator */}
      <CategoryIndicator tests={tests} />
    </View>
  );
};

// 7) MAIN SCREEN
const MasterHealthVault: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FontAwesome name="arrow-left" size={20} color="black" />
        <Text style={styles.headerTitle}>Master Health Vault</Text>
        <View style={styles.iconGroup}>
          <FontAwesome name="camera" size={20} color="black" style={styles.icon} />
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

// 8) STYLES
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