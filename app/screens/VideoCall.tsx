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
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';

export default function EnhancedVideoCallScreen() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [message, setMessage] = useState('');

  // Animation pour la main levée
  const handAnimation = new Animated.Value(0);

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

  // Données des participants
  const participants = [
    { id: 1, name: 'Jake Wilson', image: 'https://i.pravatar.cc/150?img=8' },
    { id: 2, name: 'Sarah Chen', image: 'https://i.pravatar.cc/150?img=5' },
    { id: 3, name: 'Michael Smith', image: 'https://i.pravatar.cc/150?img=13' },
    { id: 4, name: 'Laura Jones', image: 'https://i.pravatar.cc/150?img=23' },
    { id: 5, name: 'Carlos Diaz', image: 'https://i.pravatar.cc/150?img=11' },
    // Plus de participants...
  ];

  const sendMessage = () => {
    if (message.trim() !== '') {
      // Logique pour envoyer le message
      console.log("Message sent:", message);
      setMessage('');
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        {/* Zone principale de l'appel vidéo */}
        <View style={styles.callContainer}>
          {/* Image principale */}
          <Image
            source={{ uri: 'https://i.pravatar.cc/300?img=28' }}
            style={styles.mainVideo}
            resizeMode="cover"
          />

          {/* Overlay semi-transparent pour les contrôles */}
          <View style={styles.videoOverlay}>
            {/* Header de l'appel avec titre et durée */}
            <View style={styles.callHeader}>
              <TouchableOpacity style={styles.backButton} onPress={()=>{router.back()}}>
                <Ionicons name="chevron-back" size={24} color="white" />
              </TouchableOpacity>
              <View>
                <Text style={styles.callTitle}>English Grammar</Text>
                <Text style={styles.callDuration}>00:22:25</Text>
              </View>
            </View>
          </View>

          {/* Miniature de l'utilisateur */}
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

          {/* Contrôles de l'appel */}
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
          </View>
        </View>

        {/* Section des participants */}
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

          <TouchableOpacity style={styles.moreParticipants}>
            <Text style={styles.moreParticipantsText}>+{participants.length - 3}</Text>
          </TouchableOpacity>
        </View>

        {/* Zone de chat */}
        <View style={styles.chatContainer}>
          <View style={styles.chatMessage}>
            <View style={styles.messageHeader}>
              <Text style={styles.senderName}>Ina PARE</Text>
              <Text style={styles.messageTime}>9:27am</Text>
            </View>
            <Text style={styles.messageContent}>
              Dieu merci c'est le dernier jour de cours 😂
            </Text>
          </View>

          {/* Input de message */}
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
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 10,
  },
  timeText: {
    fontWeight: '600',
    fontSize: 16,
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginLeft: 5,
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
  homeIndicator: {
    width: 140,
    height: 5,
    backgroundColor: '#000',
    borderRadius: 3,
    alignSelf: 'center',
    marginVertical: 8,
  },
});