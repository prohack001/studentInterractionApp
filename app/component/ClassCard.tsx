import { StyleSheet, Text, View, Pressable, Image, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import { Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import GlobalApi  from '../Shared/GlobalApi';
import { fonts } from '@/utils/fonts';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Octicons from '@expo/vector-icons/Octicons';
import { colors } from '@/utils/colors';



export default function ClassCard()  {

    const [classCard,setClassCard]= useState([])

      useEffect(()=>{
        getClass();
    
    
      },[])
    
    
      const getClass=async()=>{
        try{
            const result=(await GlobalApi.getClass()).data;
            // console.log("Result-->", result)
            // console.log("Result Data-->", result.data);

            const resp = result.data.map((item) => ({
                id: item.id,
                name: item.attributes.Name,
                teacherName: item.attributes.TeacherName,
                image: item.attributes.teacherImage.data[0].attributes.url,
                homeworkDone:item.attributes.homeworkDone, 
                couleur: item.attributes.color,
                date:item.attributes.date,
            }));
            // console.log("ClassList",resp);
            setClassCard(resp); 
        } catch (error) {
            console.error("Erreur dans getClass():", error);
        }
    }
    


return (
    <SafeAreaView>
      <ScrollView>
        {classCard.map((item) => (
          <TouchableOpacity onPress={() => handleTabPress("Cours", "screens/CoursScreen")} key={item.id} style={[styles.oneMatterContainer, { backgroundColor:  colors[item.couleur]  || colors.purple }]}>
            <View style={styles.calculatorContainer}>
              <View style={styles.calculator}>
                <FontAwesome6 name="calculator" size={32} color="black" />
              </View>
              <View style={styles.doneContainer}>
                <Text style={styles.done}>Homework</Text>
                {item.homeworkDone === 1 ? (
                  <Octicons name="check" size={24} color="black" />
                ) : (
                  <Octicons name="dash" size={24} color="black" />
                )}
              </View>
            </View>
            <View style={styles.nomMatter}>
              <Text style={styles.basic}>{item.name}</Text>
              <Text style={styles.timeText}>{item.date}</Text>
            </View>
            <View style={styles.imageContainer}>
              <Image style={{ borderRadius: 7, width: 45, height: 45 }} source={{ uri: item.image }} />
              <Text style={styles.profName}>{item.teacherName}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  oneMatterContainer: {
    flexDirection: 'column',
    marginTop: 7,
    padding: 26,
    borderRadius: 20,
    justifyContent: 'space-around',
    marginHorizontal: 15,
  },
  calculatorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calculator: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.white,
    marginRight: 40,
  },
  doneContainer: {
    marginLeft: 40,
    padding: 5,
    paddingTop: 10,
    borderRadius: 14,
    backgroundColor: colors.white,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  done: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  nomMatter: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  basic: {
    marginBottom: 5,
    fontWeight: 'bold',
    fontFamily: fonts.MeaCulpa,
    fontSize: 20,
  },
  timeText: {
    color: colors.lightGray,
  },
  imageContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  profName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  }
})

    
