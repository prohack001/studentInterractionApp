import {
    SafeAreaView,
    TextInput,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
  } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import Ionicons from '@expo/vector-icons/Ionicons';
  import { LinearGradient } from 'expo-linear-gradient';
  import { colors } from '@/utils/colors';
  import { fonts } from '@/utils/fonts';
  import {  useRouter } from 'expo-router';
  import AntDesign from '@expo/vector-icons/AntDesign';
  import Entypo from '@expo/vector-icons/Entypo';
  import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
  import WelcomeHeader from '../component/WelcomeHeader';
  import GlobalApi from '../Shared/GlobalApi';
  import { useNavigation } from '@react-navigation/native';
  
  export default function HomeWork () {
    const [activeTab, setActiveTab] = useState('HomeWork');
    const router = useRouter();
    const navigation=useNavigation();

    const [homeworkCard,setHomeworkCard]= useState([])
    
          useEffect(()=>{
            getHomework();
        
        
          },[])
        
        
          const getHomework=async()=>{
            try{
                const result=(await GlobalApi.getHomework()).data;
                console.log("Result-->", result)
                // console.log("Result Data-->", result.data);
    
                const resp = result.data.map((item) => ({
                    id: item.id,
                    name: item.attributes.Name,
                    iconName: item.attributes.iconeName,
                    duree: item.attributes.Duree,
                    finiOuPas: item.attributes.FiniOuPas,
                    couleur: item.attributes.color,
                }));
                console.log("HomeworkList",resp);
                setHomeworkCard(resp); 
            } catch (error) {
                console.error("Erreur dans getHomework():", error);
            }
        };

     
    // Modifiez la fonction onPressHomework pour naviguer avec les paramètres
const onPressHomework = (homework) => {
    console.log("Homework ", homework);
    router.push({
        pathname: "/screens/Homework-details",
        params: homework // Passez tout l'objet homework comme paramètre
  });
}
  
    return (
        <SafeAreaView>
            <ScrollView >

                <FlatList
                    data={homeworkCard}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.container}
                        onPress={()=>onPressHomework(item)}>
                        <View style={[styles.oneMatterContainer, { backgroundColor: colors[item.couleur]  || colors.purple }]}>
                            <View style={styles.calculator}>
                            <FontAwesome6 name={item.iconName} size={32} color="black" />
                            </View>

                            <View style={styles.nomMatter}>
                            <Text style={styles.basic}>{item.name}</Text>
                            <Text style={styles.timeText}>{item.duree}</Text>
                            </View>

                            <View style={styles.doneContainer}>
                            <Text style={styles.done}>{item.finiOuPas === 1 ? 'Done' : 'Waiting'}</Text>
                            </View>
                        </View>

                        
                        </TouchableOpacity>
                    )}
                />
            </ScrollView>

      </SafeAreaView>
    );
  };
  
  export default HomeWork;
  
  const styles = StyleSheet.create({
    container: {
        // width: 300, // Réduisez la largeur pour permettre à plusieurs éléments de s'afficher
        // marginHorizontal: 10,
      },
    oneMatterContainer: {
      flexDirection: 'row',
      marginTop: 7,
      padding: 26,
      borderRadius: 20,
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      
    //   marginHorizontal: 15,
    },
    calculator: {
      padding: 10,
      borderRadius: 10,
      backgroundColor: colors.white,
      marginRight: 40,
    },
    nomMatter: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    basic: {
      marginBottom: 5,
      fontWeight: 'bold',
      fontFamily: fonts.MeaCulpa,
      fontSize: 20,
    },
    done: {
      fontSize: 16,
      fontWeight: 'bold',
      paddingTop: 5,
    },
    doneContainer: {
      marginLeft: 40,
      padding: 10,
      borderRadius: 10,
      backgroundColor: colors.white,
    },
    timeText: {
      color: colors.lightGray,
    },
  });
  