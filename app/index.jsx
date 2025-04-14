import React, { useEffect } from 'react';
import { ScrollView, View, Text, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';


export default function AccueilScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(tabs)'); // vers l’onglet Home dans le groupe (tabs)
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    
    <View style={styles.container}>
    <Image source={require("../assets/images/accueil/logo.jpg")} style={styles.logo} />
    <Image source={require("../assets/images/accueil/accueil.jpg")} style={styles.accueil} />
    <Text style={styles.title}>Votre application tout en un</Text>
    <Text style={styles.subTitle}> Lorem ipsum, dolor sit amet consectetur
        adipisicing elit. Totam, aspernatur voluptas enim ullam natus iure praesent</Text>
    <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
    
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.loginButtonWrapper,
                {backgroundColor: colors.primary},
            ]}>
                <Text style={styles.loginButtonText}>Se connecter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.loginButtonWrapper]}>
                <Text style={styles.signUpButtonText}>S'inscrire</Text>
            </TouchableOpacity>

        </View>
    
    </View>

        
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 100,
    width: 140,
    marginBottom: 20,
    marginTop:0,
  },
  accueil: {
    height: 250,
    width: 231,
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    marginBottom: 20,
    fontFamily: fonts.PlayWrite,
    paddingHorizontal: 20,
    textAlign:"center",
    color: colors.primary,
    
  },
  loader: {
    marginTop: 10,
  },
  subTitle:{
    fontSize:20,
    paddingHorizontal: 20,
    textAlign: "center",
    color: colors.secondary,
    fontFamily: fonts.Medium,
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    borderWidth:1,
    borderColor:colors.primary,
    width: "65%",
    borderRadius:100,
    height: 60,
  },
  loginButtonWrapper:{
    justifyContent: "center",
    alignItems:"center",
    width:"50%",
    borderRadius:98,
  },
  loginButtonText:{
    backgroundColor: colors.primary,
    color: colors.white,
    fontFamily:fonts.SemiBold,
    fontSize:18,
    padding:5,

  },
  signUpButtonText:{
    fontFamily:fonts.SemiBold,
    fontSize:18,
    padding:5,

  }

});
