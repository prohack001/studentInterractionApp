import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { ArrowLeft, Play, CheckCircle, Clock } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '@/utils/colors';



const HomeworkDetails = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Récupérez les données du homework
  const homework = {
    id: params.id,
    name: params.name,
    iconName: params.iconName,
    duree: params.duree,
    finiOuPas: params.finiOuPas,
    couleur: params.couleur,
  };

  // Données factices pour les leçons et tâches (à remplacer par vos vraies données)
  const videoLessons = [
    {
      id: '1',
      title: 'Intro',
      duration: '30 min',
    },
    {
      id: '2',
      title: 'Concepts de base',
      duration: '25 min',
    },
  ];

  const tasks = [
    { id: '1', duration: '30 min', status: homework.finiOuPas === '1' ? 'uploaded' : 'to do' },
    { id: '2', duration: '60 min', status: 'to do' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{homework.name}</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Informations sur le homework */}
        <View style={styles.homeworkInfo}>
          <View style={[styles.iconContainer, { backgroundColor: colors[homework.couleur] || colors.purple }]}>
            <FontAwesome6 name={homework.iconName} size={32} color="black" />
          </View>
          <View style={styles.infoText}>
            <Text style={styles.duration}>Durée: {homework.duree}</Text>
            <Text style={styles.status}>
              Statut: {homework.finiOuPas === '1' ? 'Terminé' : 'En attente'}
            </Text>
          </View>
        </View>

        {/* Lessons Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Leçons</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Voir tout</Text>
          </TouchableOpacity>
        </View>

        {/* Liste des leçons */}
        {videoLessons.map((lesson) => (
          <View key={lesson.id} style={styles.lessonItem}>
            <Play size={20} color="#666" style={styles.lessonIcon} />
            <View style={styles.lessonInfo}>
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
              <Text style={styles.lessonDuration}>{lesson.duration}</Text>
            </View>
          </View>
        ))}

        {/* Tasks Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tâches</Text>
          <Text style={styles.tasksProgress}>
            Terminé: {tasks.filter(t => t.status === 'uploaded').length}/{tasks.length}
          </Text>
        </View>

        {/* Liste des tâches */}
        {tasks.map((task, index) => (
          <View key={task.id} style={styles.taskItem}>
            <View style={styles.taskLeftSection}>
              <Text style={styles.taskNumber}>Tâche {index + 1}</Text>
              <View style={styles.taskDuration}>
                <Clock size={16} color="#666" />
                <Text style={styles.taskDurationText}>{task.duration}</Text>
              </View>
            </View>
            <View>
              <Text style={task.status === 'uploaded' ? styles.uploadedStatus : styles.todoStatus}>
                {task.status === 'uploaded' ? 'Terminé' : 'À faire'}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  homeworkInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  iconContainer: {
    padding: 16,
    borderRadius: 12,
    marginRight: 16,
  },
  infoText: {
    flex: 1,
  },
  duration: {
    fontSize: 16,
    marginBottom: 8,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#666',
  },
  tasksProgress: {
    color: '#666',
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  lessonIcon: {
    marginRight: 16,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lessonDuration: {
    color: '#666',
    fontSize: 14,
    marginTop: 4,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  taskLeftSection: {
    gap: 8,
  },
  taskNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDuration: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  taskDurationText: {
    color: '#666',
    fontSize: 14,
  },
  uploadedStatus: {
    color: '#4caf50',
    fontWeight: 'bold',
  },
  todoStatus: {
    color: '#666',
    fontWeight: 'bold',
  },
});

export default HomeworkDetails;