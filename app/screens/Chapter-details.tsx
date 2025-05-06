// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
//   Linking,
//   Dimensions,
//   Image
// } from 'react-native';
// import { WebView } from 'react-native-webview';
// import { ArrowLeft, CheckCircle, BookOpen, Clock, PlayCircle } from 'lucide-react-native';
// import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
// import { LinearGradient } from 'expo-linear-gradient';
// import { colors } from '@/utils/colors';

// const { width } = Dimensions.get('window');

// const ChapterDetails = () => {
//   const router = useRouter();
//   const params = useLocalSearchParams();
//   const [completed, setCompleted] = useState(params.termine === 'true');
//   const [activeTab, setActiveTab] = useState('content');
//   const mainColor = colors[params.color] || colors.purple;

//   // Extraire l'ID YouTube de l'URL
//   const getYouTubeId = (url) => {
//     if (!url) return null;
//     const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
//     const match = url.match(regExp);
//     return (match && match[2].length === 11) ? match[2] : null;
//   };

//   const youtubeId = getYouTubeId(params.videoUrl);
//   const embedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;

//   return (
//     <>
//       <Stack.Screen options={{ headerShown: false }} />
      
//       <SafeAreaView style={styles.container}>
//         <StatusBar barStyle="light-content" />
        
//         {/* Header avec bouton retour */}
//         <LinearGradient
//           colors={[mainColor, `${mainColor}dd`]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={styles.header}
//         >
//           <TouchableOpacity 
//             style={styles.backButton}
//             onPress={() => router.back()}
//           >
//             <ArrowLeft size={28} color="#fff" strokeWidth={2.5} />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle} numberOfLines={1}>{params.titre}</Text>
//         </LinearGradient>

//         <ScrollView style={styles.scrollView}>
//           {/* Player YouTube */}
//           <View style={styles.videoContainer}>
//             {youtubeId ? (
//               <WebView
//                 style={styles.video}
//                 javaScriptEnabled={true}
//                 domStorageEnabled={true}
//                 source={{ uri: embedUrl }}
//                 allowsFullscreenVideo={true}
//               />
//             ) : (
//               <View style={styles.videoFallback}>
//                 <PlayCircle size={48} color={mainColor} />
//                 <Text style={styles.fallbackText}>Aucune vidéo disponible</Text>
//                 {params.videoUrl && (
//                   <TouchableOpacity 
//                     style={[styles.youtubeButton, { backgroundColor: mainColor }]}
//                     onPress={() => Linking.openURL(params.videoUrl)}
//                   >
//                     <Text style={styles.youtubeButtonText}>Ouvrir la vidéo</Text>
//                   </TouchableOpacity>
//                 )}
//               </View>
//             )}
//           </View>

//           {/* Onglets */}
//           <View style={styles.tabsContainer}>
//             <TouchableOpacity
//               style={[styles.tab, activeTab === 'content' && styles.activeTab]}
//               onPress={() => setActiveTab('content')}
//             >
//               <BookOpen size={18} color={activeTab === 'content' ? mainColor : colors.gray} />
//               <Text style={[styles.tabText, activeTab === 'content' && { color: mainColor }]}>
//                 Contenu
//               </Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity
//               style={[styles.tab, activeTab === 'resources' && styles.activeTab]}
//               onPress={() => setActiveTab('resources')}
//             >
//               <PlayCircle size={18} color={activeTab === 'resources' ? mainColor : colors.gray} />
//               <Text style={[styles.tabText, activeTab === 'resources' && { color: mainColor }]}>
//                 Vidéos
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {/* Contenu du chapitre */}
//           {activeTab === 'content' && (
//             <View style={styles.contentCard}>
//               <View style={styles.metaContainer}>
//                 <View style={styles.metaItem}>
//                   <Clock size={18} color={colors.gray} />
//                   <Text style={styles.metaText}>{params.duree || 'Durée non spécifiée'}</Text>
//                 </View>
                
//                 <TouchableOpacity
//                   style={[styles.completionButton, completed && styles.completedButton]}
//                   onPress={() => setCompleted(!completed)}
//                 >
//                   <CheckCircle size={18} color={completed ? '#fff' : colors.gray} />
//                   <Text style={[styles.completionText, completed && styles.completedText]}>
//                     {completed ? 'Terminé' : 'Marquer comme terminé'}
//                   </Text>
//                 </TouchableOpacity>
//               </View>

