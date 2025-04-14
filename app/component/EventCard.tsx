import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';


// 

const EventCard: React.FC = () => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: 'https://i.pinimg.com/736x/51/45/0b/51450bb8e74a6d3f0ebffcc113abc8cb.jpg' }} 
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Comedy show</Text>
        <Text style={styles.date}>26 Apr, 6:30pm</Text>
      </View>
      <TouchableOpacity style={styles.heartBtn}>
        <Feather name="heart" size={18} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#F9F1FF',
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
