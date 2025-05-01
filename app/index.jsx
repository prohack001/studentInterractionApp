// import React, { useEffect } from 'react';
// import { ScrollView, View, Text, Image, ActivityIndicator, StyleSheet, TouchableOpacity, Stack } from 'react-native';
// import { useRouter } from 'expo-router';
// import { colors } from '../utils/colors';
// import { fonts } from '../utils/fonts';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { LinearGradient } from 'expo-linear-gradient';
// import RegisterScreen from './screens/RegisterScreen';
// import LoginScreen from './screens/LoginScreen';





// export default function AccueilScreen() {
//   const router = useRouter();

//   // useEffect(() => {
//   //   const timer = setTimeout(() => {
//   //     router.replace('/(tabs)'); // vers l’onglet Home dans le groupe (tabs)
//   //   });

//   //   return () => clearTimeout(timer);
//   // }, []);

//   return (
    
//     <View style={styles.container}>
//     <Image source={require("../assets/images/accueil/logo.jpg")} style={styles.logo} />
//     <Image source={require("../assets/images/accueil/accueil.jpg")} style={styles.accueil} />
//     <Text style={styles.title}>Votre application tout en un</Text>
//     <Text style={styles.subTitle}> Lorem ipsum, dolor sit amet consectetur
//         adipisicing elit. Totam, aspernatur voluptas enim ullam natus iure praesent</Text>
//     <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
    
//         <View style={styles.buttonContainer}>
//             <TouchableOpacity style={[styles.loginButtonWrapper,
//                 {backgroundColor: colors.primary}, 
//             ]}onPress={() => router.push('/screens/LoginScreen')}>
//                 <Text style={styles.loginButtonText}>Se connecter</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={[styles.loginButtonWrapper]} onPress={() => router.push('/screens/RegisterScreen')}>
//                 <Text style={styles.signUpButtonText}>S'inscrire</Text>
//             </TouchableOpacity>

//         </View>
    
//     </View>

        
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.white,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   logo: {
//     height: 100,
//     width: 140,
//     marginBottom: 20,
//     marginTop:0,
//   },
//   accueil: {
//     height: 250,
//     width: 231,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 40,
//     marginBottom: 20,
//     fontFamily: fonts.PlayWrite,
//     paddingHorizontal: 20,
//     textAlign:"center",
//     color: colors.primary,
    
//   },
//   loader: {
//     marginTop: 10,
//   },
//   subTitle:{
//     fontSize:20,
//     paddingHorizontal: 20,
//     textAlign: "center",
//     color: colors.secondary,
//     fontFamily: fonts.Medium,
//     marginTop: 20,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     marginTop: 20,
//     borderWidth:1,
//     borderColor:colors.primary,
//     width: "65%",
//     borderRadius:100,
//     height: 60,
//   },
//   loginButtonWrapper:{
//     justifyContent: "center",
//     alignItems:"center",
//     width:"50%",
//     borderRadius:98,
//   },
//   loginButtonText:{
//     backgroundColor: colors.primary,
//     color: colors.white,
//     fontFamily:fonts.SemiBold,
//     fontSize:18,
//     padding:5,

//   },
//   signUpButtonText:{
//     fontFamily:fonts.SemiBold,
//     fontSize:18,
//     padding:5,

//   }

// });


import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';

const { width, height } = Dimensions.get('window');

export default function AccueilScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#ffffff', '#f8fbff', '#e6f0ff']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.content}>
        {/* Logo avec ombre portée */}
        <View style={styles.logoContainer}>
          <Image 
            source={require("../assets/images/accueil/logo.jpg")} 
            style={styles.logo} 
          />
        </View>

        {/* Image d'accueil avec bordure subtile */}
        <View style={styles.imageContainer}>
          <Image 
            source={require("../assets/images/accueil/accueil.jpg")} 
            style={styles.accueil} 
            resizeMode="contain"
          />
        </View>

        {/* Titre avec dégradé */}
        <Text style={styles.title}>
          Votre application{' '}
          <Text style={styles.titleHighlight}>tout en un</Text>
        </Text>

        {/* Sous-titre */}
        <Text style={styles.subTitle}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
          Totam, aspernatur voluptas enim ullam natus iure praesent
        </Text>

        {/* Boutons avec animation de pression */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.loginButton}
            activeOpacity={0.8}
            onPress={() => router.push('/screens/LoginScreen')}
          >
            <LinearGradient
              colors={[colors.primary, '#0056b3']}
              style={styles.gradientButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.loginButtonText}>Se connecter</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.signUpButton}
            activeOpacity={0.8}
            onPress={() => router.push('/screens/RegisterScreen')}
          >
            <Text style={styles.signUpButtonText}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '90%',
    alignItems: 'center',
    paddingBottom: 40,
  },
  logoContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 30,
  },
  logo: {
    width: 140,
    height: 100,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'rgba(0, 122, 255, 0.1)',
  },
  imageContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    marginBottom: 30,
  },
  accueil: {
    width: width * 0.7,
    height: height * 0.25,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.1)',
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    fontFamily: fonts.PlayWrite,
    color: colors.primary,
    marginBottom: 15,
    lineHeight: 40,
    paddingHorizontal: 20,
  },
  titleHighlight: {
    color: '#0056b3',
  },
  subTitle: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.secondary,
    fontFamily: fonts.Medium,
    paddingHorizontal: 30,
    lineHeight: 24,
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '80%',
    height: 55,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  loginButton: {
    flex: 1,
  },
  gradientButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: colors.white,
    fontFamily: fonts.SemiBold,
    fontSize: 16,
  },
  signUpButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButtonText: {
    color: colors.primary,
    fontFamily: fonts.SemiBold,
    fontSize: 16,
  },
});