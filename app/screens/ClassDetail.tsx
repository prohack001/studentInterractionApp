import React, { useLayoutEffect } from 'react';
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

export default function ClassDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const navigateTo = (path:any) => {
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
              <Text style={styles.title}>English grammar</Text>
              <Text style={styles.timeInfo}>Will start in 1:20 min</Text>
            </View>
          </View>

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
              Review and extend your knowledge of the present simple, present perfect and
              present continuous tenses.
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
              <Text style={styles.homeworkText}>Attached</Text>
              <View style={styles.checkIcon}>
                <Ionicons name="checkmark" size={18} color="white" />
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity style={styles.joinButton} onPress={()=> navigateTo("screens/VideoCall")}>
            <Text style={styles.joinButtonText}>Join class</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  backButton: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#f5f5f5',
    justifyContent: 'center', alignItems: 'center', marginRight: 16,
  },
  headerContent: { flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  timeInfo: { fontSize: 16, color: '#666' },
  section: { paddingHorizontal: 16, paddingVertical: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  studentsContainer: { flexDirection: 'row' },
  studentAvatar: { marginRight: 8 },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  moreStudents: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: '#000',
    justifyContent: 'center', alignItems: 'center',
  },
  moreStudentsText: { color: '#fff', fontWeight: 'bold' },
  lessonContent: { fontSize: 16, color: '#666', lineHeight: 24 },
  materialsList: { flexDirection: 'row', justifyContent: 'flex-start' },
  materialItem: {
    width: 120, height: 150, borderRadius: 8, marginRight: 16,
    padding: 12, justifyContent: 'center', alignItems: 'center',
    position: 'relative',
  },
  bookCover: { width: '100%', height: '100%' },
  pdfIcon: {
    position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12, padding: 4,
  },
  homeworkContainer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#f0f0f0', padding: 12, borderRadius: 8,
  },
  homeworkText: { fontSize: 16 },
  checkIcon: {
    width: 24, height: 24, borderRadius: 12, backgroundColor: 'green',
    justifyContent: 'center', alignItems: 'center',
  },
  bottomButtonContainer: {
    padding: 16, borderTopWidth: 1, borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  joinButton: {
    backgroundColor: '#2196F3', padding: 16, borderRadius: 8,
    alignItems: 'center',
  },
  joinButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

ClassDetailScreen.options = {
  headerShown: false,
};
