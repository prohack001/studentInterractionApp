import { StyleSheet, Text, View, Pressable, Image, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import { Link } from 'expo-router';
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import TaskCard from '../component/TaskCard';
import EventCard from '../component/EventCard';
import WelcomeHeader from '../component/WelcomeHeader';




const index = () => {

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: String) => {
    // setSearchQuery(query)
    console.log(query)
  }


  return (
    <SafeAreaView>
      <ScrollView>
        
          
          <View style={styles.searchBox}>
            <Ionicons name='search-outline' size={24} />
            <TextInput style={styles.input}
              placeholder='Rechercher'
              placeholderTextColor={"black"}
              onChangeText={(query) => handleSearch(query)}
            />
          </View>
         

          

       
      </ScrollView>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({

  searchBox: {
    height: 60,
    // borderWidth:1,
    // borderColor:"black",
    borderRadius: 20,
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    backgroundColor: "#f7f6f9"
  },
  input: {
    marginLeft: 20,
    fontSize: 20,
    color: "gray",
    width: "100%"
  }
})