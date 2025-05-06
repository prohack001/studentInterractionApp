import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.get('https://strapi-server-app-m49w.onrender.com/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
    
      <LinearGradient colors={['#e0f2ff', '#ffffff']} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.profileHeader}
              onPress={() => router.push('/screens/EditProfileScreen')}
            >
              <Image 
                source={userData?.avatar ? { uri: userData.avatar.url } : require('../../assets/images/react-logo.png')} 
                style={styles.profileImage} 
              />
              <View style={styles.profileText}>
                <Text style={styles.username}>{userData?.username || 'Utilisateur'}</Text>
                <Text style={styles.grade}>{userData?.grade || ''}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Informations Personnelles</Text>
            
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Ionicons name="mail-outline" size={20} color="#555" />
                <Text style={styles.infoText}>{userData?.email || 'Non renseigné'}</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="mail-outline" size={20} color="#555" />
                <Text style={styles.infoText}>{userData?.username || 'Non renseigné'}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Ionicons name="call-outline" size={20} color="#555" />
                <Text style={styles.infoText}>{userData?.phoneNumber || 'Non renseigné'}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Ionicons name="accessibility" size={20} color="#555" />
                <Text style={styles.infoText}>{userData?.lastName || 'Non renseigné'}</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="accessibility-outline" size={20} color="#555" />
                <Text style={styles.infoText}>{userData?.firstName || 'Non renseigné'}</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="school" size={20} color="#555" />
                <Text style={styles.infoText}>{userData?.etablissement || 'Non renseigné'}</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="school-outline" size={20} color="#555" />
                <Text style={styles.infoText}>{userData?.classe || 'Non renseigné'}</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="calendar" size={20} color="#555" />
                <Text style={styles.infoText}>{userData?.dateNaissance || 'Non renseigné'}</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="earth" size={20} color="#555" />
                <Text style={styles.infoText}>{userData?.pays || 'Non renseigné'}</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="business" size={20} color="#555" />
                <Text style={styles.infoText}>{userData?.ville || 'Non renseigné'}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => router.push('/screens/EditProfileScreen')}
          >
            <Text style={styles.editButtonText}>Modifier le profil</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  profileText: {
    marginLeft: 15,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  grade: {
    fontSize: 16,
    color: '#666',
  },
  infoSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  editButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;