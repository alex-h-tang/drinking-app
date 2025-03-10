import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import * as SQLite from 'expo-sqlite';

export default function Index() {
  interface BACLevel {
    value: number;
    label: string;
    color: string;
  }
  
  const [bac, setBac] = useState<number>(0.05);
  // const [lastFetchTime, setLastFetchTime] = useState<number>(Date.now());
  // const [userMetabolismRate, setUserMetabolismRate] = useState<number>(0.015);
  const maxBAC = 0.45;

  const bacLevels: BACLevel[] = [
    { value: 0.45, label: "Fatal", color: "#000000" },
    { value: 0.36, label: "Alc poisoning", color: "#3b2b66" },
    { value: 0.27, label: "Possible blackouts", color: "#6247aa" },
    { value: 0.18, label: "Impaired cognition", color: "#6247aa" },
    { value: 0.09, label: "Disrupted judgement", color: "#c9b3ff" },
    { value: 0.0, label: "Sober", color: "#e0d1ff" },
  ];

  // const fetchBAC = useCallback(async () => {
  //   try {
  //     // const bacValue = await fetchUserBAC();
  //     const bacValue = 0.1;
  //     setBac(bacValue);
  //     setLastFetchTime(Date.now());
  //   } catch (error) {
  //     console.error("Failed to fetch BAC", error);
  //   }
  // }, []);

  const getCurrentSegment = () => {
    for (let i = 0; i < bacLevels.length - 1; i++) {
      if (bac <= bacLevels[i].value && bac > bacLevels[i + 1].value) {
        return i;
      }
    }
    return bacLevels.length - 1;
  };

  const renderPersonIcon = () => {
    const segment = getCurrentSegment();
    const fillPercentage = bac / maxBAC;

    const headHeight = 80;
    const upperBodyHeight = 80;
    const lowerBodyHeight = 120;
    const fillHeight = fillPercentage * 280;

    let headFillHeight = 0;
    let upperFillHeight = 0;
    let lowerFillHeight = 0;

    // fill calculation
    if (fillHeight > lowerBodyHeight + upperBodyHeight) {
      lowerFillHeight = lowerBodyHeight;
      upperFillHeight = upperBodyHeight;
      headFillHeight = Math.min(headHeight, (fillHeight - lowerBodyHeight - upperBodyHeight));
    } else if (fillHeight > lowerBodyHeight) {
      lowerFillHeight = lowerBodyHeight;
      upperFillHeight = fillHeight - lowerBodyHeight;
    } else {
      lowerFillHeight = fillHeight;
    }

    return (
      <View style={styles.personContainer}>
        {/* Head */}
        <View style={[styles.head, {overflow: "hidden"}]}>
          {headFillHeight > 0 && (
            <View
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: headFillHeight,
                backgroundColor: bacLevels[segment].color,
                borderRadius: 40,
                borderTopLeftRadius: headFillHeight === headHeight ? 40 : 0,
                borderTopRightRadius: headFillHeight === headHeight ? 40 : 0,
              }}
            />
          )}
        </View>

        <View style={{ position: "relative" }}>
          {/* Upper Body */}
          <View style={[styles.upperBody, {overflow: "hidden"}]}>
            {upperFillHeight > 0 && (
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  height: upperFillHeight,
                  backgroundColor: bacLevels[segment].color,
                }}
              />
            )}
          </View>

          {/* Lower Body */}
          <View style={[styles.lowerBody, {overflow: "hidden"}]}>
            {lowerFillHeight > 0 && (
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  height: lowerFillHeight,
                  backgroundColor: bacLevels[segment].color,
                }}
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  const renderBACScale = () => {
    return (
      <View style={styles.scaleContainer}>
        <View style={styles.scaleBar} />

        {bacLevels.map((level, index) => (
          <View key={index} style={styles.levelContainer}>
            <View style={[styles.dot, { backgroundColor: level.color }]} />
            <Text style={styles.levelLabel}>{level.value}% {level.label}</Text>
          </View>
        ))}

        <View
          style={[
            styles.bacIndicator,
            {
              top: `${((maxBAC - bac) / maxBAC) * 100}%`,
              backgroundColor: bacLevels[getCurrentSegment()].color
            }
          ]}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Ionicons name="wine-outline" size={20} color="black" />
          <Text style={styles.title}>BAC Buddy</Text>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="#6247aa" />
        </TouchableOpacity>
      </View>

      {/* Main content */}
      <View style={styles.content}>
        {renderPersonIcon()}
        {renderBACScale()}
      </View>

      {/* BAC display */}
      <View style={styles.bacDisplay}>
        <Text style={styles.bacText}>BAC: {bac.toFixed(2)}%</Text>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#e9e9e9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 6,
  },
  menuButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  personContainer: {
    alignItems: 'center',
    width: 100,
  },
  head: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#aaa',
    marginBottom: 10,
  },
  upperBody: {
    width: 80,
    height: 80,
    backgroundColor: '#aaa',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  lowerBody: {
    width: 80,
    height: 120,
    backgroundColor: '#aaa',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  scaleContainer: {
    height: 300,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    position: 'relative',
    paddingLeft: 20,
  },
  scaleBar: {
    position: 'absolute',
    left: 6,
    top: 0,
    width: 3,
    height: '100%',
    backgroundColor: '#ddd',
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginRight: 10,
  },
  levelLabel: {
    fontSize: 14,
    color: '#333',
  },
  bacIndicator: {
    position: 'absolute',
    left: 0,
    width: 15,
    height: 3,
    backgroundColor: '#6247aa',
  },
  bacDisplay: {
    alignItems: 'center',
    padding: 20,
  },
  bacText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#e9e9e9',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navButton: {
    padding: 10,
  },
});

