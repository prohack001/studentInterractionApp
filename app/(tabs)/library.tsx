import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { fonts } from '@/utils/fonts';

export default function library({ children, activeTab }: { children: React.ReactNode, activeTab: string }) {
  const router = useRouter();

  const handleTabPress = (tabName: string, route: string) => {
    router.push(route);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Contenu de la page */}
      {children}
      
      {/* Barre d'onglets */}
      <View style={styles.sujetContainer}>
        <TouchableOpacity onPress={() => handleTabPress("Subjects", "/screens/SubjectScreen")}>
          <Text style={[styles.tabText, activeTab === "Subjects" && styles.activeTabText]}>Subjects</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleTabPress("HomeWork", "/HomeWork")}>
          <Text style={[styles.tabText, activeTab === "HomeWork" && styles.activeTabText]}>HomeWork</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleTabPress("Library", "/screens/LibraryScreen")}>
          <Text style={[styles.tabText, activeTab === "Library" && styles.activeTabText]}>Library</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sujetContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  tabText: {
    fontSize: 20,
    color: '#aaa',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#000',
    fontWeight: 'bold',
  },
});