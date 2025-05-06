// import { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
// import { useRouter, Stack } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import GlobalApi from '../Shared/GlobalApi';

// const EditProfileScreen = () => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     phoneNumber: '',
//     ville: '',
//     pays: '',
//     firstName: '',
//     lastName:'',
//     classe:'',
//     etablissement: '',
//   });

//   useEffect(() => {
//     getAuthenticatedUser();
//   }, []);
  
//   const getAuthenticatedUser = async () => {
//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       const response = await GlobalApi.getAuthenticatedUser(token);
//       const result = response.data;
  
//       console.log("User data", result);
//       setFormData({
//         username: result.username || '',
//         email: result.email || '',
//         phoneNumber: result.phoneNumber || '',
//         ville: result.ville || '',
//         classe: result.classe || '',
//         pays: result.pays || '',
//         lastName: result.lastName || '',
//         firstName: result.firstName || '',
//         etablissement: result.etablissement || '',
//       });
//     } catch (error) {
//       console.error("Erreur dans getAuthenticatedUser():", error);
//       Alert.alert('Erreur', 'Impossible de charger les données du profil');
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   const handleUpdateProfile = async () => {
//     setUpdating(true);
//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       console.log("Data envoyée :", formData);
//       await axios.put(
//         'https://strapi-server-app-m49w.onrender.com/api/users/me',
//         { ...formData },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
      
//       Alert.alert('Succès', 'Profil mis à jour avec succès');
//       router.back();
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       Alert.alert('Erreur', 'Échec de la mise à jour du profil');
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   return (
//     <>
//         <Stack.Screen options={{ headerShown: false }} />
//         <LinearGradient colors={['#e0f2ff', '#ffffff']} style={styles.container}>
//         <ScrollView contentContainerStyle={styles.scrollContainer}>
//             <Text style={styles.title}>Modifier le profil</Text>
            
//             <View style={styles.inputGroup}>
//             <Text style={styles.label}>Nom d'utilisateur</Text>
//             <TextInput
//                 style={styles.input}
//                 value={formData.username}
//                 onChangeText={(text) => setFormData({ ...formData, username: text })}
//                 placeholder="Entrez votre nom d'utilisateur"
//             />
//             </View>
            
//             <View style={styles.inputGroup}>
//             <Text style={styles.label}>Email</Text>
//             <TextInput
//                 style={styles.input}
//                 value={formData.email}
//                 onChangeText={(text) => setFormData({ ...formData, email: text })}
//                 keyboardType="email-address"
//                 placeholder="Entrez votre email"
//             />
//             </View>

//             <View style={styles.inputGroup}>
//             <Text style={styles.label}>Nom de famille</Text>
//             <TextInput
//                 style={styles.input}
//                 value={formData.lastName}
//                 onChangeText={(text) => setFormData({ ...formData, lastName: text })}
//                 placeholder="Entrez votre nom de famille"
//             />
//             </View>

//             <View style={styles.inputGroup}>
//             <Text style={styles.label}>Prénom(s)</Text>
//             <TextInput
//                 style={styles.input}
//                 value={formData.firstName}
//                 onChangeText={(text) => setFormData({ ...formData, firstName: text })}
//                 placeholder="Entrez votre département"
//             />
//             </View>
            
//             <View style={styles.inputGroup}>
//             <Text style={styles.label}>Téléphone</Text>
//             <TextInput
//                 style={styles.input}
//                 value={formData.phoneNumber}
//                 onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
//                 keyboardType="phone-pad"
//                 placeholder="Entrez votre numéro de téléphone"
//             />
//             </View>
            
//             <View style={styles.inputGroup}>
//             <Text style={styles.label}>Pays</Text>
//             <TextInput
//                 style={styles.input}
//                 value={formData.pays}
//                 onChangeText={(text) => setFormData({ ...formData, pays: text })}
//                 placeholder="Entrez votre pays"
//             />
//             </View>

//             <View style={styles.inputGroup}>
//             <Text style={styles.label}>Ville</Text>
//             <TextInput
//                 style={styles.input}
//                 value={formData.ville}
//                 onChangeText={(text) => setFormData({ ...formData, ville: text })}
//                 placeholder="Entrez votre ville"
//             />
//             </View>
            
//             <View style={styles.inputGroup}>
//             <Text style={styles.label}>Classe</Text>
//             <TextInput
//                 style={styles.input}
//                 value={formData.classe}
//                 onChangeText={(text) => setFormData({ ...formData, classe: text })}
//                 placeholder="Entrez votre classe"
//             />
//             </View>

//             <TouchableOpacity 
//             style={styles.saveButton}
//             onPress={handleUpdateProfile}
//             disabled={updating}
//             >
//             {updating ? (
//                 <ActivityIndicator color="white" />
//             ) : (
//                 <Text style={styles.saveButtonText}>Enregistrer les modifications</Text>
//             )}
//             </TouchableOpacity>
//         </ScrollView>
//         </LinearGradient>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   scrollContainer: {
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     textAlign: 'center',
//     color: '#333',
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 8,
//     color: '#555',
//   },
//   input: {
//     backgroundColor: 'white',
//     padding: 15,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     fontSize: 16,
//   },
//   saveButton: {
//     backgroundColor: '#007AFF',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   saveButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default EditProfileScreen;


import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalApi from '../Shared/GlobalApi';

const EditProfileScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    ville: '',
    pays: '',
    firstName: '',
    lastName: '',
    classe: '',
    etablissement: '',
  });

  useEffect(() => {
    getAuthenticatedUser();
  }, []);

  const getAuthenticatedUser = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await GlobalApi.getAuthenticatedUser(token);
      const result = response.data;

      console.log("User data", result);
      setFormData({
        username: result.username || '',
        email: result.email || '',
        phoneNumber: result.phoneNumber || '',
        ville: result.ville || '',
        classe: result.classe || '',
        pays: result.pays || '',
        lastName: result.lastName || '',
        firstName: result.firstName || '',
        etablissement: result.etablissement || '',
      });
    } catch (error) {
      console.error("Erreur dans getAuthenticatedUser():", error);
      setError('Impossible de charger les données du profil');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    setUpdating(true);
    setError(null);
    
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Vérification des champs requis
      if (!formData.username || !formData.email) {
        throw new Error('Username and email are required');
      }

      console.log("Data envoyée :", formData);
      
      const response = await axios.put(
        'https://strapi-server-app-m49w.onrender.com/api/users/me',
        { 
          username: formData.username,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          ville: formData.ville,
          pays: formData.pays,
          firstName: formData.firstName,
          lastName: formData.lastName,
          classe: formData.classe,
          etablissement: formData.etablissement,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("Response data:", response.data);
      
      Alert.alert('Succès', 'Profil mis à jour avec succès');
      router.back();
    } catch (error) {
      console.error('Error updating profile:', error);
      const errorMessage = error.response?.data?.error?.message || 
                          error.message || 
                          'Échec de la mise à jour du profil';
      setError(errorMessage);
      Alert.alert('Erreur', errorMessage);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error && !loading) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={getAuthenticatedUser}
        >
          <Text style={styles.retryButtonText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient colors={['#e0f2ff', '#ffffff']} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Modifier le profil</Text>
          
          {error && (
            <View style={styles.errorBanner}>
              <Ionicons name="warning" size={20} color="white" />
              <Text style={styles.errorBannerText}>{error}</Text>
            </View>
          )}
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nom d'utilisateur *</Text>
            <TextInput
              style={styles.input}
              value={formData.username}
              onChangeText={(text) => setFormData({ ...formData, username: text })}
              placeholder="Entrez votre nom d'utilisateur"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              placeholder="Entrez votre email"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nom de famille</Text>
            <TextInput
              style={styles.input}
              value={formData.lastName}
              onChangeText={(text) => setFormData({ ...formData, lastName: text })}
              placeholder="Entrez votre nom de famille"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Prénom(s)</Text>
            <TextInput
              style={styles.input}
              value={formData.firstName}
              onChangeText={(text) => setFormData({ ...formData, firstName: text })}
              placeholder="Entrez votre prénom"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Téléphone</Text>
            <TextInput
              style={styles.input}
              value={formData.phoneNumber}
              onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
              keyboardType="phone-pad"
              placeholder="Entrez votre numéro de téléphone"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pays</Text>
            <TextInput
              style={styles.input}
              value={formData.pays}
              onChangeText={(text) => setFormData({ ...formData, pays: text })}
              placeholder="Entrez votre pays"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ville</Text>
            <TextInput
              style={styles.input}
              value={formData.ville}
              onChangeText={(text) => setFormData({ ...formData, ville: text })}
              placeholder="Entrez votre ville"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Classe</Text>
            <TextInput
              style={styles.input}
              value={formData.classe}
              onChangeText={(text) => setFormData({ ...formData, classe: text })}
              placeholder="Entrez votre classe"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Établissement</Text>
            <TextInput
              style={styles.input}
              value={formData.etablissement}
              onChangeText={(text) => setFormData({ ...formData, etablissement: text })}
              placeholder="Entrez votre établissement"
            />
          </View>

          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleUpdateProfile}
            disabled={updating}
          >
            {updating ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.saveButtonText}>Enregistrer les modifications</Text>
            )}
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  errorBanner: {
    backgroundColor: '#ff3b30',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  errorBannerText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 14,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    width: 150,
  },
  retryButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditProfileScreen;