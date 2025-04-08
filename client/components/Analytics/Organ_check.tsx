import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    StyleSheet,
    Platform,
    SafeAreaView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Using expo icons
import { useNavigation } from "@react-navigation/native";
import Gold_bar from "../Home Page/Gold_bar";


// Assume your images are in this path - adjust if necessary
// Using placeholders - replace with your actual image paths
const organImagePaths = {
    heart: require("../../assets/images/heart.png"), // Example path
    brain: require("../../assets/images/brain.png"), // Example path
    lungs: require("../../assets/images/heart.png"), // Example placeholder path
};

// --- TYPE DEFINITIONS ---
type OrganName = keyof typeof organImagePaths;

interface Organ {
    name: OrganName;
    label: string;
}

// Data for Heart Functional Parts Chart
interface HeartPartData {
    name: string;
    currentValue: number;
    warningValue: number;
}
const heartPartsData: HeartPartData[] = [
    { name: "Right Atrium", currentValue: 60, warningValue: 20 },
    { name: "Left Atrium", currentValue: 45, warningValue: 30 },
    { name: "Right Ventricle", currentValue: 30, warningValue: 35 },
    { name: "Left Ventricle", currentValue: 62, warningValue: 18 },
    { name: "Superior Vena Cava", currentValue: 40, warningValue: 32 },
    { name: "Aorta", currentValue: 25, warningValue: 38 }, // Corrected typo
    { name: "Pulmonary Artery", currentValue: 58, warningValue: 25 },
    { name: "Inferior Vena Cava", currentValue: 38, warningValue: 28 },
];

// Data for Medications
interface Medication {
    id: string;
    name: string;
    taken: boolean | null; // null = pending, true = taken, false = skipped
}
const medicationsData: Medication[] = [
    { id: "1", name: "Vitamin B12", taken: true },
    { id: "2", name: "Aspirin", taken: true },
    { id: "3", name: "Citicoline", taken: true },
    { id: "4", name: "Lisinopril", taken: null },
    { id: "5", name: "Metformin", taken: false },
];

// Data for Heart Activity Chart
interface HeartActivityData {
    date: string;
    heartRate: number; // Value 0-100 for bar height %
    glucose: number;   // Value 0-100 for bar height %
    bloodCount: number; // Value 0-100 for bar height %
}
const heartActivityData: HeartActivityData[] = [
    { date: "Today", heartRate: 60, glucose: 80, bloodCount: 90 },
    { date: "24 Dec", heartRate: 75, glucose: 95, bloodCount: 70 },
    { date: "23 Dec", heartRate: 70, glucose: 85, bloodCount: 40 },
    { date: "22 Dec", heartRate: 65, glucose: 80, bloodCount: 65 },
];

// --- CONSTANTS ---
const CARD_PADDING = 20;
const PRIMARY_DARK_BLUE = "#0D2F3F";
const SECONDARY_BACKGROUND = "#F8FAFC";
const CARD_BACKGROUND = "#FFFFFF";
const BORDER_COLOR_LIGHT = "#E2E8F0";
const TEXT_COLOR_DARK = "#1E293B";
const TEXT_COLOR_MEDIUM = "#64748B";
const TEXT_COLOR_LIGHT = "#94A3B8";
const ACCENT_BLUE = "#2563EB";
const ICON_GRAY = "#CBD5E1";

const FUNCTIONAL_CHART_COLORS = {
    current: "#05CD99",
    warning: "#FF9040",
    background: "#F1F5F9",
    title: "#0F172A",
    label: TEXT_COLOR_MEDIUM,
    axisLabel: TEXT_COLOR_LIGHT,
    cardBackground: CARD_BACKGROUND,
};

const ACTIVITY_CHART_COLORS = {
    heartRate: "#FFA726", // Orange
    glucose: "#6C63FF",   // Purple
    bloodCount: "#26C6DA", // Cyan/Blue
    axisLabel: TEXT_COLOR_LIGHT,
    title: TEXT_COLOR_DARK,
    subtitle: TEXT_COLOR_MEDIUM,
    status: TEXT_COLOR_DARK,
};
// --- END CONSTANTS ---


