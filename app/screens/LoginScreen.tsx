// import React, { useState } from 'react';
// import { View, StyleSheet, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Platform, Image, Animated, ActivityIndicator } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons, Feather, FontAwesome } from '@expo/vector-icons';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Easing } from 'react-native';
// import { useRouter, Stack } from 'expo-router';

// const LoginSchema = Yup.object().shape({
//   email: Yup.string().email('Email invalide').required('Requis'),
//   password: Yup.string().min(6, '6 caractères minimum').required('Requis'),
// });

// const LoginScreen = () => {
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const fadeAnim = new Animated.Value(0);
//   const slideUp = new Animated.Value(50);
//   const router = useRouter();

//   React.useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 800,
//         useNativeDriver: true,
//       }),
//       Animated.timing(slideUp, {
//         toValue: 0,
//         duration: 800,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       })
//     ]).start();
//   }, []);

//   const handleLogin = async (values) => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.post('https://strapi-server-app-m49w.onrender.com/api/auth/local', {
//         identifier: values.email,
//         password: values.password,
//       });
      
//       await AsyncStorage.setItem('userToken', response.data.jwt);
//       router.replace('/(tabs)');
      
//     } catch (err) {
//       setError(err.response?.data?.error?.message || 'Erreur de connexion');
//       console.error('Login error:', err.response?.data || err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
    
//     <Stack.Screen options={{ headerShown: false }} />
//     <View style={styles.container}>
//       <LinearGradient
//         colors={['#ffffff', '#f5f9ff', '#3b4af5']}
//         style={StyleSheet.absoluteFill}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       />
      
//       <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
//         <Image 
//           source={require('../../assets/images/accueil/logo.jpg')} 
//           style={styles.logo}
//         />
//         <Text style={styles.title}>Connexion</Text>
//       </Animated.View>

//       <Animated.View style={[styles.formContainer, { opacity: fadeAnim, transform: [{ translateY: slideUp }] }]}>
//         <Formik
//           initialValues={{ email: '', password: '' }}
//           validationSchema={LoginSchema}
//           onSubmit={handleLogin}
//         >
//           {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
//             <>
//               {/* Affichage de l'erreur de connexion au-dessus du champ email */}
//               {error ? (
//                 <View style={styles.errorContainer}>
//                   <Ionicons name="warning" size={18} color="#ff3b30" />
//                   <Text style={styles.errorText}>Email ou mot de passe incorrect(s)</Text>
//                 </View>
//               ) : null}

//               {/* Input Email */}
//               <View style={styles.inputWrapper}>
//                 <Feather name="mail" size={20} color="#8e8e93" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Email"
//                   placeholderTextColor="#8e8e93"
//                   onChangeText={handleChange('email')}
//                   onBlur={handleBlur('email')}
//                   value={values.email}
//                   keyboardType="email-address"
//                   autoCapitalize="none"
//                 />
//                 {values.email && !errors.email && (
//                   <FontAwesome name="check-circle" size={20} color="#34c759" style={styles.validationIcon} />
//                 )}
//               </View>
//               {errors.email && touched.email && (
//                 <Text style={styles.validationError}>{errors.email}</Text>
//               )}

//               {/* Input Password */}
//               <View style={styles.inputWrapper}>
//                 <Feather name="lock" size={20} color="#8e8e93" style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Mot de passe"
//                   placeholderTextColor="#8e8e93"
//                   onChangeText={handleChange('password')}
//                   onBlur={handleBlur('password')}
//                   value={values.password}
//                   secureTextEntry
//                 />
//                 {values.password && !errors.password && (
//                   <FontAwesome name="check-circle" size={20} color="#34c759" style={styles.validationIcon} />
//                 )}
//               </View>
//               {errors.password && touched.password && (
//                 <Text style={styles.validationError}>{errors.password}</Text>
//               )}

//               {/* Bouton Connexion */}
//               <TouchableOpacity 
//                 onPress={handleSubmit} 
//                 style={styles.loginButton}
//                 activeOpacity={0.9}
//                 disabled={loading}
//               >
//                 <LinearGradient
//                   colors={['#007AFF', '#0051ff']}
//                   style={styles.buttonGradient}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                 >
//                   {loading ? (
//                     <ActivityIndicator color="white" />
//                   ) : (
//                     <>
//                       <Text style={styles.buttonText}>Se connecter</Text>
//                       <Ionicons name="arrow-forward" size={20} color="white" />
//                     </>
//                   )}
//                 </LinearGradient>
//               </TouchableOpacity>
//             </>
//           )}
//         </Formik>

//         {/* Lien Inscription */}
//         <TouchableOpacity 
//           onPress={() => router.push('/screens/RegisterScreen')}
//           style={styles.switchAuth}
//         >
//           <Text style={styles.switchText}>
//             Pas de compte ? <Text style={styles.switchHighlight}>S'inscrire</Text>
//           </Text>
//         </TouchableOpacity>
//       </Animated.View>
//     </View>
//     </>
//   );
// };

