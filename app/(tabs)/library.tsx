import { SafeAreaView, TextInput,ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React,  { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/utils/colors';
import { fonts } from '@/utils/fonts';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const library = () => {

  const [activeTab, setActiveTab] = useState("HomeWork");
  const router = useRouter();

  const handleTabPress = (tabName: string, route: string) => {
    setActiveTab(tabName);
    router.push(route);
  };

  return (
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

        <View style={styles.daysContainer}>
          <View style={styles.dayContainer}>
            <Text style={styles.tuesday}>Tuesday 6</Text>
            <Text style={styles.fourTask}>       4 tasks</Text>
          </View>
          <View>
          <FontAwesome6 name="calendar-days" size={28} color="black" />
          </View>
        </View>
        <View style={[styles.oneMatterContainer, { backgroundColor: colors.purple}]}>
          <View style={styles.calculator}>
            <FontAwesome6 name="calculator" size={32} color="black" />
        
          </View>
          <View style={styles.nomMatter}>
            <Text style={styles.basic}>Basic mathematic</Text>
            <Text style={styles.timeText}>45 min</Text>
          </View> 
          
          <View style={styles.doneContainer}>
            <Text style={styles.done}>Done</Text>
          </View>

          

        </View>
        <View style={[styles.oneMatterContainer, { backgroundColor: colors.green}]}>
          <View style={styles.calculator}>
            <FontAwesome6 name="calculator" size={32} color="black" />
        
          </View>
          <View style={styles.nomMatter}>
            <Text style={styles.basic}>English Grammar</Text>
            <Text style={styles.timeText}>60 min</Text>
          </View> 
          
          <View style={styles.doneContainer}>
            <Text style={styles.done}>To do</Text>
          </View>

          

        </View>
        <View style={[styles.oneMatterContainer, { backgroundColor: colors.yellow}]}>
          <View style={styles.calculator}>
            <FontAwesome6 name="calculator" size={32} color="black" />
        
          </View>
          <View style={styles.nomMatter}>
            <Text style={styles.basic}>Science</Text>
            <Text style={styles.timeText}>40 min</Text>
          </View> 
          
          <View style={styles.doneContainer}>
            <Text style={styles.done}>To do</Text>
          </View>

          

        </View>
        <View style={[styles.oneMatterContainer, { backgroundColor: colors.pink}]}>
          <View style={styles.calculator}>
            <FontAwesome6 name="calculator" size={32} color="black" />
        
          </View>
          <View style={styles.nomMatter}>
            <Text style={styles.basic}>World History</Text>
            <Text style={styles.timeText}>20 min</Text>
          </View> 
          
          <View style={styles.doneContainer}>
            <Text style={styles.done}>To do</Text>
          </View>

          

        </View>
        <View style={[styles.oneMatterContainer, { backgroundColor: colors.green}]}>
          <View style={styles.calculator}>
            <FontAwesome6 name="calculator" size={32} color="black" />
        
          </View>
          <View style={styles.nomMatter}>
            <Text style={styles.basic}>English Grammar</Text>
            <Text style={styles.timeText}>60 min</Text>
          </View> 
          
          <View style={styles.doneContainer}>
            <Text style={styles.done}>To do</Text>
          </View>

          

        </View>
        

      </ScrollView>
     
    </SafeAreaView>
  )
}

export default library

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
  daysContainer:{
    flexDirection:"row",
    justifyContent: "space-between",
    marginHorizontal: 25,
    marginTop:10,
  },
  dayContainer:{
    flexDirection:"row",
    alignItems:"baseline"
  },
  tuesday:{
    fontWeight:"bold",
    fontSize:24,
  },
  fourTask:{
    color:"#aaa",
  },
  oneMatterContainer:{
    flexDirection:"row",
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
    marginRight:40,
  },
  nomMatter:{
    flexDirection:"column",
    justifyContent:"flex-start",
    alignItems:"flex-start",

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
    paddingTop:5,
    
  },
  doneContainer:{
    marginLeft:40,
    padding:10,
    borderRadius:10,
    backgroundColor:colors.white,
  },
  timeText:{
    color:colors.lightGray,
  }
})