import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

const TaskCard: React.FC = () => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.iconBox}>
          <Ionicons name="calculator-sharp" size={20} color="#000" />
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>Homework</Text>
          <Feather name="check-circle" size={16} color="#000" />
        </View>
      </View>

      <Text style={styles.title}>Basic mathematics</Text>
      <Text style={styles.time}>Today, 08:15am</Text>

      <View style={styles.footer}>
        <Image
          source={{ uri: 'https://i.pinimg.com/736x/51/45/0b/51450bb8e74a6d3f0ebffcc113abc8cb.jpg' }} 
          style={styles.avatar}
        />
        <Text style={styles.name}>Jane Cooper</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#EAEAFE',
    borderRadius: 20,
    padding: 16,
    margin: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBox: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
  },
  tag: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems: 'center',
    gap: 5,
  },
  tagText: {
    fontSize: 13,
    color: '#333',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#000',
  },
  time: {
    color: '#777',
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 8,
    marginRight: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default TaskCard;
