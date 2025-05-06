import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';

const students = [
  { id: '1', avatar: 'https://randomuser.me/api/portraits/women/65.jpg', name: 'Emma Watson' },
  { id: '2', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', name: 'Sofia Chen' },
  { id: '3', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', name: 'Marcus Johnson' },
];

const books = [
  {
    id: '1',
    title: 'English Phrasal Verbs In Use',
    cover: 'https://m.media-amazon.com/images/I/51Yf4JQ5jbL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg',
    color: '#8BC34A',
  },
  {
    id: '2',
    title: 'English Grammar In Use',
    cover: 'https://m.media-amazon.com/images/I/41myR0cMitL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg',
    color: '#2196F3',
  },
];

// Base de données complète des cours
const classesDatabase = {
  // Dimanche
  'sun-1': {
    id: 'sun-1',
    title: 'Weekend Study Group',
    startTime: '10:00am',
    endTime: '11:30am',
    timeDisplay: '10:00am',
    backgroundColor: '#e6f7ff',
    theme: 'Collaborative study session focusing on homework completion and exam preparation across multiple subjects.',
    hasHomework: false,
  },
  'sun-2': {
    id: 'sun-2',
    title: 'Art & Creativity',
    startTime: '1:00pm',
    endTime: '2:30pm',
    timeDisplay: '1:00pm',
    backgroundColor: '#fff0f6',
    theme: 'Exploring various art techniques and developing creative skills through hands-on projects.',
    hasHomework: true,
  },
  
  // Lundi
  'mon-1': {
    id: 'mon-1',
    title: 'Basic Mathematics',
    startTime: '08:00am',
    endTime: '8:45am',
    timeDisplay: '8:00am',
    backgroundColor: '#f8f9fe',
    theme: 'Review and practice addition, subtraction, multiplication and division basics. Focus on mental math techniques.',
    hasHomework: true,
  },
  'mon-2': {
    id: 'mon-2',
    title: 'French Literature',
    startTime: '10:00am',
    endTime: '11:10am',
    timeDisplay: '10:00am',
    backgroundColor: '#eafbf3',
    theme: 'Analysis of classic French literature works, focusing on themes, characters, and historical context.',
    hasHomework: true,
  },
  'mon-3': {
    id: 'mon-3',
    title: 'Physics Lab',
    startTime: '1:00pm',
    endTime: '2:30pm',
    timeDisplay: '1:00pm',
    backgroundColor: '#fdf2fb',
    theme: 'Practical experiments demonstrating principles of mechanics and energy transfer.',
    hasHomework: true,
  },
  
  // Mardi
  'tue-1': {
    id: 'tue-1',
    title: 'Computer Science',
    startTime: '9:00am',
    endTime: '10:30am',
    timeDisplay: '9:00am',
    backgroundColor: '#e6fffb',
    theme: 'Introduction to programming logic and basic algorithms using Python.',
    hasHomework: true,
  },
  'tue-2': {
    id: 'tue-2',
    title: 'English Grammar',
    startTime: '11:00am',
    endTime: '12:10pm',
    timeDisplay: '11:00am',
    backgroundColor: '#eafbf3',
    theme: 'Review and extend your knowledge of the present simple, present perfect and present continuous tenses.',
    hasHomework: true,
  },
  'tue-3': {
    id: 'tue-3',
    title: 'Physical Education',
    startTime: '2:00pm',
    endTime: '3:30pm',
    timeDisplay: '2:00pm',
    backgroundColor: '#f9f0ff',
    theme: 'Team sports and cooperative games focusing on coordination and strategy.',
    hasHomework: false,
  },
  
  // Mercredi
  'wed-1': {
    id: 'wed-1',
    title: 'Advanced Math',
    startTime: '8:00am',
    endTime: '9:30am',
    timeDisplay: '8:00am',
    backgroundColor: '#f0f5ff',
    theme: 'Working with algebraic expressions and solving complex equations.',
    hasHomework: true,
  },
  'wed-2': {
    id: 'wed-2',
    title: 'World History',
    startTime: '10:00am',
    endTime: '11:45am',
    timeDisplay: '10:00am',
    backgroundColor: '#fff2e8',
    theme: 'Ancient civilizations: Exploring the achievements and cultural aspects of the Egyptian, Greek and Roman civilizations.',
    hasHomework: true,
  },
  'wed-3': {
    id: 'wed-3',
    title: 'Music',
    startTime: '1:00pm',
    endTime: '2:00pm',
    timeDisplay: '1:00pm',
    backgroundColor: '#fcffe6',
    theme: 'Introduction to music theory and practical instrument lessons.',
    hasHomework: true,
  },
  
  // Jeudi
  'thu-1': {
    id: 'thu-1',
    title: 'Geography',
    startTime: '9:00am',
    endTime: '10:30am',
    timeDisplay: '9:00am',
    backgroundColor: '#f9f0ff',
    theme: 'Study of world geography with a focus on climate zones and their impact on human civilization.',
    hasHomework: true,
  },
  'thu-2': {
    id: 'thu-2',
    title: 'Biology',
    startTime: '11:00am',
    endTime: '12:30pm',
    timeDisplay: '11:00am',
    backgroundColor: '#e6fffb',
    theme: 'The cell structure and function. Exploring the basic building blocks of life.',
    hasHomework: true,
  },
  'thu-3': {
    id: 'thu-3',
    title: 'Foreign Language',
    startTime: '2:00pm',
    endTime: '3:30pm',
    timeDisplay: '2:00pm',
    backgroundColor: '#fff0f6',
    theme: 'Conversational practice and vocabulary building in a foreign language of choice.',
    hasHomework: true,
  },
  
  // Vendredi
  'fri-1': {
    id: 'fri-1',
    title: 'Science',
    startTime: '8:00am',
    endTime: '9:30am',
    timeDisplay: '8:00am',
    backgroundColor: '#fdf9ea',
    theme: 'Introduction to the solar system. Exploring the planets, their characteristics and their moons.',
    hasHomework: false,
  },
  'fri-2': {
    id: 'fri-2',
    title: 'Literature',
    startTime: '10:00am',
    endTime: '11:10am',
    timeDisplay: '10:00am',
    backgroundColor: '#eafbf3',
    theme: 'Critical analysis of literary works with focus on character development and narrative techniques.',
    hasHomework: true,
  },
  'fri-3': {
    id: 'fri-3',
    title: 'Chemistry',
    startTime: '12:00pm',
    endTime: '1:30pm',
    timeDisplay: '12:00pm',
    backgroundColor: '#f0f5ff',
    theme: 'Introduction to atomic structure and the periodic table of elements.',
    hasHomework: true,
  },
  'fri-4': {
    id: 'fri-4',
    title: 'Social Studies',
    startTime: '2:00pm',
    endTime: '3:15pm',
    timeDisplay: '2:00pm',
    backgroundColor: '#fdf2fb',
    theme: 'Current events analysis and their historical context and societal impact.',
    hasHomework: false,
  },
  
  // Samedi
  'sat-1': {
    id: 'sat-1',
    title: 'Weekend Workshop',
    startTime: '10:00am',
    endTime: '12:00pm',
    timeDisplay: '10:00am',
    backgroundColor: '#f9f0ff',
    theme: 'Special weekend workshop focusing on practical skills and project-based learning.',
    hasHomework: false,
  },
  
  // Cours de secours au cas où il y a un problème avec l'ID
  'default': {
    id: 'default',
    title: 'Course Information',
    startTime: '9:00am',
    endTime: '10:30am',
    timeDisplay: '9:00am',
    backgroundColor: '#f5f5f5',
    theme: 'Information for this course is not available.',
    hasHomework: false,
  }
};

export default function ClassDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const classId = params.classId as string;
  
  const [classInfo, setClassInfo] = useState(classesDatabase[classId] || classesDatabase['default']);
  const [timeToStart, setTimeToStart] = useState('');

  // Simulate time to start calculation
  useEffect(() => {
    // Dans un cas réel, on calculerait le temps restant avant le début du cours
    const randomMinutes = Math.floor(Math.random() * 90) + 30;
    setTimeToStart(`Will start in ${randomMinutes} min`);
  }, [classId]);

  const navigateTo = (path: any) => {
    router.push(path);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <Text style={styles.title}>{classInfo.title}</Text>
              <Text style={styles.timeInfo}>{timeToStart}</Text>
              <View style={styles.scheduleInfo}>
                <Ionicons name="time-outline" size={16} color="#666" style={styles.scheduleIcon} />
                <Text style={styles.scheduleText}>
                  {classInfo.startTime} - {classInfo.endTime}
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.courseColorBanner, { backgroundColor: classInfo.backgroundColor }]} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Students</Text>
            <View style={styles.studentsContainer}>
              {students.map(student => (
                <View key={student.id} style={styles.studentAvatar}>
                  <Image source={{ uri: student.avatar }} style={styles.avatar} />
                </View>
              ))}
              <View style={styles.moreStudents}>
                <Text style={styles.moreStudentsText}>+12</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Lessons theme</Text>
            <Text style={styles.lessonContent}>
              {classInfo.theme}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional materials</Text>
            <View style={styles.materialsList}>
              {books.map(book => (
                <View key={book.id} style={[styles.materialItem, { backgroundColor: book.color }]}>
                  <Image source={{ uri: book.cover }} style={styles.bookCover} resizeMode="contain" />
                  <View style={styles.pdfIcon}>
                    <Ionicons name="document-text" size={18} color="white" />
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Homework</Text>
            <View style={styles.homeworkContainer}>
              <Text style={styles.homeworkText}>
                {classInfo.hasHomework ? 'Attached' : 'No homework for this class'}
              </Text>
              {classInfo.hasHomework && (
                <View style={styles.checkIcon}>
                  <Ionicons name="checkmark" size={18} color="white" />
                </View>
              )}
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity 
            style={styles.joinButton} 
            onPress={() => navigateTo({
              pathname: "screens/VideoCall",
              params: { classId: classInfo.id }
            })}
          >
            <Text style={styles.joinButtonText}>Join class</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16 
  },
  backButton: {
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: '#f5f5f5',
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 16,
  },
  headerContent: { 
    flex: 1 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 4 
  },
  timeInfo: { 
    fontSize: 16, 
    color: '#666', 
    marginBottom: 4 
  },
  scheduleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleIcon: {
    marginRight: 4,
  },
  scheduleText: {
    fontSize: 14,
    color: '#666',
  },
  courseColorBanner: {
    height: 12,
    marginHorizontal: 16,
    borderRadius: 6,
    marginBottom: 8,
  },
  section: { 
    paddingHorizontal: 16, 
    paddingVertical: 20 
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 16 
  },
  studentsContainer: { 
    flexDirection: 'row' 
  },
  studentAvatar: { 
    marginRight: 8 
  },
  avatar: { 
    width: 48, 
    height: 48, 
    borderRadius: 24 
  },
  moreStudents: {
    width: 48, 
    height: 48, 
    borderRadius: 24, 
    backgroundColor: '#000',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  moreStudentsText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },
  lessonContent: { 
    fontSize: 16, 
    color: '#666', 
    lineHeight: 24 
  },
  materialsList: { 
    flexDirection: 'row', 
    justifyContent: 'flex-start' 
  },
  materialItem: {
    width: 120, 
    height: 150, 
    borderRadius: 8, 
    marginRight: 16,
    padding: 12, 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'relative',
  },
  bookCover: { 
    width: '100%', 
    height: '100%' 
  },
  pdfIcon: {
    position: 'absolute', 
    top: 8, 
    right: 8, 
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12, 
    padding: 4,
  },
  homeworkContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0', 
    padding: 12, 
    borderRadius: 8,
  },
  homeworkText: { 
    fontSize: 16 
  },
  checkIcon: {
    width: 24, 
    height: 24, 
    borderRadius: 12, 
    backgroundColor: 'green',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  bottomButtonContainer: {
    padding: 16, 
    borderTopWidth: 1, 
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  joinButton: {
    backgroundColor: '#2196F3', 
    padding: 16, 
    borderRadius: 8,
    alignItems: 'center',
  },
  joinButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
});