//               <Text style={styles.contentTitle}>Description du chapitre</Text>
//               <Text style={styles.contentText}>{params.description || 'Aucune description disponible'}</Text>

//               {params.videoDescription && (
//                 <>
//                   <Text style={styles.contentTitle}>À propos de la vidéo</Text>
//                   <Text style={styles.contentText}>{params.videoDescription}</Text>
//                 </>
//               )}
//             </View>
//           )}

//           {/* Section Vidéos */}
//           {activeTab === 'resources' && (
//             <View style={styles.resourcesCard}>
//               <Text style={styles.sectionTitle}>Vidéos du cours</Text>
              
//               {params.videoUrl ? (
//                 <TouchableOpacity 
//                   style={styles.resourceItem}
//                   onPress={() => Linking.openURL(params.videoUrl)}
//                 >
//                   <View style={[styles.videoThumbnail, { backgroundColor: `${mainColor}20` }]}>
//                     <PlayCircle size={24} color={mainColor} />
//                   </View>
//                   <View style={styles.resourceTextContainer}>
//                     <Text style={styles.resourceTitle}>Vidéo principale</Text>
//                     {params.videoDescription && (
//                       <Text style={styles.resourceDescription} numberOfLines={2}>
//                         {params.videoDescription}
//                       </Text>
//                     )}
//                   </View>
//                 </TouchableOpacity>
//               ) : (
//                 <Text style={styles.emptyText}>Aucune vidéo disponible pour ce chapitre</Text>
//               )}

//               {/* Vous pouvez ajouter d'autres vidéos ici si elles sont disponibles dans l'API */}
//             </View>
//           )}

//           {/* Ressources supplémentaires */}
//           <View style={styles.resourcesCard}>
//             <Text style={styles.sectionTitle}>Ressources complémentaires</Text>
//             <TouchableOpacity style={styles.resourceItem}>
//               <View style={[styles.iconContainer, { backgroundColor: `${mainColor}20` }]}>
//                 <BookOpen size={18} color={mainColor} />
//               </View>
//               <Text style={styles.resourceText}>Fiche de révision</Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//   },
//   header: {
//     height: 120,
//     paddingTop: 50,
//     paddingHorizontal: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 15,
//     elevation: 5,
//   },
//   backButton: {
//     marginRight: 16,
//     padding: 4,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     borderRadius: 20,
//     width: 40,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: 20,
//     color: '#fff',
//     fontFamily: 'Inter_700Bold',
//     flex: 1,
//     marginRight: 10,
//   },
//   scrollView: {
//     flex: 1,
//     marginTop: -20,
//   },
//   videoContainer: {
//     height: width * 0.56, // 16:9 ratio
//     marginHorizontal: 16,
//     marginTop: 20,
//     borderRadius: 12,
//     overflow: 'hidden',
//     backgroundColor: '#000',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   video: {
//     flex: 1,
//   },
//   videoFallback: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#f0f0f0',
//   },
//   fallbackText: {
//     color: colors.darkGray,
//     fontSize: 16,
//     marginTop: 15,
//     marginBottom: 20,
//     fontFamily: 'Inter_500Medium',
//   },
//   youtubeButton: {
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   youtubeButtonText: {
//     color: '#fff',
//     fontFamily: 'Inter_600SemiBold',
//   },
//   tabsContainer: {
//     flexDirection: 'row',
//     marginHorizontal: 16,
//     marginTop: 20,
//     backgroundColor: colors.white,
//     borderRadius: 12,
//     padding: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   tab: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   activeTab: {
//     backgroundColor: `${colors.purple}10`,
//   },
//   tabText: {
//     marginLeft: 8,
//     fontFamily: 'Inter_600SemiBold',
//     color: colors.gray,
//   },
//   contentCard: {
//     backgroundColor: colors.white,
//     borderRadius: 16,
//     margin: 16,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   metaContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   metaItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   metaText: {
//     fontSize: 14,
//     color: colors.gray,
//     marginLeft: 6,
//     fontFamily: 'Inter_500Medium',
//   },
//   completionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: colors.lightGray,
//   },
//   completedButton: {
//     backgroundColor: colors.green,
//     borderColor: colors.green,
//   },
//   completionText: {
//     fontSize: 12,
//     color: colors.gray,
//     marginLeft: 6,
//     fontFamily: 'Inter_600SemiBold',
//   },
//   completedText: {
//     color: '#fff',
//   },
//   contentTitle: {
//     fontSize: 18,
//     fontFamily: 'Inter_700Bold',
//     color: colors.darkGray,
//     marginBottom: 12,
//   },
//   contentText: {
//     fontSize: 15,
//     lineHeight: 24,
//     color: colors.gray,
//     fontFamily: 'Inter_400Regular',
//     marginBottom: 20,
//   },
//   resourcesCard: {
//     backgroundColor: colors.white,
//     borderRadius: 16,
//     marginHorizontal: 16,
//     marginBottom: 20,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontFamily: 'Inter_700Bold',
//     color: colors.darkGray,
//     marginBottom: 15,
//   },
//   resourceItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//   },
//   iconContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   videoThumbnail: {
//     width: 60,
//     height: 60,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   resourceTextContainer: {
//     flex: 1,
//   },
//   resourceTitle: {
//     fontSize: 15,
//     fontFamily: 'Inter_600SemiBold',
//     color: colors.darkGray,
//     marginBottom: 4,
//   },
//   resourceDescription: {
//     fontSize: 13,
//     color: colors.gray,
//     fontFamily: 'Inter_400Regular',
//   },
//   resourceText: {
//     fontSize: 15,
//     color: colors.darkGray,
//     fontFamily: 'Inter_500Medium',
//     flex: 1,
//   },
//   emptyText: {
//     color: colors.gray,
//     fontFamily: 'Inter_400Regular',
//     textAlign: 'center',
//     marginVertical: 10,
//   },
// });

// export default ChapterDetails;

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Linking,
  Dimensions,
  Image,
  FlatList
} from 'react-native';
import { WebView } from 'react-native-webview';
import { ArrowLeft, CheckCircle, BookOpen, Clock, PlayCircle, ChevronRight } from 'lucide-react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/utils/colors';

