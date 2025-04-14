
import { Stack } from 'expo-router';
import { SafeAreaView, Image,TextInput,ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React,  { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/utils/colors';
import { fonts } from '@/utils/fonts';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Octicons from '@expo/vector-icons/Octicons';

export default function Subjects() {
  const [activeTab, setActiveTab] = useState("Subjects");
    const router = useRouter();
  
    const handleTabPress = (tabName: string, route: string) => {
      setActiveTab(tabName);
      router.push(route);
    };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
    
      <SafeAreaView>
      <ScrollView>
      <View style={styles.sujetContainer}>
        <TouchableOpacity onPress={() => handleTabPress("Subjects", "screens/SubjectScreen")}>
          <Text style={[styles.tabText, activeTab === "Subjects" && styles.activeTabText]}>Subjects</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleTabPress("HomeWork", "library")}>
          <Text style={[styles.tabText, activeTab === "HomeWork" && styles.activeTabText]}>HomeWork</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleTabPress("Library", "screens/LibraryScreen")}>
          <Text style={[styles.tabText, activeTab === "Library" && styles.activeTabText]}>Library</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon} />
            <TextInput
              placeholder="Rechercher..."
              style={styles.searchInput}
              placeholderTextColor="#999"
            />
          </View>

      </View>

      <View style={styles.filtersContainer}>
        <View style={styles.filterContainer}>

          <Text style={styles.filterText}> Subject: </Text>
          <TouchableOpacity>
            <Text style={styles.filter}>All <Entypo name="chevron-down" size={16} color="black" /></Text>
          
          </TouchableOpacity>
        </View>
        <View style={styles.filterContainer}>
          
          <Text style={styles.filterText}> Sort by: </Text>
          <TouchableOpacity>
          <Text style={styles.filter}>Do first <Entypo name="chevron-down" size={16} color="black" /></Text>
        
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity  onPress={() => handleTabPress("Cours", "screens/CoursScreen")} style={[styles.oneMatterContainer, { backgroundColor: colors.purple}]}>
        <View style={styles.calculatorContainer}>

          <View style={styles.calculator}>
            <FontAwesome6 name="calculator" size={32} color="black" />
        
          </View>
          <View style={styles.doneContainer}>
            <Text style={styles.done}>Homework   </Text>
            <AntDesign name="checkcircle" size={24} color="black" />
          </View>
        </View>
        <View style={styles.nomMatter}>
          <Text style={styles.basic}>Basic mathematic</Text>
          <Text style={styles.timeText}>Today,  08:15am</Text>
        </View> 
        <View style={styles.imageContainer}>
          <Image style={{borderRadius:7, width:45, height:45}} source={require("../../assets/images/profil.jpeg")} />
          <Text style={styles.profName}>Kathryn Murphy</Text>
          
        </View> 

      </TouchableOpacity>

        <TouchableOpacity style={[styles.oneMatterContainer, { backgroundColor: colors.pink}]}>
          <View style={styles.calculatorContainer}>

            <View style={styles.calculator}>
              <FontAwesome6 name="calculator" size={32} color="black" />
          
            </View>
            <View style={styles.doneContainer}>
              <Text style={styles.done}>Homework   </Text>
              <Octicons name="dash" size={24} color="black" />
            </View>
          </View>
          <View style={styles.nomMatter}>
            <Text style={styles.basic}>Basic mathematic</Text>
            <Text style={styles.timeText}>Today,  08:15am</Text>
          </View> 
          <View style={styles.imageContainer}>
            <Image style={{borderRadius:7, width:45, height:45}} source={require("../../assets/images/profil.jpeg")} />
            <Text style={styles.profName}>Kathryn Murphy</Text>
            
          </View> 
  
        </TouchableOpacity>
        <TouchableOpacity style={[styles.oneMatterContainer, { backgroundColor: colors.green}]}>
          <View style={styles.calculatorContainer}>

            <View style={styles.calculator}>
              <FontAwesome6 name="calculator" size={32} color="black" />
          
            </View>
            <View style={styles.doneContainer}>
              <Text style={styles.done}>Homework   </Text>
              <Octicons name="dash" size={24} color="black" />
            </View>
          </View>
          <View style={styles.nomMatter}>
            <Text style={styles.basic}>Basic mathematic</Text>
            <Text style={styles.timeText}>Today,  08:15am</Text>
          </View> 
          <View style={styles.imageContainer}>
            <Image style={{borderRadius:7, width:45, height:45}} source={require("../../assets/images/profil.jpeg")} />
            <Text style={styles.profName}>Kathryn Murphy</Text>
            
          </View> 
  
        </TouchableOpacity>
        <TouchableOpacity style={[styles.oneMatterContainer, { backgroundColor: colors.yellow}]}>
          <View style={styles.calculatorContainer}>

            <View style={styles.calculator}>
              <FontAwesome6 name="calculator" size={32} color="black" />
          
            </View>
            <View style={styles.doneContainer}>
              <Text style={styles.done}>Homework   </Text>
              <Octicons name="dash" size={24} color="white" />
            </View>
          </View>
          <View style={styles.nomMatter}>
            <Text style={styles.basic}>Basic mathematic</Text>
            <Text style={styles.timeText}>Today,  08:15am</Text>
          </View> 
          <View style={styles.imageContainer}>
            <Image style={{borderRadius:7, width:45, height:45}} source={require("../../assets/images/profil.jpeg")} />
            <Text style={styles.profName}>Kathryn Murphy</Text>
            
          </View> 
  
        </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>

    </>
  );
}