// // Les styles restent identiques
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 30,
//     backgroundColor: '#ffffff',
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 20,
//     borderWidth: 2,
//     borderColor: '#007AFF',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#1c1c1e',
//     letterSpacing: 0.5,
//   },
//   formContainer: {
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 25,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 15,
//     elevation: 5,
//   },
//   errorContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#ff3b3010',
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   errorText: {
//     color: '#ff3b30',
//     marginLeft: 8,
//     fontSize: 14,
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#e5e5ea',
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     marginBottom: 10,
//     height: 55,
//   },
//   inputIcon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     height: '100%',
//     color: '#1c1c1e',
//     fontSize: 16,
//   },
//   validationIcon: {
//     marginLeft: 10,
//   },
//   validationError: {
//     color: '#ff3b30',
//     fontSize: 13,
//     marginBottom: 15,
//     marginLeft: 5,
//   },
//   loginButton: {
//     borderRadius: 12,
//     overflow: 'hidden',
//     marginTop: 20,
//     height: 55,
//   },
//   buttonGradient: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//     marginRight: 10,
//   },
//   switchAuth: {
//     marginTop: 25,
//     alignSelf: 'center',
//   },
//   switchText: {
//     color: '#8e8e93',
//     fontSize: 15,
//   },
//   switchHighlight: {
//     color: '#007AFF',
//     fontWeight: '600',
//     textDecorationLine: 'underline',
//   },
// });

// export default LoginScreen;

import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  KeyboardAvoidingView, 
  Platform, 
  Image, 
  Animated, 
  ActivityIndicator 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Ionicons, Feather, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Easing } from 'react-native';
import { useRouter, Stack } from 'expo-router';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email invalide').required('Requis'),
  password: Yup.string().min(6, '6 caractères minimum').required('Requis'),
});

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fadeAnim = new Animated.Value(0);
  const slideUp = new Animated.Value(50);
  const router = useRouter();

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideUp, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleLogin = async (values) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('https://strapi-server-app-m49w.onrender.com/api/auth/local', {
        identifier: values.email,
        password: values.password,
      });
      
      await AsyncStorage.setItem('userToken', response.data.jwt);
      router.replace('/(tabs)');
      
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 'Erreur de connexion';
      setError(errorMessage);
      console.error('Login error:', err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <LinearGradient
          colors={['#ffffff', '#f5f9ff', '#3b4af5']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <Image 
            source={require('../../assets/images/accueil/logo.jpg')} 
            style={styles.logo}
          />
          <Text style={styles.title}>Connexion</Text>
        </Animated.View>

        <Animated.View style={[styles.formContainer, { opacity: fadeAnim, transform: [{ translateY: slideUp }] }]}>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                {/* Affichage de l'erreur serveur */}
                {error ? (
                  <View style={styles.errorContainer}>
                    <Ionicons name="warning" size={18} color="#ff3b30" />
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                ) : null}

                {/* Input Email */}
                <View style={styles.inputWrapper}>
                  <Feather name="mail" size={20} color="#8e8e93" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#8e8e93"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!loading}
                  />
                  {values.email && !errors.email && (
                    <FontAwesome name="check-circle" size={20} color="#34c759" style={styles.validationIcon} />
                  )}
                </View>
                {errors.email && touched.email && (
                  <Text style={styles.validationError}>{errors.email}</Text>
                )}

                {/* Input Password */}
                <View style={styles.inputWrapper}>
                  <Feather name="lock" size={20} color="#8e8e93" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Mot de passe"
                    placeholderTextColor="#8e8e93"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry
                    editable={!loading}
                  />
                  {values.password && !errors.password && (
                    <FontAwesome name="check-circle" size={20} color="#34c759" style={styles.validationIcon} />
                  )}
                </View>
                {errors.password && touched.password && (
                  <Text style={styles.validationError}>{errors.password}</Text>
                )}

                {/* Bouton Connexion */}
                <TouchableOpacity 
                  onPress={handleSubmit} 
                  style={[styles.loginButton, loading && styles.disabledButton]}
                  activeOpacity={0.9}
                  disabled={loading}
                >
                  <LinearGradient
                    colors={['#007AFF', '#0051ff']}
                    style={styles.buttonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    {loading ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <>
                        <Text style={styles.buttonText}>Se connecter</Text>
                        <Ionicons name="arrow-forward" size={20} color="white" />
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </>
            )}
          </Formik>

          {/* Lien Inscription */}
          <TouchableOpacity 
            onPress={() => !loading && router.push('/screens/RegisterScreen')}
            style={styles.switchAuth}
          >
            <Text style={styles.switchText}>
              Pas de compte ? <Text style={styles.switchHighlight}>S'inscrire</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#ffffff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1c1c1e',
    letterSpacing: 0.5,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff3b3010',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ff3b3030',
  },
  errorText: {
    color: '#ff3b30',
    marginLeft: 8,
    fontSize: 14,
    flex: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e5ea',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    height: 55,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#1c1c1e',
    fontSize: 16,
  },
  validationIcon: {
    marginLeft: 10,
  },
  validationError: {
    color: '#ff3b30',
    fontSize: 13,
    marginBottom: 15,
    marginLeft: 5,
  },
  loginButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 20,
    height: 55,
  },
  disabledButton: {
    opacity: 0.8,
  },
  buttonGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  },
  switchAuth: {
    marginTop: 25,
    alignSelf: 'center',
  },
  switchText: {
    color: '#8e8e93',
    fontSize: 15,
  },
  switchHighlight: {
    color: '#007AFF',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;