import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';

const classesDatabase = {
  // Dimanche
  'sun-1': {
    id: 'sun-1',
    title: 'Weekend Study Group',
    startTime: '10:00am',
    endTime: '11:30am',
    teacher: 'Prof. Diabaté',
    thumbnail: 'https://i.pravatar.cc/300?img=28'
  },
  'sun-2': {
    id: 'sun-2',
    title: 'Art & Creativity',
    startTime: '1:00pm',
    endTime: '2:30pm',
    teacher: 'Mme. Sarr',
    thumbnail: 'https://i.pravatar.cc/300?img=29'
  },

  // Lundi
  'mon-1': {
    id: 'mon-1',
    title: 'Basic Mathematics',
    startTime: '08:00am',
    endTime: '8:45am',
    teacher: 'Dr. Ouattara',
    thumbnail: 'https://i.pravatar.cc/300?img=30'
  },
  'mon-2': {
    id: 'mon-2',
    title: 'French Literature',
    startTime: '10:00am',
    endTime: '11:10am',
    teacher: 'Mme. Kaboré',
    thumbnail: 'https://i.pravatar.cc/300?img=31'
  },
  'mon-3': {
    id: 'mon-3',
    title: 'Physics Lab',
    startTime: '1:00pm',
    endTime: '2:30pm',
    teacher: 'Prof. Bamba',
    thumbnail: 'https://i.pravatar.cc/300?img=32'
  },

  // Mardi
  'tue-1': {
    id: 'tue-1',
    title: 'Computer Science',
    startTime: '9:00am',
    endTime: '10:30am',
    teacher: 'M. Zongo',
    thumbnail: 'https://i.pravatar.cc/300?img=33'
  },
  'tue-2': {
    id: 'tue-2',
    title: 'English Grammar',
    startTime: '11:00am',
    endTime: '12:10pm',
    teacher: 'Mme. Bah',
    thumbnail: 'https://i.pravatar.cc/300?img=34'
  },
  'tue-3': {
    id: 'tue-3',
    title: 'Physical Education',
    startTime: '2:00pm',
    endTime: '3:30pm',
    teacher: 'Coach N’Dour',
    thumbnail: 'https://i.pravatar.cc/300?img=35'
  },

  // Default
  'default': {
    id: 'default',
    title: 'Class Session',
    startTime: '9:00am',
    endTime: '10:30am',
    teacher: 'M. Traoré',
    thumbnail: 'https://i.pravatar.cc/300?img=28'
  }
};

const participantsDatabase = {
  'sun-1': [
    { id: 1, name: 'Issa Koné', image: 'https://i.pravatar.cc/150?img=8' },
    { id: 2, name: 'Fatou Diallo', image: 'https://i.pravatar.cc/150?img=5' },
    { id: 3, name: 'Mohamed Coulibaly', image: 'https://i.pravatar.cc/150?img=13' },
    { id: 4, name: 'Aminata Sow', image: 'https://i.pravatar.cc/150?img=23' },
    { id: 5, name: 'Blaise Nguessan', image: 'https://i.pravatar.cc/150?img=11' },
  ],
  'sun-2': [
    { id: 1, name: 'Adjara Sanou', image: 'https://i.pravatar.cc/150?img=24' },
    { id: 2, name: 'Idrissa Keita', image: 'https://i.pravatar.cc/150?img=12' },
    { id: 3, name: 'Yacine Sow', image: 'https://i.pravatar.cc/150?img=21' },
    { id: 4, name: 'Khadija Traoré', image: 'https://i.pravatar.cc/150?img=30' },
  ],
  'mon-1': [
    { id: 1, name: 'Mariam Kéïta', image: 'https://i.pravatar.cc/150?img=31' },
    { id: 2, name: 'Abdoulaye Tapsoba', image: 'https://i.pravatar.cc/150?img=15' },
    { id: 3, name: 'Awa Cissé', image: 'https://i.pravatar.cc/150?img=25' },
  ],
  'mon-2': [
    { id: 1, name: 'Seydou Kamara', image: 'https://i.pravatar.cc/150?img=17' },
    { id: 2, name: 'Nafissatou Diop', image: 'https://i.pravatar.cc/150?img=33' },
    { id: 3, name: 'Oumar Sagna', image: 'https://i.pravatar.cc/150?img=18' },
    { id: 4, name: 'Assétou Fofana', image: 'https://i.pravatar.cc/150?img=34' },
    { id: 5, name: 'Djibril Traoré', image: 'https://i.pravatar.cc/150?img=19' },
  ],
  'default': [
    { id: 1, name: 'Issa Koné', image: 'https://i.pravatar.cc/150?img=8' },
    { id: 2, name: 'Fatou Diallo', image: 'https://i.pravatar.cc/150?img=5' },
    { id: 3, name: 'Mohamed Coulibaly', image: 'https://i.pravatar.cc/150?img=13' },
  ]
};

const chatDatabase = {
  'sun-1': [
    { id: 1, name: 'Issa Koné', time: '9:20am', message: 'Est-ce que tout le monde est prêt pour le projet ?' },
  ],
  'sun-2': [
    { id: 1, name: 'Adjara Sanou', time: '1:05pm', message: 'Quelqu’un a pensé à ramener des pinceaux ?' },
  ],
  'mon-1': [
    { id: 1, name: 'Mariam Kéïta', time: '8:10am', message: 'On peut revoir les divisions ?' },
  ],
  'mon-2': [
    { id: 1, name: 'Seydou Kamara', time: '10:15am', message: 'On est à quelle page dans le livre ?' },
  ],
  'tue-2': [
    { id: 1, name: 'Ina PARE', time: '9:27am', message: 'Dieu merci c\'est le dernier jour de cours 😂' },
  ],
  'default': [
    { id: 1, name: 'Chat', time: '9:00am', message: 'Bienvenue en classe ! Veuillez patienter pour le début du cours.' },
  ]
};


export default function EnhancedVideoCallScreen() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [message, setMessage] = useState('');
  const [callDuration, setCallDuration] = useState('00:00:00');
  
  // Get the class ID from URL params
  const params = useLocalSearchParams();
  const classId = params.classId ? String(params.classId) : 'default';
  
  // Get class info based on ID
  const classInfo = classesDatabase[classId] || classesDatabase['default'];
  const participants = participantsDatabase[classId] || participantsDatabase['default'];
  const chatMessages = chatDatabase[classId] || chatDatabase['default'];

  // Animation for raised hand
  const handAnimation = new Animated.Value(0);

  // Call duration timer
  useEffect(() => {
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    
    const timer = setInterval(() => {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
          minutes = 0;
          hours++;
        }
      }
      
      const formatTime = (val) => val.toString().padStart(2, '0');
      setCallDuration(`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Raised hand animation
  useEffect(() => {
    if (isHandRaised) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(handAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
          }),
          Animated.timing(handAnimation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
          })
        ])
      ).start();
    } else {
      handAnimation.setValue(0);
    }
  }, [isHandRaised]);

  const handScale = handAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2]
  });

  const sendMessage = () => {
    if (message.trim() !== '') {
      // In a real app, this would send the message to a backend
      console.log("Message sent:", message);
      setMessage('');
    }
  };

  const handleEndCall = () => {
    Alert.alert(
      "End Call",
      "Are you sure you want to leave this class?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Leave",
          onPress: () => router.back(),
          style: "destructive"
        }
      ]
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        {/* Main video call area */}
        <View style={styles.callContainer}>
          {/* Main video - teacher */}
          <Image
            source={{ uri: classInfo.thumbnail }}
            style={styles.mainVideo}
            resizeMode="cover"
          />

          {/* Semi-transparent overlay for controls */}
          <View style={styles.videoOverlay}>
            {/* Call header with title and duration */}
            <View style={styles.callHeader}>
              <TouchableOpacity style={styles.backButton} onPress={handleEndCall}>
                <Ionicons name="chevron-back" size={24} color="white" />
              </TouchableOpacity>
              <View>
                <Text style={styles.callTitle}>{classInfo.title}</Text>
                <Text style={styles.callDuration}>{callDuration}</Text>
              </View>
              <View style={styles.teacherInfo}>
                <Text style={styles.teacherName}>{classInfo.teacher}</Text>
              </View>
            </View>
          </View>

          {/* Self view (your camera) */}
          <View style={styles.selfViewContainer}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=32' }}
              style={[styles.selfView, !isVideoOn && styles.videoOff]}
              resizeMode="cover"
            />
            {!isVideoOn && (
              <View style={styles.videoOffIndicator}>
                <Ionicons name="videocam-off" size={24} color="white" />
              </View>
            )}
          </View>

          {/* Call controls */}
          <View style={styles.callControls}>
            <TouchableOpacity
              style={[styles.controlButton, isMuted && styles.controlActive]}
              onPress={() => setIsMuted(!isMuted)}
            >
              <Ionicons name={isMuted ? "mic-off" : "mic"} size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, !isVideoOn && styles.controlActive]}
              onPress={() => setIsVideoOn(!isVideoOn)}
            >
              <Ionicons name={isVideoOn ? "videocam" : "videocam-off"} size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, isHandRaised && styles.controlActive]}
              onPress={() => setIsHandRaised(!isHandRaised)}
            >
              <Animated.View style={{ transform: [{ scale: handScale }] }}>
                <Ionicons name="hand-right" size={24} color="white" />
              </Animated.View>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.controlButton, styles.endCallButton]}
              onPress={handleEndCall}
            >
              <Ionicons name="call" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Participants section */}
        <View style={styles.participantsContainer}>
          <TouchableOpacity style={styles.addParticipant}>
            <Ionicons name="add" size={24} color="black" />
          </TouchableOpacity>

          <View style={styles.scrollableParticipants}>
            {participants.slice(0, 3).map(participant => (
              <Image
                key={participant.id}
                source={{ uri: participant.image }}
                style={styles.participantAvatar}
                resizeMode="cover"
              />
            ))}
          </View>

          {participants.length > 3 && (
            <TouchableOpacity style={styles.moreParticipants}>
              <Text style={styles.moreParticipantsText}>+{participants.length - 3}</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Chat area */}
        <View style={styles.chatContainer}>
          {chatMessages.map(msg => (
            <View key={msg.id} style={styles.chatMessage}>
              <View style={styles.messageHeader}>
                <Text style={styles.senderName}>{msg.name}</Text>
                <Text style={styles.messageTime}>{msg.time}</Text>
              </View>
              <Text style={styles.messageContent}>
                {msg.message}
              </Text>
            </View>
          ))}

          {/* Message input */}
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.attachButton}>
              <Ionicons name="attach" size={24} color="#555" />
            </TouchableOpacity>

            <TextInput
              style={styles.textInput}
              placeholder="Text message..."
              placeholderTextColor="#999"
              value={message}
              onChangeText={setMessage}
            />

            {message.trim() !== '' && (
              <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                <Ionicons name="send" size={20} color="#007AFF" />
              </TouchableOpacity>
            )}
          </View>
        </View>

      </SafeAreaView>
    </>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F2F2',
  },
  callContainer: {
    width: '100%',
    height: '60%',
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  mainVideo: {
    width: '100%',
    height: '100%',
    backgroundColor: '#555',
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  callHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  callTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  callDuration: {
    color: 'white',
    fontSize: 14,
    opacity: 0.8,
  },
  teacherInfo: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  teacherName: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  selfViewContainer: {
    position: 'absolute',
    left: 16,
    bottom: 80,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',
    width: 100,
    height: 100,
  },
  selfView: {
    width: '100%',
    height: '100%',
  },
  videoOff: {
    opacity: 0.5,
  },
  videoOffIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  callControls: {
    position: 'absolute',
    right: 16,
    bottom: 80,
    alignItems: 'center',
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  controlActive: {
    backgroundColor: '#FF3B30',
  },
  endCallButton: {
    backgroundColor: '#FF3B30',
    transform: [{ rotate: '135deg' }],
  },
  participantsContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  addParticipant: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  scrollableParticipants: {
    flexDirection: 'row',
  },
  participantAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  moreParticipants: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreParticipantsText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  chatMessage: {
    marginBottom: 16,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  senderName: {
    fontWeight: '600',
    fontSize: 16,
  },
  messageTime: {
    color: '#666',
    fontSize: 14,
  },
  messageContent: {
    fontSize: 15,
    lineHeight: 20,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 'auto',
  },
  attachButton: {
    padding: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    padding: 8,
    color: '#333',
  },
  sendButton: {
    padding: 8,
  },
});