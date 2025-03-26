import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import NavigationBar from './Navigation_Bar';
import GoldBar from './Gold_bar';
import Calendar from './Calendar/calendar';
import Categories from './categories';
import Articles from './Articles';
import BloodBank from './Blood Bank/BloodBank';
import Footer from './footer';
import WhoOrg from './who_org';
import HealthVaultCard from './Master Health/master_health_check';
import HealthCard from './hello';
import HumanAnatomy from './Human_Anatomy';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            {/* Fixed Components */}
            <View style={styles.fixedHeader}>
                <GoldBar />
                <NavigationBar />
            </View>

            {/* Scrollable Content */}
            <ScrollView 
                style={styles.scrollView} 
                contentContainerStyle={{ paddingBottom: 20 }} 
                showsVerticalScrollIndicator={false}
            >
                <HealthCard />
                <HealthVaultCard />
                <HumanAnatomy />
                <Calendar />
                <Categories />
                <Articles />
                <BloodBank />
                <WhoOrg />
            </ScrollView>
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fixedHeader: {
        position: 'absolute', 
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10, // Ensures it's above the scrollable content
        backgroundColor: '#fff', // Set the background to match the design
    },
    scrollView: {
        flex: 1,
        marginTop: 155, // Adjust margin to prevent content from going under fixed headers
    },
});

export default HomeScreen;