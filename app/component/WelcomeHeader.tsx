import { StyleSheet, Text, View, Pressable, Image, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import { Link } from 'expo-router';
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';


const index = () => {

  const router = useRouter();
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
                <Image source={require('../../assets/images/profil.jpeg')} style={styles.profil} />
                <View style={styles.name}>
                  <Text style={styles.username}>Homer Simpson</Text>
                  <Text style={styles.grade} >Igit 3</Text>
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