import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const BloodTestTable = () => {
  const testData =  {
    tests: [
      {
        test_name: "Hemoglobin",
        normal_range: "13 - 18 g/dl",
        result: 8,
        unit: "g/dl",
      },
      {
        test_name: "Hematocrit",
        normal_range: "39 - 54 %",
        result: 26.8,
        unit: "%",
      },
      {
        test_name: "Red Blood Cells",
        normal_range: "4.2 - 6.5 Million/uL",
        result: 2.95,
        unit: "Million/uL",
      },
      {
        test_name: "MCV",
        normal_range: "75 - 95 fl",
        result: 90.9,
        unit: "fl",
      },
      {
        test_name: "MCH",
        normal_range: "26 - 32 pg",
        result: 27.2,
        unit: "pg",
      },
      {
        test_name: "MCHC",
        normal_range: "31 - 36 g/dl",
        result: 29.9,
        unit: "g/dl",
      },
      {
        test_name: "RDW",
        normal_range: "11.5 - 14.5 %",
        result: 16.5,
        unit: "%",
      },
      {
        test_name: "TLC Count",
        normal_range: "4 - 11 10^3/mm^3",
        result: 16.65,
        unit: "10^3/mm^3",
      },
      {
        test_name: "Platelets",
        normal_range: "140 - 440 10^3/mm^3",
        result: 267,
        unit: "10^3/mm^3",
      },
    ],
  };

  const isResultNormal = (normalRange:any, result:any) => {
    const [min, max] = normalRange.split(' - ').map((val:any) => {
      const num = parseFloat(val.match(/[\d.]+/)[0]);
      return num;
    });
    
    return result >= min && result <= max;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Blood Test Results</Text>
      
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, { flex: 2 }]}>Test Name</Text>
        <Text style={styles.headerCell}>Result</Text>
        <Text style={styles.headerCell}>Normal Range</Text>
        <Text style={styles.headerCell}>Status</Text>
      </View>

      <ScrollView>
        {testData.tests.map((test, index) => {
          const isNormal = isResultNormal(test.normal_range, test.result);
          
          return (
            <View 
              key={index} 
              style={[
                styles.tableRow,
                index % 2 === 0 ? styles.evenRow : styles.oddRow
              ]}
            >
              <Text style={[styles.cell, { flex: 2 }]}>{test.test_name}</Text>
              <Text style={styles.cell}>{test.result} {test.unit}</Text>
              <Text style={styles.cell}>{test.normal_range}</Text>
              <Text 
                style={[
                  styles.cell,
                  isNormal ? styles.normal : styles.abnormal
                ]}
              >
                {isNormal ? 'Normal' : 'Abnormal'}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Submit Results</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    backgroundColor: '#6200ee',
    borderRadius: 4,
  },
  headerCell: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  evenRow: {
    backgroundColor: '#fff',
  },
  oddRow: {
    backgroundColor: '#f9f9f9',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  normal: {
    color: 'green',
    fontWeight: 'bold',
  },
  abnormal: {
    color: 'red',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BloodTestTable;