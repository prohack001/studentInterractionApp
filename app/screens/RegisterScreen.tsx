import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Image, Animated, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Easing } from 'react-native';
import { useRouter } from 'expo-router';


const RegisterSchema = Yup.object().shape({
  username: Yup.string().min(3, 'Minimum 3 caractères').required('Requis'),
  email: Yup.string().email('Email invalide').required('Requis'),
  password: Yup.string().min(6, 'Minimum 6 caractères').required('Requis'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
    .required('Confirmation requise'),
});

const RegisterScreen = () => {
  const navigation = useNavigation();
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

  const handleRegister = async (values) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('https://strapi-server-app-m49w.onrender.com/api/auth/local/register', {
        username: values.username,
        email: values.email,
        password: values.password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Sauvegarde du token JWT
      await AsyncStorage.setItem('userToken', response.data.jwt);
      
      // Redirection vers l'écran principal
      // navigation.navigate('Home');
      router.replace('/(tabs)');
      
    } catch (err) {
      console.log('Full error:', err); // Log complet de l'erreur
      setError(
        err.response?.data?.error?.message || 
        err.response?.data?.message || 
        'Erreur lors de l\'inscription'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Gradient - Blanc dominant avec dégradé bleu/noir */}
      <LinearGradient
        colors={['#ffffff', '#f5f9ff', '#3b4af5']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* Header avec bouton retour */}
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Image 
          source={require('../../assets/images/accueil/logo.jpg')} 
          style={styles.logo}
        />
        <Text style={styles.title}>Inscription</Text>
      </Animated.View>

      {/* Formulaire */}
      <Animated.View style={[styles.formContainer, { opacity: fadeAnim, transform: [{ translateY: slideUp }] }]}>
        {error ? (
          <View style={styles.errorContainer}>
            <Ionicons name="warning" size={18} color="#ff3b30" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <Formik
          initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={RegisterSchema}
          onSubmit={handleRegister}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              {/* Input Nom d'utilisateur */}
              <View style={styles.inputWrapper}>
                <MaterialIcons name="person-outline" size={20} color="#8e8e93" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Nom d'utilisateur"
                  placeholderTextColor="#8e8e93"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  autoCapitalize="none"
                />
                {values.username && !errors.username && (
                  <FontAwesome name="check-circle" size={20} color="#34c759" style={styles.validationIcon} />
                )}
              </View>
              {errors.username && touched.username && (
                <Text style={styles.validationError}>{errors.username}</Text>
              )}

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
                  autoCorrect={false}
                  autoCompleteType="email" // Pour Android
                  textContentType="emailAddress" // Pour iOS

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
                />
                {values.password && !errors.password && (
                  <FontAwesome name="check-circle" size={20} color="#34c759" style={styles.validationIcon} />
                )}
              </View>
              {errors.password && touched.password && (
                <Text style={styles.validationError}>{errors.password}</Text>
              )}

              {/* Input Confirm Password */}
              <View style={styles.inputWrapper}>
                <Feather name="lock" size={20} color="#8e8e93" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirmer le mot de passe"
                  placeholderTextColor="#8e8e93"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry
                />
                {values.confirmPassword && !errors.confirmPassword && values.confirmPassword === values.password && (
                  <FontAwesome name="check-circle" size={20} color="#34c759" style={styles.validationIcon} />
                )}
              </View>
              {errors.confirmPassword && touched.confirmPassword && (
                <Text style={styles.validationError}>{errors.confirmPassword}</Text>
              )}

              {/* Bouton Inscription */}
              <TouchableOpacity 
                onPress={handleSubmit} 
                style={styles.registerButton}
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
                      <Text style={styles.buttonText}>S'inscrire</Text>
                      <Ionicons name="person-add" size={20} color="white" />
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </>
          )}
        </Formik>

        {/* Lien Connexion */}
        <TouchableOpacity 
          onPress={() => router.push('/screens/LoginScreen')}
          style={styles.switchAuth}
        >
          <Text style={styles.switchText}>
            Déjà un compte ? <Text style={styles.switchHighlight}>Se connecter</Text>
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
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
    marginBottom: 30,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
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
  },
  errorText: {
    color: '#ff3b30',
    marginLeft: 8,
    fontSize: 14,
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
  registerButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 20,
    height: 55,
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

export default RegisterScreen;