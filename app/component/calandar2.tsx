import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar} from 'react-native-big-calendar';
import { format, parseISO, addDays, isSameDay } from 'date-fns';

interface Course {
  id: string;
  title: string;
  start: string; // ISO string
  end: string; // ISO string
  color: string;
}

interface MyEvent {
  title: string;
  start: Date;
  end: Date;
  color?: string;
}

const ScheduleCalendarTSX: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 3, 9));

  const courses: Course[] = [
    {
      id: '1',
      title: 'Basic mathematics',
      start: '2025-04-09T08:00:00',
      end: '2025-04-09T08:45:00',
      color: '#ECF1FD',
    },
    {
      id: '2',
      title: 'English Grammar',
      start: '2025-04-09T10:00:00',
      end: '2025-04-09T11:10:00',
      color: '#E5FBF2',
    },
    {
      id: '3',
      title: 'Physics',
      start: '2025-04-10T09:00:00',
      end: '2025-04-10T10:30:00',
      color: '#FFEFE5',
    },
  ];

  const getEventsForDate = (date: Date): MyEvent[] => {
    return courses
      .filter(course => isSameDay(parseISO(course.start), date))
      .map(course => ({
        title: course.title,
        start: parseISO(course.start),
        end: parseISO(course.end),
        color: course.color,
      }));
  };

  const startOfWeek = new Date(2025, 3, 6); // Dimanche 6 avril 2025
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startOfWeek, i);
    return {
      date,
      dayName: format(date, 'EEE').toUpperCase(),
      dayNumber: format(date, 'dd'),
    };
  });

  const handleSelectDay = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Schedule</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.weekContainer}>
        <View style={styles.weekHeader}>
          <Text style={styles.weekTitle}>This week</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.daysContainer}>
          {weekDays.map((day) => (
            <TouchableOpacity
              key={day.dayNumber}
              style={[
                styles.dayItem,
                isSameDay(selectedDate, day.date) && styles.selectedDayItem
              ]}
              onPress={() => handleSelectDay(day.date)}
            >
              <Text 
                style={[
                  styles.dayText, 
                  isSameDay(selectedDate, day.date) && styles.selectedDayText
                ]}
              >
                {day.dayName}
              </Text>
              <Text 
                style={[
                  styles.dateText, 
                  isSameDay(selectedDate, day.date) && styles.selectedDayText
                ]}
              >
                {day.dayNumber}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Calendar
        events={getEventsForDate(selectedDate)}
        height={600}
        date={selectedDate}
        mode="day"
        swipeEnabled={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  searchButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekContainer: {
    backgroundColor: '#F7F9FC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  weekTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayItem: {
    alignItems: 'center',
    width: 40,
    padding: 6,
  },
  selectedDayItem: {
    backgroundColor: '#000',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  dayText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '500',
  },
  selectedDayText: {
    color: '#FFF',
  },
});

export default ScheduleCalendarTSX;