const OrganHealthScreen = () => {
    const navigation = useNavigation();
    const [selectedOrgan, setSelectedOrgan] = useState<OrganName>("heart");

    const organs: Organ[] = [
        { name: "heart", label: "Heart" },
        { name: "brain", label: "Brain" },
        { name: "lungs", label: "Lungs" },
    ];

    const screenWidth = Dimensions.get("window").width;

    // --- Helper: Functional Parts Chart Row ---
    const FunctionalChartRow = ({ data }: { data: HeartPartData }) => (
      <View style={styles.functionalChartRow}>
        <Text style={styles.functionalPartLabel}>{data.name}</Text>
        <View style={styles.functionalBarContainer}>
          <View style={styles.functionalBarBackground} />
          <View style={styles.functionalBarSegmentsContainer}>
            <View
              style={[
                styles.functionalBarSegmentBase, { backgroundColor: FUNCTIONAL_CHART_COLORS.current },
                { width: `${data.currentValue}%` },
                styles.functionalBarSegmentLeftRadius,
                data.warningValue === 0 ? styles.functionalBarSegmentRightRadius : {},
              ]}
            />
            {data.warningValue > 0 && (
              <View
                style={[
                  styles.functionalBarSegmentBase, { backgroundColor: FUNCTIONAL_CHART_COLORS.warning },
                  { width: `${data.warningValue}%` },
                  styles.functionalBarSegmentRightRadius,
                ]}
              />
            )}
          </View>
        </View>
      </View>
    );
    // --- End Helper ---


    return (
        <SafeAreaView style={styles.safeArea}>
      <view>
        <Gold_bar />
      </view>
        <ScrollView
            style={styles.mainScrollView}
            contentContainerStyle={styles.mainScrollViewContent}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color={TEXT_COLOR_DARK} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Organ Health</Text>
            </View>

            {/* Organ Selection */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.organScrollViewContent}
                style={styles.organScrollView}
            >
                {organs.map((organ) => (
                    <TouchableOpacity
                        key={organ.name}
                        style={[
                            styles.organCard,
                            {
                                width: screenWidth * 0.38,
                                height: 160,
                                opacity: selectedOrgan === organ.name ? 1 : 0.7,
                            },
                        ]}
                        onPress={() => setSelectedOrgan(organ.name)}
                        activeOpacity={0.8}
                    >
                        <Image
                            source={organImagePaths[organ.name]}
                            style={styles.organCardImage}
                        />
                        <View style={styles.organCardLabelContainer}>
                            <Text style={styles.organCardLabelText}>{organ.label}</Text>
                            <AntDesign name="pluscircle" size={16} color={ACCENT_BLUE} />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Display Selected Organ Image */}
            {selectedOrgan && (
                <View style={styles.selectedOrganContainer}>
                    <Image
                        source={organImagePaths[selectedOrgan]}
                        style={styles.selectedOrganImage}
                    />
                </View>
            )}

            {/* --- Heart Functional Parts Chart (Conditional) --- */}
            {selectedOrgan === "heart" && (
                <View style={styles.contentCard}>
                    <Text style={styles.functionalChartTitle}>Heart Functional Parts</Text>
                    {/* Legend */}
                    <View style={styles.functionalLegendContainer}>
                         <View style={styles.functionalLegendItem}>
                           <View style={[styles.functionalLegendColorBox, { backgroundColor: FUNCTIONAL_CHART_COLORS.current }]} />
                           <Text style={styles.functionalLegendText}>Current</Text>
                         </View>
                         <View style={styles.functionalLegendItem}>
                           <View style={[styles.functionalLegendColorBox, { backgroundColor: FUNCTIONAL_CHART_COLORS.warning }]} />
                           <Text style={styles.functionalLegendText}>Warning</Text>
                         </View>
                    </View>
                    {/* Chart Rows */}
                    <View style={styles.functionalChartRowsContainer}>
                        {heartPartsData.map((part) => (
                            <FunctionalChartRow key={part.name} data={part} />
                        ))}
                    </View>
                    {/* X-Axis Labels */}
                    <View style={styles.functionalXAxisContainer}>
                         {[20, 40, 60, 80].map(val => (
                            <View key={val} style={[styles.functionalGridLine, { left: `${val}%` }]}/>
                         ))}
                        <Text style={styles.functionalXAxisLabel}>0</Text>
                        <Text style={styles.functionalXAxisLabel}>20</Text>
                        <Text style={styles.functionalXAxisLabel}>40</Text>
                        <Text style={styles.functionalXAxisLabel}>60</Text>
                        <Text style={styles.functionalXAxisLabel}>80</Text>
                        <Text style={styles.functionalXAxisLabel}>100</Text>
                    </View>
                </View>
            )}
            {/* --- End Heart Functional Parts Chart --- */}


            {/* --- Medications Card --- */}
            <View style={styles.medicationCard}>
                {/* Header */}
                <View style={styles.medsHeaderFooter}>
                    <Text style={styles.medsCardTitle}>Medications</Text>
                    <TouchableOpacity style={styles.medsAddButton}>
                        <AntDesign name="plus" size={20} color={PRIMARY_DARK_BLUE} />
                    </TouchableOpacity>
                </View>

                {/* Content Area */}
                <View style={styles.medsContent}>
                    <View style={styles.timestampContainer}>
                        <Text style={styles.timestampText}>September 23, 2024   20:30PM</Text>
                    </View>
                    {medicationsData.slice(0, 3).map((med, index) => (
                        <View key={med.id} style={[styles.medItem, index < 2 && styles.medItemBorder]}>
                            <Text style={styles.medName}>{med.name}</Text>
                            <View style={styles.medActions}>
                                <TouchableOpacity style={styles.medActionButton}>
                                    {med.taken === true ? (
                                        <AntDesign name="checkcircle" size={20} color={PRIMARY_DARK_BLUE}/>
                                    ) : (
                                         <AntDesign name="checkcircleo" size={20} color={ICON_GRAY} />
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.medActionButton}>
                                    {med.taken === false ? (
                                        <AntDesign name="closecircle" size={20} color={PRIMARY_DARK_BLUE} />
                                    ) : (
                                         <AntDesign name="closecircleo" size={20} color={ICON_GRAY} />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Footer */}
                <View style={styles.medsHeaderFooter}>
                    <Text style={styles.medsFooterText}>Today</Text>
                    <View style={styles.medsFooterStatus}>
                        <Text style={styles.medsFooterText}>
                            {medicationsData.filter(m => m.taken === true).length}/{medicationsData.length}
                         </Text>
                        <AntDesign name="checkcircle" size={18} color="#FFFFFF" style={{ marginLeft: 8 }}/>
                    </View>
                </View>
            </View>
             {/* --- End Medications Card --- */}


            {/* --- Heart Condition Card --- */}
            <View style={[styles.contentCard, styles.heartConditionCard]}>
                 <Text style={styles.activityCardSectionTitle}>Heart Condition</Text>
                 <Text style={styles.activitySubtitle}>Heart Activity</Text>

                 {/* Status and Legend Row */}
                 <View style={styles.activityStatusLegendRow}> 
                    <Text style={styles.activityStatus}>Normal</Text>
                    {/* Legend */}
                    <View style={styles.activityLegendContainer}>
                        <View style={styles.activityLegendItem}>
                            <View style={[styles.activityLegendColorBox, { backgroundColor: ACTIVITY_CHART_COLORS.heartRate }]} />
                            <Text style={styles.activityLegendText}>Heart Rate</Text>
                        </View>
                        <View style={styles.activityLegendItem}>
                            <View style={[styles.activityLegendColorBox, { backgroundColor: ACTIVITY_CHART_COLORS.glucose }]} />
                            <Text style={styles.activityLegendText}>Glucose</Text>
                        </View>
                        <View style={styles.activityLegendItem}>
                            <View style={[styles.activityLegendColorBox, { backgroundColor: ACTIVITY_CHART_COLORS.bloodCount }]} />
                            <Text style={styles.activityLegendText}>Blood Count</Text>
                        </View>
                    </View>
                 </View> 


                {/* Bar Chart Area */}
                <View style={styles.activityChartArea}>
                    {/* Background Line - represents the 0 axis */}
                    <View style={styles.activityChartBackgroundLine} />

                    {/* Data Bars Overlay */}
                    <View style={styles.activityChartBarsOverlay}>
                        {heartActivityData.map((dayData) => (
                            <View key={dayData.date} style={styles.activityDayGroup}>
                                {/* Container for the bars */}
                                <View style={styles.activityBarsContainer}>
                                    <View style={[
                                        styles.activityBar,
                                        { height: `${dayData.heartRate}%`, backgroundColor: ACTIVITY_CHART_COLORS.heartRate }
                                    ]} />
                                    <View style={[
                                        styles.activityBar,
                                        { height: `${dayData.glucose}%`, backgroundColor: ACTIVITY_CHART_COLORS.glucose }
                                    ]} />
                                    <View style={[
                                        styles.activityBar,
                                        { height: `${dayData.bloodCount}%`, backgroundColor: ACTIVITY_CHART_COLORS.bloodCount }
                                    ]} />
                                </View>
                                <Text style={styles.activityDateLabel}>{dayData.date}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
            {/* --- End Heart Condition Card --- */}


            {/* Extra space at bottom */}
            <View style={{ height: 50 }} />

        </ScrollView> // End Main ScrollView
        </SafeAreaView>
    );
};

// --- Styles ---
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
      },
    // --- Main layout & Header ---
    mainScrollView: {
        flex: 1,
        backgroundColor: SECONDARY_BACKGROUND,
    },
    mainScrollViewContent: {
        flexGrow: 1,
        paddingBottom: 40,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 18,
        paddingHorizontal: 16,
        backgroundColor: SECONDARY_BACKGROUND,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
        color: TEXT_COLOR_DARK,
    },
    // --- Generic Content Card Style ---
    contentCard: {
        backgroundColor: CARD_BACKGROUND,
        borderRadius: 20,
        marginHorizontal: 16,
        padding: CARD_PADDING,
        shadowColor: "#94A3B8",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 20,
    },
    // --- Organ Selection ---
    organScrollView: {
        flexGrow: 0,
        paddingVertical: 15,
        marginBottom: 10,
    },
    organScrollViewContent: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 11,
    },
    organCard: {
        backgroundColor: CARD_BACKGROUND,
        padding: 10,
        borderRadius: 15,
        alignItems: "center",
        marginHorizontal: 5,
        shadowColor: "#B0BFCF",
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        elevation: 4,
        justifyContent: 'space-between',
    },
    organCardImage: {
        width: "90%",
        height: 85,
        resizeMode: "contain",
    },
    organCardLabelContainer: {
        backgroundColor: CARD_BACKGROUND,
        borderRadius: 10,
        paddingVertical: 6,
        paddingHorizontal: 10,
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 5,
    },
    organCardLabelText: {
        fontWeight: "600",
        color: TEXT_COLOR_DARK,
        fontSize: 14,
    },
    // --- Selected Organ ---
    selectedOrganContainer: {
        alignItems: "center",
        paddingHorizontal: 16,
        marginVertical: 20,
    },
    selectedOrganImage: {
        width: Dimensions.get("window").width * 0.65,
        height: Dimensions.get("window").width * 0.65,
        resizeMode: "contain",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.30,
        shadowRadius: 8,
        ...(Platform.OS === 'android' ? { elevation: 10 } : {}),
    },

    // --- Heart Functional Parts Chart Styles (Prefix: functional) ---
    functionalChartTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: FUNCTIONAL_CHART_COLORS.title,
        marginBottom: 15,
    },
    functionalLegendContainer: {
        flexDirection: "row",
        marginBottom: 25,
    },
    functionalLegendItem: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 20,
    },
    functionalLegendColorBox: {
        width: 12,
        height: 12,
        borderRadius: 3,
        marginRight: 8,
    },
    functionalLegendText: {
        fontSize: 14,
        color: FUNCTIONAL_CHART_COLORS.label,
    },
    functionalChartRowsContainer: {},
    functionalChartRow: {
        marginBottom: 18,
        position: 'relative',
    },
    functionalPartLabel: {
        fontSize: 13,
        color: FUNCTIONAL_CHART_COLORS.label,
        marginBottom: 6,
    },
    functionalBarContainer: {
        height: 16,
        width: "100%",
        position: "relative",
    },
    functionalBarBackground: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: FUNCTIONAL_CHART_COLORS.background,
        borderRadius: 8,
    },
    functionalBarSegmentsContainer: {
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        position: 'absolute',
        overflow: 'hidden',
        borderRadius: 8,
    },
    functionalBarSegmentBase: {
        height: '100%',
    },
    functionalBarSegmentLeftRadius: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    functionalBarSegmentRightRadius: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },
    functionalXAxisContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        paddingHorizontal: 5,
        position: 'relative',
    },
    functionalXAxisLabel: {
        fontSize: 12,
        color: FUNCTIONAL_CHART_COLORS.axisLabel,
    },
    functionalGridLine: {
        position: 'absolute',
        top: -200,
        bottom: 0,
        width: 1,
        backgroundColor: BORDER_COLOR_LIGHT,
        zIndex: -1,
    },

    // --- Medications Card Styles (Prefix: meds) ---
    medicationCard: {
        backgroundColor: CARD_BACKGROUND,
        borderRadius: 20,
        marginHorizontal: 16,
        marginBottom: 20,
        shadowColor: "#94A3B8",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
        overflow: 'hidden',
    },
    medsHeaderFooter: {
        backgroundColor: PRIMARY_DARK_BLUE,
        paddingHorizontal: CARD_PADDING,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    medsCardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    medsAddButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    medsContent: {
        paddingHorizontal: CARD_PADDING,
        paddingVertical: 10,
    },
    timestampContainer: {
        backgroundColor: PRIMARY_DARK_BLUE,
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 12,
        alignSelf: 'flex-start',
        marginBottom: 15,
    },
    timestampText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '500',
    },
    medItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    medItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: BORDER_COLOR_LIGHT,
    },
    medName: {
        fontSize: 15,
        color: TEXT_COLOR_DARK,
        flex: 1,
        marginRight: 10,
    },
    medActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    medActionButton: {
        marginLeft: 15,
    },
    medsFooterText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    medsFooterStatus: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    // --- Heart Condition/Activity Card Styles (Prefix: activity - UPDATED) ---
    heartConditionCard: {
        // Inherits from contentCard
    },
    activityCardSectionTitle: {
        fontSize: 14,
        color: TEXT_COLOR_MEDIUM,
        fontWeight: '600',
        marginBottom: 10,
    },
     activitySubtitle: {
        fontSize: 13,
        color: TEXT_COLOR_LIGHT,
        marginBottom: 4,
    },
    activityStatusLegendRow: { // NEW: Container for Status + Legend
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Align items to top of row
        marginBottom: 25, // Space before chart area
        minHeight: 30, // Ensure row has some height
    },
    activityStatus: {
        fontSize: 24,
        fontWeight: 'bold',
        color: ACTIVITY_CHART_COLORS.status,
        marginRight: 10, // Add some space between status and legend
        // Removed marginBottom as it's controlled by the row container
    },
    activityLegendContainer: { // UPDATED: Now part of the row
        flexDirection: 'row', // Keep items horizontal
        // flexWrap: 'wrap', // Allow wrap if needed on small screens
        justifyContent: 'flex-end', // Align legend items to the right
        flex: 1, // Allow legend container to take remaining space
        flexShrink: 1, 
    },
    activityLegendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 4, // Use marginLeft for spacing between items aligned right
        // marginBottom: 5,
    },
    activityLegendColorBox: {
        width: 10,
        height: 10,
        borderRadius: 2,
        marginRight: 6,
    },
    activityLegendText: {
        fontSize: 12,
        color: TEXT_COLOR_MEDIUM,
    },
    activityChartArea: { // UPDATED: Chart area itself
        height: 150, // Height for bars + labels below
        position: 'relative',
        width: '100%', // Ensure it takes full width
    },
    activityChartBackgroundLine: { // UPDATED: Renamed and simplified
        position: 'absolute',
        bottom: 25, // Position line exactly where labels start (adjust as needed)
        left: 0,
        right: 0,
        height: 1, // Single pixel line
        backgroundColor: BORDER_COLOR_LIGHT,
    },
    activityChartBarsOverlay:{ // Container for the bar groups + labels
        position: 'absolute',
        top: 0,
        bottom: 0, // Spans the full chart area height
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end', // Align day groups to the bottom (where labels are)
        paddingHorizontal: 5,
    },
    activityDayGroup: {
        flex: 1,
        alignItems: 'center', // Center label horizontally
        justifyContent: 'flex-end', // Push bars+label content to the bottom
        marginHorizontal: 5,
        height: '100%',
    },
    activityBarsContainer: { // Container for JUST the bars
        flexDirection: 'row',
        alignItems: 'flex-end', // Bars grow upwards from the bottom
        justifyContent: 'center',
        height: '100%', // Takes full height of DayGroup
        // Removed paddingBottom, alignment handled by parent and background line
        paddingBottom: 25, // ADDED: Ensure bars visually start ABOVE the label space and BackgroundLine
        marginBottom: -25, // ADDED: Pull the container down visually so bars align with the line
    },
    activityBar: {
        width: 10,
        borderRadius: 5,
        marginHorizontal: 3,
        minHeight: 2,
        // Height and background color set dynamically
    },
    activityDateLabel: {
        height: 25, // Explicit height for label area
        paddingTop: 5, // Space between line and text
        fontSize: 11,
        color: ACTIVITY_CHART_COLORS.axisLabel,
        textAlign: 'center',
        width: '100%',
    },
});

export default OrganHealthScreen;