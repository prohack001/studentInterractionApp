import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ClassType, RootStackParamList } from '../(tabs)/types';
import { router } from 'expo-router';
import { format, addDays, parseISO, startOfWeek, isSameDay, getDay } from 'date-fns';
import { fr } from 'date-fns/locale';

type ScheduleScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Schedule'>;

type DayType = {
  dayShort: string;
  dayLong: string;
  date: string;
  fullDate: Date;
  isSelected?: boolean;
};

// Base de données de cours pour différents jours
const classesDatabase: { [key: string]: ClassType[] } = {
  // Dimanche (0)
  '0': [
    {
      id: 'sun-1',
      title: 'Weekend Study Group',
      startTime: '10:00am',
      endTime: '11:30am',
      timeDisplay: '10:00am',
      backgroundColor: '#e6f7ff',
    },
    {
      id: 'sun-2',
      title: 'Art & Creativity',
      startTime: '1:00pm',
      endTime: '2:30pm',
      timeDisplay: '1:00pm',
      backgroundColor: '#fff0f6',
    }
  ],
  
  // Lundi (1)
  '1': [
    {
      id: 'mon-1',
      title: 'Basic Mathematics',
      startTime: '08:00am',
      endTime: '8:45am',
      timeDisplay: '8:00am',
      backgroundColor: '#f8f9fe',
    },
    {
      id: 'mon-2',
      title: 'French Literature',
      startTime: '10:00am',
      endTime: '11:10am',
      timeDisplay: '10:00am',
      backgroundColor: '#eafbf3',
    },
    {
      id: 'mon-3',
      title: 'Physics Lab',
      startTime: '1:00pm',
      endTime: '2:30pm',
      timeDisplay: '1:00pm',
      backgroundColor: '#fdf2fb',
    },
  ],
  
  // Mardi (2)
  '2': [
    {
      id: 'tue-1',
      title: 'Computer Science',
      startTime: '9:00am',
      endTime: '10:30am',
      timeDisplay: '9:00am',
      backgroundColor: '#e6fffb',
    },
    {
      id: 'tue-2',
      title: 'English Grammar',
      startTime: '11:00am',
      endTime: '12:10pm',
      timeDisplay: '11:00am',
      backgroundColor: '#eafbf3',
    },
    {
      id: 'tue-3',
      title: 'Physical Education',
      startTime: '2:00pm',
      endTime: '3:30pm',
      timeDisplay: '2:00pm',
      backgroundColor: '#f9f0ff',
    },
  ],
  
  // Mercredi (3)
  '3': [
    {
      id: 'wed-1',
      title: 'Advanced Math',
      startTime: '8:00am',
      endTime: '9:30am',
      timeDisplay: '8:00am',
      backgroundColor: '#f0f5ff',
    },
    {
      id: 'wed-2',
      title: 'World History',
      startTime: '10:00am',
      endTime: '11:45am',
      timeDisplay: '10:00am',
      backgroundColor: '#fff2e8',
    },
    {
      id: 'wed-3',
      title: 'Music',
      startTime: '1:00pm',
      endTime: '2:00pm',
      timeDisplay: '1:00pm',
      backgroundColor: '#fcffe6',
    },
  ],
  
  // Jeudi (4)
  '4': [
    {
      id: 'thu-1',
      title: 'Geography',
      startTime: '9:00am',
      endTime: '10:30am',
      timeDisplay: '9:00am',
      backgroundColor: '#f9f0ff',
    },
    {
      id: 'thu-2',
      title: 'Biology',
      startTime: '11:00am',
      endTime: '12:30pm',
      timeDisplay: '11:00am',
      backgroundColor: '#e6fffb',
    },
    {
      id: 'thu-3',
      title: 'Foreign Language',
      startTime: '2:00pm',
      endTime: '3:30pm',
      timeDisplay: '2:00pm',
      backgroundColor: '#fff0f6',
    },
  ],
  
  // Vendredi (5)
  '5': [
    {
      id: 'fri-1',
      title: 'Science',
      startTime: '8:00am',
      endTime: '9:30am',
      timeDisplay: '8:00am',
      backgroundColor: '#fdf9ea',
    },
    {
      id: 'fri-2',
      title: 'Literature',
      startTime: '10:00am',
      endTime: '11:10am',
      timeDisplay: '10:00am',
      backgroundColor: '#eafbf3',
    },
    {
      id: 'fri-3',
      title: 'Chemistry',
      startTime: '12:00pm',
      endTime: '1:30pm',
      timeDisplay: '12:00pm',
      backgroundColor: '#f0f5ff',
    },
    {
      id: 'fri-4',
      title: 'Social Studies',
      startTime: '2:00pm',
      endTime: '3:15pm',
      timeDisplay: '2:00pm',
      backgroundColor: '#fdf2fb',
    },
  ],
  
  // Samedi (6)
  '6': [
    {
      id: 'sat-1',
      title: 'Weekend Workshop',
      startTime: '10:00am',
      endTime: '12:00pm',
      timeDisplay: '10:00am',
      backgroundColor: '#f9f0ff',
    }
  ]
};

