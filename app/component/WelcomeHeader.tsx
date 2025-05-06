import { StyleSheet, Text, View, Pressable, Image, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import { Link } from 'expo-router';
import React, { useState, useEffect }  from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import GlobalApi from '../Shared/GlobalApi';
import AsyncStorage from '@react-native-async-storage/async-storage';


const index = () => {

  const router = useRouter();
  const [userData, setUserData] = useState(null);
  

   useEffect(()=>{
        getAuthenticatedUser();
          
          
            },[])

            //  const getAuthenticatedUser=async()=>{
            //             try{
                            
            //                 const result=(await GlobalApi.getAuthenticatedUser()).data;
                            
            //                 console.log("User data ",result);
            //                 setUserData(result); 
            //             } catch (error) {
            //                 console.error("Erreur dans getAuthenticatedUser():", error);
            //             }
            //         };
  
            const getAuthenticatedUser = async () => {
              try {
                const token = await AsyncStorage.getItem('userToken');
                const response = await GlobalApi.getAuthenticatedUser(token);
                const result = response.data;
            
                console.log("User data ", result);
                setUserData(result);
              } catch (error) {
                console.error("Erreur dans getAuthenticatedUser():", error);
              }
            };
            
  
  return (
    <LinearGradient
      colors={['#e0f2ff', '#ffffff']}
      style={{ flex: 1 }}
    >
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.Lheader}>
                <TouchableOpacity onPress={() => router.push('/screens/ProfileScreen')}>
                <Image
                  source={userData?.avatar ? { uri: userData?.avatar } : require('../../assets/images/react-logo.png')}
                  style={styles.profil}
                />

                </TouchableOpacity>
                <View style={styles.name}>
                  <Text style={styles.username}>{userData?.username || 'Utilisateur'} </Text>
                  <Text style={styles.grade} >{userData?.classe || 'Classe'} </Text>
                </View>
              </View>
              <View style={styles.notification}>
                <TouchableOpacity
                onPress={() => router.push('/(tabs)/Notifications')}>
                <Ionicons name='notifications-outline' size={24} />
                </TouchableOpacity>
              </View>
            </View>
            


            
          </View>
          
        </ScrollView>
      </SafeAreaView>

    </LinearGradient>
  )
}

export default index

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: 60,
    padding: 20,
  },
  profil: {
    width: 48,
    height: 48,
    borderRadius:10,
    resizeMode:"center"
    },
  username:{
    fontWeight:"bold",
    fontSize:20
  },
  grade:{
    fontSize:15
  },
  Lheader:{
    display:"flex",
    flexDirection:"row"
  },
  header:{
    display:'flex',
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:10
  },
  notification:{
    padding:15,
    borderWidth:2,
    borderRadius:20
  },
  name:{
    flexDirection: 'column', 
    justifyContent: 'space-between',
    paddingLeft:20
  },
  
})