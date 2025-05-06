import React from 'react';
import { View, TouchableOpacity, StyleSheet ,Text} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CustomTabLayout() {
  const router = useRouter();
  const currentPath = usePathname();

  // Fonction pour déterminer si un onglet est actif
  const isActive = (path: string) => {
    if (path === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(path);
  };

  // Fonction pour naviguer vers un chemin
  const navigateTo = (path) => {
    router.push(path);
  };
  console.log(isActive('/'))
  if (!isActive('/chat')) {
    return (
      <View style={styles.container}>
        <View style={styles.mainTabContainer}>
          <TouchableOpacity
            style={isActive('/') ? styles.centerTab : styles.tabItem}
            onPress={() => navigateTo('/')}
          >
            <Ionicons
              name={isActive('/') ? 'home-sharp' : 'home-outline'}
              color={isActive('/') ? '#00F' : 'black'}
              size={24}
            />
          </TouchableOpacity>

          <TouchableOpacity
            // style={styles.tabItem} 
            onPress={() => navigateTo('/calendar')}
            style={isActive('/calendar') ? styles.centerTab : styles.tabItem}
          >
            <Ionicons
              name={isActive('/calendar') ? 'calendar-sharp' : 'calendar-outline'}
              color={isActive('/calendar') ? '#00F' : 'black'}
              size={24}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={isActive('/library') ? styles.centerTab : styles.tabItem}
            onPress={() => navigateTo('/library')}
          >
            <Ionicons
              name={isActive('/library') ? 'library-sharp' : 'library-outline'}
              color={isActive('/library') ? '#00F' : 'black'}
              size={24}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.profileTabContainer}>
          
          <TouchableOpacity
            style={isActive('/chat') ? styles.centerTab : styles.tabItem}
            onPress={() => navigateTo('/chat')}
          >
            <Ionicons
              name={isActive('/chat') ? 'chatbubble-sharp' : 'chatbubble-outline'}
              color={isActive('/chat') ? '#00F' : 'black'}

              size={24}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
      <View style={styles.SecondTabContainer}>
        <TouchableOpacity          
          onPress={() => navigateTo('/')}
          style={{display:"flex", flexDirection:"row"}}
        >
          <Ionicons
              name={isActive('/chat') ? 'chatbubbles-sharp' : 'chatbubbles-outline'}
              color={isActive('/chat') ? '#00F' : 'black'}

              size={24}
            />
          <Text style={{color:'white', fontSize:24 ,marginLeft:20}}>
            Chat
          </Text>
        </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainTabContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 80,
    width: '70%',
    borderRadius: 25,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileTabContainer: {
    backgroundColor: 'white',
    height: 80,
    width: '20%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
  },

  centerTab: {
    backgroundColor: 'black',
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  oneTab:{
    backgroundColor:'black'
  },
  profileTabItem: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
  },
  SecondTabContainer: {
    backgroundColor: 'black',
    flexDirection: 'row',
    height: 60,
    // width: '70%',
    borderRadius: 25,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:50,
    alignSelf:'center',
    paddingHorizontal:40,
    
  },
});