const timeSlots = ['8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm'];

const ScheduleScreen: React.FC = () => {
  const navigation = useNavigation<ScheduleScreenNavigationProp>();
  
  // Générer les dates dynamiquement pour la semaine en cours
  const generateWeekDays = (): DayType[] => {
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 0 }); // dimanche comme premier jour
    
    return Array(7).fill(null).map((_, index) => {
      const day = addDays(weekStart, index);
      const isToday = isSameDay(day, today);
      
      return {
        dayShort: format(day, 'EEE', { locale: fr }).toUpperCase(),
        dayLong: format(day, 'EEEE', { locale: fr }),
        date: format(day, 'dd'),
        fullDate: day,
        isSelected: isToday
      };
    });
  };

  const [days, setDays] = useState<DayType[]>(generateWeekDays());
  const [selectedDay, setSelectedDay] = useState<string>(format(new Date(), 'dd'));
  const [selectedFullDate, setSelectedFullDate] = useState<Date>(new Date());
  const [currentClasses, setCurrentClasses] = useState<ClassType[]>([]);

  // Charger les cours pour le jour actuel lors du montage initial
  useEffect(() => {
    const today = new Date();
    const dayOfWeek = getDay(today).toString();
    setCurrentClasses(classesDatabase[dayOfWeek] || []);
  }, []);

  const navigateToClassDetail = (classItem: ClassType) => {
    router.push({
      pathname: "screens/ClassDetail",
      params: { classId: classItem.id }
    });
  };

  // Handle day selection
  const handleDaySelect = (date: string, fullDate: Date) => {
    setSelectedDay(date);
    setSelectedFullDate(fullDate);
    
    // Update days array to reflect selection
    const updatedDays = days.map(day => ({
      ...day,
      isSelected: day.date === date
    }));
    
    setDays(updatedDays);
    
    // Mettre à jour les cours selon le jour sélectionné
    const dayOfWeek = getDay(fullDate).toString();
    setCurrentClasses(classesDatabase[dayOfWeek] || []);
  };

  // Find class for a specific time slot
  const findClassForTimeSlot = (time: string) => {
    return currentClasses.find(c => c.timeDisplay === time);
  };

  // Format the current date for display
  const currentMonthYear = format(selectedFullDate, 'MMMM yyyy', { locale: fr });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Schedule</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.currentDateHeader}>
        <Text style={styles.currentDateText}>{currentMonthYear}</Text>
      </View>

      <View style={styles.weekSection}>
        <View style={styles.weekHeader}>
          <Text style={styles.weekTitle}>This week</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daysScrollView}>
          <View style={styles.daysContainer}>
            {days.map((day) => (
              <TouchableOpacity
                key={day.date}
                style={[
                  styles.dayItem,
                  day.date === selectedDay && styles.selectedDayItem,
                ]}
                onPress={() => handleDaySelect(day.date, day.fullDate)}
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
        </ScrollView>
      </View>

      <View style={styles.timelineContainer}>
        <View style={styles.timeColumn}>
          {timeSlots.map((time) => (
            <View key={time} style={styles.timeSlot}>
              <Text style={styles.timeText}>{time}</Text>
            </View>
          ))}
        </View>

        <ScrollView style={styles.scheduleContainer} showsVerticalScrollIndicator={false}>
          {timeSlots.map((time) => {
            const classForTime = findClassForTimeSlot(time);
            
            return (
              <View key={time} style={styles.classSlotRow}>
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
      </View>
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
  currentDateHeader: {
    marginBottom: 10,
  },
  currentDateText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
    textTransform: 'capitalize',
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
  daysScrollView: {
    flexGrow: 0,
  },
  daysContainer: {
    flexDirection: 'row',
    paddingRight: 8,
  },
  dayItem: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedDayItem: {
    backgroundColor: '#000',
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
  timelineContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 16,
  },
  timeColumn: {
    width: 60,
    marginRight: 10,
  },
  timeSlot: {
    height: 80,
    justifyContent: 'flex-start',
    paddingTop: 8,
  },
  scheduleContainer: {
    flex: 1,
  },
  timeSlotRow: {
    flexDirection: 'row',
  },
  classSlotRow: {
    height: 80,
  },
  timeText: {
    fontSize: 14,
    color: '#666',
  },
  classContainer: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#eee',
    paddingLeft: 10,
    paddingBottom: 8,
  },
  classCard: {
    padding: 12,
    borderRadius: 12,
    height: '100%',
    justifyContent: 'center',
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
    height: '100%',
  },
});

export default ScheduleScreen;