import { Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

export default function Cours() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Bienvenue dans la section Library </Text>
      </View>
    </>
  );
}