export default Subjects

const styles = StyleSheet.create({

  sujetContainer:{
    flexDirection:"row",
    alignItems:"center",
    marginVertical: 10,
    justifyContent: 'space-around',
    marginTop: 20,
  },

  
  
  tabText: {
    fontSize: 20,
    color: '#aaa', // gris par défaut
    fontWeight: '500',
  },
  activeTabText: {
    color: '#000', // noir si sélectionné
    fontWeight: 'bold',
    // fontFamily: fonts.MeaCulpa,
    
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"center",
    backgroundColor: colors.gray,
    borderRadius: 20,
    paddingHorizontal: 5,
    
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    marginHorizontal: 10,
    marginVertical:10,
    width: "75%"
  },
  searchContainer:{
    alignItems: "center",
    justifyContent:"center",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filtersContainer:{
    flexDirection:"row",
    // alignItems:"center",
    marginVertical: 5,
    // justifyContent: 'center',
    marginTop: 20,
    
  },
  filter:{
    fontWeight:"bold",
  },
  filterText:{
    color: "#aaa",
    fontSize:16,
  },
  filterContainer:{
    flexDirection:"row",
    marginHorizontal:15,
  },
  oneMatterContainer:{
    flexDirection:"column",
    marginTop:7,
    padding: 26,
    borderRadius:20,
    
    justifyContent:"space-around",
    marginHorizontal:15,
    
  
  },
  calculator:{
    padding:10,
    borderRadius:10,
    backgroundColor:colors.white,
    marginRight:40
  },
  calculatorContainer:{
    flexDirection:"row",
    justifyContent:"space-between"
  },
  nomMatter:{
    flexDirection:"column",
    justifyContent:"flex-start",
    alignItems:"flex-start",
    marginTop:10,

  },
  basic:{
    marginBottom:5,
    fontWeight:"bold",
    fontFamily:fonts.MeaCulpa,
    fontSize:20
  }, 
  done:{
    fontSize:16,
    fontWeight:"bold",
    
    
  },
  doneContainer:{
    marginLeft:40,
    padding:5,
    paddingTop:10,
    borderRadius:14,
    backgroundColor:colors.white,
    height:40,
    flexDirection:"row",
    justifyContent:"center",
    
  },
  timeText:{
    color:colors.lightGray,
  },
  imageContainer:{
    flexDirection:"row",
    marginTop:10,
    alignItems:"center"
    
  },
  profName:{
    fontSize:20,
    fontWeight:"400",
    marginLeft: 15,
  }
});
