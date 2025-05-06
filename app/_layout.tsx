import { Stack } from "expo-router";
import NotificationsScreen from "./(tabs)/Notifications";
import ClassDetailScreen from "./screens/ClassDetail";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* <Stack.Screen name="screens" options={{ headerShown: false }} />  */}
      {/* <Stack.Screen name="Notifications" options={{ headerShown: false }} /> */}
      
      
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
