import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, StatusBar, Modal, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Type pour une notification
interface Notification {
  id: string;
  subject: string;
  message: string;
  date: 'Today' | 'Yesterday';
  icon: string;
  color: string;
  iconBackgroundColor: string;
  grade?: string;
  time?: string;
  teacherName?: string;
  teacherAvatar?: string;
  detailMessage?: string;
}

// Données des notifications
const notifications: Notification[] = [
  {
    id: '1',
    subject: 'Basic mathematic',
    message: 'You got A+ today.',
    date: 'Today',
    icon: 'calculator-outline',
    color: '#f8f9fe',
    iconBackgroundColor: '#f8f9fe',
    grade: 'A+',
    time: 'Today, 1:15pm',
    teacherName: 'Eleanor Pena',
    teacherAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    detailMessage: 'Great job! You mastered the concepts well.',
  },
  {
    id: '2',
    subject: 'English grammar',
    message: 'You have unfinished homework.',
    date: 'Today',
    icon: 'book-outline',
    color: '#eafbf3',
    iconBackgroundColor: '#eafbf3',
    time: 'Today, 11:30am',
    teacherName: 'Robert Johnson',
    teacherAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    detailMessage: 'Please complete your assignment as soon as possible.',
  },
  {
    id: '3',
    subject: 'World history',
    message: 'Congrats! You got A+ yesterday.',
    date: 'Today',
    icon: 'globe-outline',
    color: '#fdf2fb',
    iconBackgroundColor: '#fdf2fb',
    grade: 'A+',
    time: 'Today, 9:45am',
    teacherName: 'Maria Garcia',
    teacherAvatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    detailMessage: 'Excellent work on your history project!',
  },
  {
    id: '4',
    subject: 'Science',
    message: 'You got D+ today.',
    date: 'Yesterday',
    icon: 'flask-outline',
    color: '#fdf9ea',
    iconBackgroundColor: '#fdf9ea',
    grade: 'D+',
    time: 'Today, 1:15pm',
    teacherName: 'Eleanor Pena',
    teacherAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    detailMessage: 'Sad, but you need to improve your knowledge',
  },
  {
    id: '5',
    subject: 'World history',
    message: 'You have unfinished homework.',
    date: 'Yesterday',
    icon: 'globe-outline',
    color: '#fdf2fb',
    iconBackgroundColor: '#fdf2fb',
    time: 'Yesterday, 3:20pm',
    teacherName: 'Maria Garcia',
    teacherAvatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    detailMessage: 'Please submit your essay by tomorrow.',
  },
  {
    id: '6',
    subject: 'Basic mathematic',
    message: 'You got A+ today.',
    date: 'Yesterday',
    icon: 'calculator-outline',
    color: '#f8f9fe',
    iconBackgroundColor: '#f8f9fe',
    grade: 'A+',
    time: 'Yesterday, 10:05am',
    teacherName: 'Eleanor Pena',
    teacherAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    detailMessage: 'Excellent work on algebra!',
  },
];

const NotificationsScreen: React.FC = () => {
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  // Grouper les notifications par date
  const groupedNotifications: { [key: string]: Notification[] } = {};
  
  notifications.forEach(notification => {
    if (!groupedNotifications[notification.date]) {
      groupedNotifications[notification.date] = [];
    }
    groupedNotifications[notification.date].push(notification);
  });

  // Fonction pour ouvrir le modal avec la notification sélectionnée
  const openNotificationDetail = (notification: Notification) => {
    setSelectedNotification(notification);
    setModalVisible(true);
  };

  // Fermer le modal
  const closeModal = () => {
    setModalVisible(false);
  };
  const router = useRouter();

  // Rendu d'une notification
  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity 
      style={[styles.notificationCard, { backgroundColor: item.color }]}
      onPress={() => openNotificationDetail(item)}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.iconBackgroundColor }]}>
        <Ionicons name={item.icon as any} size={24} color="black" />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.subjectText}>{item.subject}</Text>
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={()=> router.back()}>
          <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>12</Text>
        </View>
        <TouchableOpacity style={styles.checkAllButton}>
          <Ionicons name="checkmark-done-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={Object.keys(groupedNotifications)}
        keyExtractor={(item) => item}
        renderItem={({ item: date }) => (
          <View>
            <Text style={styles.dateHeader}>{date}</Text>
            {groupedNotifications[date].map((notification) => (
              <View key={notification.id}>
                {renderNotification({ item: notification })}
              </View>
            ))}
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal de détail de notification */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            
            {selectedNotification && selectedNotification.grade && (
              <View style={styles.gradeContainer}>
                <Text style={styles.gradeText}>{selectedNotification.grade}</Text>
              </View>
            )}
            
            {selectedNotification && (
              <>
                <Text style={styles.detailMessageText}>
                  {selectedNotification.detailMessage || selectedNotification.message}
                </Text>
                
                <View style={styles.detailCard}>
                  <Text style={styles.detailSubject}>{selectedNotification.subject}</Text>
                  <Text style={styles.detailTime}>{selectedNotification.time}</Text>
                  
                  <View style={styles.teacherContainer}>
                    {selectedNotification.teacherAvatar && (
                      <Image 
                        source={{ uri: selectedNotification.teacherAvatar }} 
                        style={styles.teacherAvatar} 
                      />
                    )}
                    <Text style={styles.teacherName}>{selectedNotification.teacherName}</Text>
                  </View>
                </View>
                
                <TouchableOpacity style={styles.lessonButton}>
                  <Text style={styles.lessonButtonText}>Lessons materials</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
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
    alignItems: 'center',
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  badge: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkAllButton: {
    marginLeft: 'auto',
    padding: 8,
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 16,
    color: '#555',
  },
  notificationCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationContent: {
    marginLeft: 16,
    flex: 1,
  },
  subjectText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
    color: '#666',
  },
  // Styles pour le modal de détail
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#fff9e6', // couleur crème du modal
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    alignItems: 'center',
    height: '60%',
  },
  modalHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginBottom: 20,
  },
  gradeContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  gradeText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  detailMessageText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  detailCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 24,
  },
  detailSubject: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detailTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  teacherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teacherAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  teacherName: {
    fontSize: 14,
    fontWeight: '500',
  },
  lessonButton: {
    backgroundColor: 'black',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  lessonButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NotificationsScreen;