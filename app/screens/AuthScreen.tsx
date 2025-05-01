import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, ScrollView, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleAuth = async (values) => {
    setLoading(true);
    setError('');
    try {
      const endpoint = isLogin ? '/auth/local' : '/auth/local/register';
      const payload = isLogin 
        ? { identifier: values.email, password: values.password }
        : { username: values.name, email: values.email, password: values.password };

      const response = await axios.post(`https://your-strapi-api.com${endpoint}`, payload);
      
      console.log('Success:', response.data);
      // Stocker le token: await AsyncStorage.setItem('token', response.data.jwt);
      // Redirection: navigation.navigate('Home');
    } catch (err) {
      setError(isLogin ? 'Identifiants incorrects' : 'Erreur lors de l\'inscription');
      console.error('Auth error:', err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  const AuthSchema = Yup.object().shape({
    ...(!isLogin && { name: Yup.string().required('Nom requis') }),
    email: Yup.string().email('Email invalide').required('Requis'),
    password: Yup.string().min(6, '6 caractères minimum').required('Requis'),
    ...(!isLogin && { confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Mots de passe différents')
      .required('Confirmation requise') 
    }),
  });

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      {/* Logo */}
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image 
          source={require('../../assets/images/accueil/logo.jpg')} 
          style={styles.logo}
        />
      </Animated.View>

      {/* Toggle Auth */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity 
          style={[styles.toggleButton, isLogin && styles.activeToggle]}
          onPress={() => setIsLogin(true)}
        >
          <Text style={[styles.toggleText, isLogin && styles.activeToggleText]}>Connexion</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.toggleButton, !isLogin && styles.activeToggle]}
          onPress={() => setIsLogin(false)}
        >
          <Text style={[styles.toggleText, !isLogin && styles.activeToggleText]}>Inscription</Text>
        </TouchableOpacity>
      </View>

      {/* Formulaire */}
      <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
        {error ? (
          <View style={styles.errorContainer}>
            <Ionicons name="warning" size={18} color="#ff3b30" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <Formik
          initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={AuthSchema}
          onSubmit={handleAuth}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              {!isLogin && (
                <>
                  <View style={styles.inputContainer}>
                    <Feather name="user" size={20} color="#8e8e93" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Nom complet"
                      placeholderTextColor="#8e8e93"
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                    />
                    {values.name && !errors.name && (
                      <MaterialCommunityIcons 
                        name="check-circle" 
                        size={20} 
                        color="#34c759" 
                        style={styles.validationIcon}
                      />
                    )}
                  </View>
                  {errors.name && touched.name && (
                    <Text style={styles.validationError}>{errors.name}</Text>
                  )}
                </>
              )}

              <View style={styles.inputContainer}>
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
                />
                {values.email && !errors.email && (
                  <MaterialCommunityIcons 
                    name="check-circle" 
                    size={20} 
                    color="#34c759" 
                    style={styles.validationIcon}
                  />
                )}
              </View>
              {errors.email && touched.email && (
                <Text style={styles.validationError}>{errors.email}</Text>
              )}

              <View style={styles.inputContainer}>
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
                  <MaterialCommunityIcons 
                    name="check-circle" 
                    size={20} 
                    color="#34c759" 
                    style={styles.validationIcon}
                  />
                )}
              </View>
              {errors.password && touched.password && (
                <Text style={styles.validationError}>{errors.password}</Text>
              )}

              {!isLogin && (
                <>
                  <View style={styles.inputContainer}>
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
                    {values.confirmPassword && values.confirmPassword === values.password && (
                      <MaterialCommunityIcons 
                        name="check-circle" 
                        size={20} 
                        color="#34c759" 
                        style={styles.validationIcon}
                      />
                    )}
                  </View>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Text style={styles.validationError}>{errors.confirmPassword}</Text>
                  )}
                </>
              )}

              <TouchableOpacity 
                onPress={handleSubmit}
                disabled={loading}
                style={styles.authButton}
              >
                <LinearGradient
                  colors={['#007AFF', '#0040FF']}
                  style={styles.gradientButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.buttonText}>
                    {loading ? (
                      <ActivityIndicator color="white" />
                    ) : isLogin ? (
                      'Se connecter'
                    ) : (
                      'S\'inscrire'
                    )}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </>
          )}
        </Formik>

        <TouchableOpacity 
          style={styles.switchAuth}
          onPress={() => setIsLogin(!isLogin)}
        >
          <Text style={styles.switchText}>
            {isLogin 
              ? 'Pas de compte ? Créer un compte' 
              : 'Déjà un compte ? Se connecter'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 30,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f7',
    borderRadius: 10,
    marginBottom: 25,
    overflow: 'hidden',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeToggle: {
    backgroundColor: '#007AFF',
  },
  toggleText: {
    fontSize: 16,
    color: '#8e8e93',
    fontWeight: '500',
  },
  activeToggleText: {
    color: 'white',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff3b3010',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    color: '#ff3b30',
    marginLeft: 8,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e5ea',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    height: 50,
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
  authButton: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
  },
  gradientButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  switchAuth: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchText: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default AuthScreen;