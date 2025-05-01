import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ClassType, RootStackParamList } from '../(tabs)/types';
import { router } from 'expo-router';
// import { RootStackParamList, ClassType } from './types';

type ScheduleScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Schedule'>;

type DayType = {
  dayShort: string;
  dayLong: string;
  date: string;
  isSelected?: boolean;
};

const days: DayType[] = [
  { dayShort: 'SUN', dayLong: 'Sunday', date: '04' },
  { dayShort: 'MON', dayLong: 'Monday', date: '05' },
  { dayShort: 'TUE', dayLong: 'Tuesday', date: '06' },
  { dayShort: 'WED', dayLong: 'Wednesday', date: '07' },
  { dayShort: 'THU', dayLong: 'Thursday', date: '08' },
  { dayShort: 'FRI', dayLong: 'Friday', date: '09', isSelected: true },
  { dayShort: 'SAT', dayLong: 'Saturday', date: '10' },
];

const classes: ClassType[] = [
  {
    id: '1',
    title: 'Basic mathematics',
    startTime: '08:00am',
    endTime: '8:45am',
    timeDisplay: '8:00am',
    backgroundColor: '#f8f9fe',
  },
  {
    id: '2',
    title: 'English Grammar',
    startTime: '10:00am',
    endTime: '11:10am',
    timeDisplay: '10:00am',
    backgroundColor: '#eafbf3',
  },
  {
    id: '3',
    title: 'Science',
    startTime: '12:00pm',
    endTime: '12:45pm',
    timeDisplay: '12:00pm',
    backgroundColor: '#fdf9ea',
  },
  {
    id: '4',
    title: 'World history',
    startTime: '1:00pm',
    endTime: '1:50pm',
    timeDisplay: '1:00pm',
    backgroundColor: '#fdf2fb',
  },
];

const timeSlots = ['8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm'];

const ScheduleScreen: React.FC = () => {
  const navigation = useNavigation<ScheduleScreenNavigationProp>();
  const [selectedDay, setSelectedDay] = useState<string>('09');

  const navigateToClassDetail = (classItem: ClassType) => {
    // navigation.navigate('/screens/ClassDetail', { classInfo: classItem });
    router.push("screens/ClassDetail");
  };

  // Handle day selection
  const handleDaySelect = (date: string) => {
    setSelectedDay(date);
  };

  // Find class for a specific time slot
  const findClassForTimeSlot = (time: string) => {
    return classes.find(c => c.timeDisplay === time);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Schedule</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.weekSection}>
        <View style={styles.weekHeader}>
          <Text style={styles.weekTitle}>This week</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.daysContainer}>
          {days.map((day) => (
            <TouchableOpacity
              key={day.date}
              style={[
                styles.dayItem,
                day.date === selectedDay && styles.selectedDayItem,
              ]}
              onPress={() => handleDaySelect(day.date)}
            >
              <Text style={[
                styles.dayText,
                day.date === selectedDay && styles.selectedDayText
              ]}>
                {day.dayShort}
              </Text>
              <Text style={[
                styles.dateText,
                day.date === selectedDay && styles.selectedDayText
              ]}>
                {day.date}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={styles.scheduleContainer} showsVerticalScrollIndicator={false}>
        {timeSlots.map((time) => {
          const classForTime = findClassForTimeSlot(time);
          
          return (
            <View key={time} style={styles.timeSlotRow}>
              <Text style={styles.timeText}>{time}</Text>
              <View style={styles.classContainer}>
                {classForTime ? (
                  <TouchableOpacity
                    style={[styles.classCard, { backgroundColor: classForTime.backgroundColor }]}
                    onPress={() => navigateToClassDetail(classForTime)}
                  >
                    <Text style={styles.classTitle}>{classForTime.title}</Text>
                    <Text style={styles.classTime}>
                      {classForTime.startTime} - {classForTime.endTime}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.emptySlot} />
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>

      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  searchButton: {
    width: 40,
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekSection: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  weekTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  seeAllText: {
    fontSize: 16,
    color: '#666',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayItem: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  selectedDayItem: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
  },
  dayText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
  },
  selectedDayText: {
    color: '#fff',
  },
  scheduleContainer: {
    flex: 1,
    marginTop: 16,
  },
  timeSlotRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timeText: {
    width: 80,
    fontSize: 14,
    color: '#666',
  },
  classContainer: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#eee',
    paddingLeft: 16,
  },
  classCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  classTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  classTime: {
    fontSize: 14,
    color: '#666',
  },
  emptySlot: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    height: 16,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  tabItem: {
    alignItems: 'center',
  },
});

export default ScheduleScreen;