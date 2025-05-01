import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,FlatList, } from 'react-native';
import { Feather } from '@expo/vector-icons';
import GlobalApi from '../Shared/GlobalApi';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '@/utils/colors';


// 

const EventCard: React.FC = () => {

  const [eventCard,setEventCard]= useState([])
  
        useEffect(()=>{
          getEvent();
      
      
        },[])
      
      
        const getEvent=async()=>{
          try{
              const result=(await GlobalApi.getEvent()).data;
              // console.log("Result-->", result)
              // console.log("Result Data-->", result.data);
  
              const resp = result.data.map((item) => {
                const imageUrl = item.attributes.eventImage.data[0]?.attributes?.url || '';
                return {
                  id: item.id,
                  name: item.attributes.Name,
                  date: item.attributes.date,
                  liked: item.attributes.liked,
                  couleur:item.attributes.color,
                  image: imageUrl,
                };
              });
               console.log("EventList",resp);
              setEventCard(resp); 
          } catch (error) {
              console.error("Erreur dans getEvent():", error);
          }
          };
        

          const renderItem = ({ item }) => (
            <View style={[styles.card, { backgroundColor: colors[item.couleur]  || colors.purple }]}>
              <Image
                source={{ uri: item.image }}
                style={styles.image}
              />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
              </View>
              <TouchableOpacity style={styles.heartBtn}>
                <Ionicons
                  name={item.liked ? 'heart' : 'heart-outline'}
                  size={20}
                  color={item.liked ? 'red' : '#000'}
                />
              </TouchableOpacity>
            </View>
          );
      
          return (
            <FlatList
              data={eventCard}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 100 }}
            />
          );
        };


const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    //backgroundColor: colors.item.color,
    borderRadius: 20,
    // paddingLeft:0,
    paddingRight: 12,
    margin: 16,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  heartBtn: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 6,
  },
});

export default EventCard;