const { width } = Dimensions.get('window');

const ChapterDetails = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [completed, setCompleted] = useState(params.termine === 'true');
  const [activeTab, setActiveTab] = useState('content');
  const mainColor = colors[params.color] || colors.purple;

  // Extraire l'ID YouTube de l'URL
  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Supposons que params.videos contient le tableau des vidéos du cours
  const videos = params.videos ? JSON.parse(params.videos) : [];
  const currentVideo = videos.find(v => v.videoUrl === params.videoUrl) || videos[0];

  const youtubeId = getYouTubeId(currentVideo?.videoUrl);
  const embedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        
        {/* Header avec bouton retour */}
        <LinearGradient
          colors={[mainColor, `${mainColor}dd`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={28} color="#fff" strokeWidth={2.5} />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>{params.titre}</Text>
        </LinearGradient>

        <ScrollView style={styles.scrollView}>
          {/* Player YouTube */}
          <View style={styles.videoContainer}>
            {youtubeId ? (
              <WebView
                style={styles.video}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{ uri: embedUrl }}
                allowsFullscreenVideo={true}
              />
            ) : (
              <View style={styles.videoFallback}>
                <PlayCircle size={48} color={mainColor} />
                <Text style={styles.fallbackText}>Aucune vidéo disponible pour l'instant</Text>
                {currentVideo?.videoUrl && (
                  <TouchableOpacity 
                    style={[styles.youtubeButton, { backgroundColor: mainColor }]}
                    onPress={() => Linking.openURL(currentVideo.videoUrl)}
                  >
                    <Text style={styles.youtubeButtonText}>Ouvrir la vidéo</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>

          {/* Onglets */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'content' && styles.activeTab]}
              onPress={() => setActiveTab('content')}
            >
              <BookOpen size={18} color={activeTab === 'content' ? mainColor : colors.gray} />
              <Text style={[styles.tabText, activeTab === 'content' && { color: mainColor }]}>
                Contenu
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.tab, activeTab === 'resources' && styles.activeTab]}
              onPress={() => setActiveTab('resources')}
            >
              <PlayCircle size={18} color={activeTab === 'resources' ? mainColor : colors.gray} />
              <Text style={[styles.tabText, activeTab === 'resources' && { color: mainColor }]}>
                Vidéos ({videos.length})
              </Text>
            </TouchableOpacity>
          </View>

          {/* Contenu du chapitre */}
          {activeTab === 'content' && (
            <View style={styles.contentCard}>
              <View style={styles.metaContainer}>
                <View style={styles.metaItem}>
                  <Clock size={18} color={colors.gray} />
                  <Text style={styles.metaText}>{params.duree || 'Durée non spécifiée'}</Text>
                </View>
                
                <TouchableOpacity
                  style={[styles.completionButton, completed && styles.completedButton]}
                  onPress={() => setCompleted(!completed)}
                >
                  <CheckCircle size={18} color={completed ? '#fff' : colors.gray} />
                  <Text style={[styles.completionText, completed && styles.completedText]}>
                    {completed ? 'Terminé' : 'Marquer comme terminé'}
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.contentTitle}>Description du chapitre</Text>
              <Text style={styles.contentText}>{params.description || 'Aucune description disponible'}</Text>

              {currentVideo?.description && (
                <>
                  <Text style={styles.contentTitle}>À propos de la vidéo</Text>
                  <Text style={styles.contentText}>{currentVideo.description}</Text>
                </>
              )}
            </View>
          )}

          {/* Section Vidéos */}
          {activeTab === 'resources' && (
            <View style={styles.resourcesCard}>
              <Text style={styles.sectionTitle}>Vidéos du cours</Text>
              
              {videos.length > 0 ? (
                <FlatList
                  data={videos}
                  scrollEnabled={false}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity 
                      style={[
                        styles.resourceItem, 
                        item.videoUrl === currentVideo?.videoUrl && styles.activeVideoItem
                      ]}
                      onPress={() => router.setParams({ 
                        ...params, 
                        videoUrl: item.videoUrl 
                      })}
                    >
                      <View style={[styles.videoThumbnail, { backgroundColor: `${mainColor}20` }]}>
                        <PlayCircle size={24} color={mainColor} />
                      </View>
                      <View style={styles.resourceTextContainer}>
                        <Text style={styles.resourceTitle}>{item.name}</Text>
                        <Text style={styles.resourceDescription} numberOfLines={2}>
                          {item.description}
                        </Text>
                      </View>
                      <ChevronRight size={20} color={colors.gray} />
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <Text style={styles.emptyText}>Aucune vidéo disponible pour ce chapitre</Text>
              )}
            </View>
          )}

          {/* Ressources supplémentaires */}
          <View style={styles.resourcesCard}>
            <Text style={styles.sectionTitle}>Ressources complémentaires</Text>
            <TouchableOpacity style={styles.resourceItem}>
              <View style={[styles.iconContainer, { backgroundColor: `${mainColor}20` }]}>
                <BookOpen size={18} color={mainColor} />
              </View>
              <Text style={styles.resourceText}>Fiche de révision</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    height: 120,
    paddingTop: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  backButton: {
    marginRight: 16,
    padding: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Inter_700Bold',
    flex: 1,
    marginRight: 10,
  },
  scrollView: {
    flex: 1,
    marginTop: -20,
  },
  videoContainer: {
    height: width * 0.56,
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  video: {
    flex: 1,
  },
  videoFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  fallbackText: {
    color: colors.darkGray,
    fontSize: 16,
    marginTop: 15,
    marginBottom: 20,
    fontFamily: 'Inter_500Medium',
  },
  youtubeButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  youtubeButtonText: {
    color: '#fff',
    fontFamily: 'Inter_600SemiBold',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: `${colors.purple}10`,
  },
  tabText: {
    marginLeft: 8,
    fontFamily: 'Inter_600SemiBold',
    color: colors.gray,
  },
  contentCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    margin: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 14,
    color: colors.gray,
    marginLeft: 6,
    fontFamily: 'Inter_500Medium',
  },
  completionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  completedButton: {
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  completionText: {
    fontSize: 12,
    color: colors.gray,
    marginLeft: 6,
    fontFamily: 'Inter_600SemiBold',
  },
  completedText: {
    color: '#fff',
  },
  contentTitle: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: colors.darkGray,
    marginBottom: 12,
  },
  contentText: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.gray,
    fontFamily: 'Inter_400Regular',
    marginBottom: 20,
  },
  resourcesCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: colors.darkGray,
    marginBottom: 15,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  activeVideoItem: {
    backgroundColor: `${colors.purple}08`,
    borderWidth: 1,
    borderColor: `${colors.purple}20`,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  videoThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resourceTextContainer: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    color: colors.darkGray,
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 13,
    color: colors.gray,
    fontFamily: 'Inter_400Regular',
  },
  resourceText: {
    fontSize: 15,
    color: colors.darkGray,
    fontFamily: 'Inter_500Medium',
    flex: 1,
  },
  emptyText: {
    color: colors.gray,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default ChapterDetails;