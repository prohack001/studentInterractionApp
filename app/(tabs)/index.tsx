import { StyleSheet, Text, View, Pressable, Image, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import {  Link, router, usePathname, useRouter } from 'expo-router';
import React, { useState, useEffect, } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import TaskCard from '../component/TaskCard';
import EventCard from '../component/EventCard';
import WelcomeHeader from '../component/WelcomeHeader';
import SearchBar from "../component/SearchBar";
import GlobalApi from "../Shared/GlobalApi";
import ClassCard from "../component/ClassCard";
import { colors } from '@/utils/colors';





const index = () => {

  const [searchQuery, setSearchQuery] = useState("");
  // Fonction pour naviguer vers un chemin
    const router = useRouter();
    const currentPath = usePathname();
  const navigateTo = (path) => {
    router.push(path);
  };

  const handleSearch = (query: String) => {
    // setSearchQuery(query)
    console.log(query)
  }

  

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <WelcomeHeader/>
          <SearchBar/>
          
            <View style={styles.notification}>
              <TouchableOpacity>
                <Ionicons name='notifications-sharp' size={24} />
              </TouchableOpacity>
            </View>
          
          <View style={styles.searchBox}>
            <Ionicons name='search-outline' size={24} />
            <TextInput style={styles.input}
              placeholder='Rechercher'
              placeholderTextColor={"black"}
              onChangeText={(query) => handleSearch(query)}
            />
          </View>
          <View style={styles.class}>
                              <Text style={styles.subclass}>
                              Next class
                              </Text>
                              <TouchableOpacity>
                              <Text>see all</Text>
                              </TouchableOpacity>
                  </View>
          <ScrollView horizontal={true}>
            <TaskCard/>
          </ScrollView>
          <View style={styles.class}>
            <Text style={styles.subclass}>
              Events
            </Text>
            <TouchableOpacity>
              <Text>see all</Text>
            </TouchableOpacity>
          </View>
            <EventCard />

          
        
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.white,
    // paddingTop: 60,
    padding: 20,
  },
  profil: {
    width: 48,
    height: 48,
    borderRadius: 10,
    resizeMode: "center"
  },
  username: {
    fontWeight: "bold",
    fontSize: 20
  },
  grade: {
    fontSize: 15
  },
  Lheader: {
    display: "flex",
    flexDirection: "row"
  },
  header: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10
  },
  notification: {
    padding: 15,
    borderWidth: 2,
    borderRadius: 20
  },
  name: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 20
  },
  class: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    alignItems: "center"
  },
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
  },
  subclass: {
    fontSize: 20,
    fontFamily: "arial",
    fontWeight: "900"
  }
})