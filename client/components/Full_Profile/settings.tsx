import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, } from 'react-native';
import { FontAwesome, MaterialIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Gold_bar from "../Home Page/Gold_bar";

const SettingsScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
    <view>
      <Gold_bar />
    </view>
    <View style={styles.container}>
      {/* Back Navigation */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={20} color="#003366" />
        <Text style={styles.headerText}>Setting</Text>
      </TouchableOpacity>

      {/* User Info Fields */}
      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={18} color="#003366" />
        <TextInput style={styles.input} value="Nandan G" editable={false} />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={18} color="#003366" />
        <TextInput style={styles.input} value="example@gmail.com" editable={false} />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={18} color="#003366" />
        <TextInput style={styles.input} value="********" editable={false} secureTextEntry />
      </View>

      <View style={styles.inputContainer}>
        <Feather name="phone" size={18} color="#003366" />
        <TextInput style={styles.input} value="9999999999" editable={false} />
      </View>

      {/* Gender and DOB with Proper Spacing */}
      <View style={styles.rowContainer}>
        <View style={[styles.inputContainer, styles.smallBox]}>
          <FontAwesome name="mars" size={18} color="#003366" />
          <Text style={styles.input}>Male</Text>
        </View>
        <View style={[styles.inputContainer, styles.smallBox]}>
          <MaterialIcons name="calendar-today" size={18} color="#003366" />
          <Text style={styles.input}>12/3/1990</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="map-marker" size={18} color="#003366" />
        <TextInput
          style={styles.input}
          value="81/1 Basavanagudi, Bengaluru"
          editable={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="cog" size={18} color="#003366" />
        <TextInput style={styles.input} value="9888888888" editable={false} />
      </View>
    </View>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#063247',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CDEEFF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  input: {
    marginLeft: 10,
    fontSize: 18,
    color: '#063247',
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  smallBox: {
    flex: 1,
    marginRight: 10,
  },
});

export default SettingsScreen;