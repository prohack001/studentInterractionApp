// // // import React from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   ScrollView,
// // //   StyleSheet,
// // //   TouchableOpacity,
// // //   SafeAreaView,
// // //   StatusBar,
// // //   Image ,
// // // } from 'react-native';
// // // import { ArrowLeft, Play, CheckCircle, Clock } from 'lucide-react-native';
// // // import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
// // // import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
// // // import { colors } from '@/utils/colors';
// // // import { FlatList } from 'react-native-gesture-handler';
// // // import { Ionicons } from '@expo/vector-icons';
// // // import { Colors } from 'react-native/Libraries/NewAppScreen';
// // // import { GestureHandlerRootView } from 'react-native-gesture-handler'; 


// // // const HomeworkDetails = () => {
// // //   const router = useRouter();
// // //   const params = useLocalSearchParams();
  
// // //   // Récupérez les données du homework
// // //   const homework = {
// // //     id: params.id,
// // //     name: params.name,
// // //     iconName: params.iconName,
// // //     duree: params.duree,
// // //     finiOuPas: params.finiOuPas,
// // //     couleur: params.couleur,
// // //   };

// // //   // Données factices pour les leçons et tâches (à remplacer par vos vraies données)
// // //   const videoLessons = [
// // //     {
// // //       id: '1',
// // //       title: 'Intro',
// // //       duration: '30 min',
// // //     },
// // //     {
// // //       id: '2',
// // //       title: 'Concepts de base',
// // //       duration: '25 min',
// // //     },
// // //   ];

// // //   const tasks = [
// // //     { id: '1', duration: '30 min', status: homework.finiOuPas === '1' ? 'uploaded' : 'to do' },
// // //     { id: '2', duration: '60 min', status: 'to do' },
// // //   ];

// // //   return (
// // //      <>
        
// // //         <Stack.Screen options={{ headerShown: false }} />
// // //         <GestureHandlerRootView style={{ flex: 1 }}>
// // //           <SafeAreaView style={styles.container}>
// // //             <StatusBar barStyle="dark-content" />
            
// // //             {/* Header */}
// // //             <View style={styles.header}>
// // //               <TouchableOpacity 
// // //                 style={styles.backButton}
// // //                 onPress={() => router.back()}
// // //               >
// // //                 <ArrowLeft size={24} color="#000" />
// // //               </TouchableOpacity>
// // //               <Text style={styles.headerTitle}>{homework.name}</Text>
// // //             </View>

// // //             <ScrollView style={styles.scrollView}>
// // //               {/* Informations sur le homework */}
// // //               <View style={styles.homeworkInfo}>
// // //                 <View style={[styles.iconContainer, { backgroundColor: colors[homework.color] || colors.purple }]}>
// // //                   <FontAwesome6 name={homework.iconName} size={32} color="black" />
// // //                 </View>
// // //                 <View style={styles.infoText}>
// // //                   <Text style={styles.duration}>Durée: {homework.duree}</Text>
// // //                   <Text style={styles.status}>
// // //                     Statut: {homework.finiOuPas === '1' ? 'Terminé' : 'En attente'}
// // //                   </Text>
// // //                 </View>
// // //                 <View>
// // //                   <Image source={{uri:homework.teacherImage}}
// // //                   style={{height:150, marginTop:10, borderRadius: 10}}/>

// // //                   <Text style={{marginTop:10, fontSize:16, fontWeight:"bold"}}>A propos du cours</Text>
// // //                   <Text numberOfLines={3}
// // //                   style={{color:Colors.gray}}>{homework.description}</Text>
// // //                 </View>
// // //               </View>

// // //               <View style={{marginTop:10}}>
// // //                 <Text style={{fontWeight:"bold", fontSize:16}}> 
// // //                   Contenu du cours
// // //                 </Text>

// // //               <FlatList 
// // //               data={homework?.name}
// // //               renderItem={({item, index})=>(
// // //                 <View style={{display:'flex', flexDirection:"row",
// // //                   backgroundColor:Colors.white, marginBottom:5, 
// // //                   padding:10, alignItems:"center", borderRadius:5,
// // //                 }}>

// // //                   <Text style={{fontWeight:'bold', fontSize:16, color:Colors.gray, marginRight:20}}>{index+1}</Text>
// // //                   <Text style={{fontSize:14, fontWeight:"bold"}}>{item.Chapitre}</Text>
// // //                   <Ionicons name="play-circle" size={24} color={Colors.blue}
// // //                   style={{position:"absolute", right:10}}/>

// // //                 </View>
// // //               )

// // //               }
// // //               />
// // //               </View>

              

// // //               {/* Lessons Section */}
// // //               <View style={styles.sectionHeader}>
// // //                 <Text style={styles.sectionTitle}>Leçons</Text>
// // //                 <TouchableOpacity>
// // //                   <Text style={styles.seeAllText}>Voir tout</Text>
// // //                 </TouchableOpacity>
// // //               </View>

// // //               {/* Liste des leçons */}
// // //               {videoLessons.map((lesson) => (
// // //                 <View key={lesson.id} style={styles.lessonItem}>
// // //                   <Play size={20} color="#666" style={styles.lessonIcon} />
// // //                   <View style={styles.lessonInfo}>
// // //                     <Text style={styles.lessonTitle}>{lesson.title}</Text>
// // //                     <Text style={styles.lessonDuration}>{lesson.duration}</Text>
// // //                   </View>
// // //                 </View>
// // //               ))}

// // //               {/* Tasks Section */}
// // //               <View style={styles.sectionHeader}>
// // //                 <Text style={styles.sectionTitle}>Tâches</Text>
// // //                 <Text style={styles.tasksProgress}>
// // //                   Terminé: {tasks.filter(t => t.status === 'uploaded').length}/{tasks.length}
// // //                 </Text>
// // //               </View>

// // //               {/* Liste des tâches */}
// // //               {tasks.map((task, index) => (
// // //                 <View key={task.id} style={styles.taskItem}>
// // //                   <View style={styles.taskLeftSection}>
// // //                     <Text style={styles.taskNumber}>Tâche {index + 1}</Text>
// // //                     <View style={styles.taskDuration}>
// // //                       <Clock size={16} color="#666" />
// // //                       <Text style={styles.taskDurationText}>{task.duration}</Text>
// // //                     </View>
// // //                   </View>
// // //                   <View>
// // //                     <Text style={task.status === 'uploaded' ? styles.uploadedStatus : styles.todoStatus}>
// // //                       {task.status === 'uploaded' ? 'Terminé' : 'À faire'}
// // //                     </Text>
// // //                   </View>
// // //                 </View>
// // //               ))}
// // //             </ScrollView>
// // //           </SafeAreaView>

// // //         </GestureHandlerRootView>
      
// // //     </>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: '#f5f5f5',
// // //   },
// // //   header: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     padding: 16,
// // //     backgroundColor: '#fff',
// // //   },
// // //   backButton: {
// // //     marginRight: 16,
// // //   },
// // //   headerTitle: {
// // //     fontSize: 20,
// // //     fontWeight: 'bold',
// // //   },
// // //   scrollView: {
// // //     flex: 1,
// // //     padding: 16,
// // //   },
// // //   homeworkInfo: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     backgroundColor: '#fff',
// // //     padding: 16,
// // //     borderRadius: 12,
// // //     marginBottom: 20,
// // //   },
// // //   iconContainer: {
// // //     padding: 16,
// // //     borderRadius: 12,
// // //     marginRight: 16,
// // //   },
// // //   infoText: {
// // //     flex: 1,
// // //   },
// // //   duration: {
// // //     fontSize: 16,
// // //     marginBottom: 8,
// // //   },
// // //   status: {
// // //     fontSize: 16,
// // //     fontWeight: 'bold',
// // //   },
// // //   sectionHeader: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //     alignItems: 'center',
// // //     marginBottom: 16,
// // //   },
// // //   sectionTitle: {
// // //     fontSize: 18,
// // //     fontWeight: 'bold',
// // //   },
// // //   seeAllText: {
// // //     color: '#666',
// // //   },
// // //   tasksProgress: {
// // //     color: '#666',
// // //   },
// // //   lessonItem: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     backgroundColor: '#fff',
// // //     padding: 16,
// // //     borderRadius: 8,
// // //     marginBottom: 12,
// // //   },
// // //   lessonIcon: {
// // //     marginRight: 16,
// // //   },
// // //   lessonInfo: {
// // //     flex: 1,
// // //   },
// // //   lessonTitle: {
// // //     fontSize: 16,
// // //     fontWeight: 'bold',
// // //   },
// // //   lessonDuration: {
// // //     color: '#666',
// // //     fontSize: 14,
// // //     marginTop: 4,
// // //   },
// // //   taskItem: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //     alignItems: 'center',
// // //     backgroundColor: '#fff',
// // //     padding: 16,
// // //     borderRadius: 8,
// // //     marginBottom: 12,
// // //   },
// // //   taskLeftSection: {
// // //     gap: 8,
// // //   },
// // //   taskNumber: {
// // //     fontSize: 16,
// // //     fontWeight: 'bold',
// // //   },
// // //   taskDuration: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     gap: 4,
// // //   },
// // //   taskDurationText: {
// // //     color: '#666',
// // //     fontSize: 14,
// // //   },
// // //   uploadedStatus: {
// // //     color: '#4caf50',
// // //     fontWeight: 'bold',
// // //   },
// // //   todoStatus: {
// // //     color: '#666',
// // //     fontWeight: 'bold',
// // //   },
// // // });

// // // export default HomeworkDetails;
// // import React, { useState, useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   ScrollView,
// //   StyleSheet,
// //   TouchableOpacity,
// //   SafeAreaView,
// //   StatusBar,
// //   Image,
// //   FlatList,
// //   ActivityIndicator,
// //   Dimensions
// // } from 'react-native';
// // import { ArrowLeft, ChevronRight, PlayCircle, CheckCircle, Clock } from 'lucide-react-native';
// // import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
// // import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
// // import { LinearGradient } from 'expo-linear-gradient';
// // import axios from 'axios';

// // // Couleurs plus vibrantes
// // const vibrantColors = {
// //   purple: '#7B2CBF',
// //   green: '#2E8B57',
// //   pink: '#E83F6F',
// //   orange: '#FF7F11',
// //   blue: '#1A8CD8',
// //   lightPurple: '#E0AAFF',
// //   white: '#FFFFFF',
// //   black: '#000000',
// //   gray: '#6C757D',
// //   lightGray: '#E9ECEF',
// //   darkGray: '#343A40',
// //   red: '#DC3545'
// // };

// // const { width } = Dimensions.get('window');

// // const HomeworkDetails = () => {
// //   const router = useRouter();
// //   const params = useLocalSearchParams();
// //   const [homework, setHomework] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchHomeworkData = async () => {
// //       try {
// //         const response = await axios.get(
// //           `https://strapi-server-app-m49w.onrender.com/api/homeworks/${params.id}?populate=*`
// //         );
// //         setHomework(response.data.data);
// //       } catch (err) {
// //         console.error('Error:', err);
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchHomeworkData();
// //   }, [params.id]);

// //   if (loading) {
// //     return (
// //       <View style={styles.loadingContainer}>
// //         <ActivityIndicator size="large" color={vibrantColors.purple} />
// //       </View>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <View style={styles.errorContainer}>
// //         <Text style={styles.errorText}>Erreur de chargement</Text>
// //         <TouchableOpacity 
// //           style={[styles.button, { backgroundColor: vibrantColors.purple }]}
// //           onPress={() => router.back()}
// //         >
// //           <Text style={styles.buttonText}>Retour</Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   }

// //   if (!homework) {
// //     return (
// //       <View style={styles.errorContainer}>
// //         <Text style={styles.errorText}>Contenu introuvable</Text>
// //       </View>
// //     );
// //   }

// //   const attributes = homework.attributes;
// //   const teacherImage = attributes.teacherImage?.data?.attributes?.url;
// //   const chapters = attributes.chapitre || [];
// //   const mainColor = vibrantColors[attributes.color] || vibrantColors.purple;

// //   const findMatchingVideo = (chapterTitle) => {
// //     if (!attributes.videos || !attributes.videos.data) return null;
// //     return attributes.videos.data.find(video => 
// //       video.attributes.name.toLowerCase().includes(chapterTitle.toLowerCase()) ||
// //       chapterTitle.toLowerCase().includes(video.attributes.name.toLowerCase())
// //     );
// //   }; 

// //   return (
// //     <>
// //       <Stack.Screen options={{ headerShown: false }} />
      
// //       <SafeAreaView style={styles.container}>
// //         <StatusBar barStyle="light-content" backgroundColor={mainColor} />
        
// //         {/* Header compact avec couleur vibrante */}
// //         {/* Header avec dégradé subtil */}
// // <LinearGradient
// //   colors={[
// //     mainColor, 
// //     `${mainColor}`, 
// //     `${mainColor}dd`, // Légère transparence
// //     `${mainColor}cc`
// //   ]}
// //   start={{ x: 0, y: 0 }}
// //   end={{ x: 1, y: 0 }}
// //   style={[styles.header, { 
// //     borderBottomLeftRadius: 20,
// //     borderBottomRightRadius: 20,
// //     shadowColor: vibrantColors.black,
// //     shadowOffset: { width: 0, height: 4 },
// //     shadowOpacity: 0.15,
// //     shadowRadius: 8,
// //     elevation: 5,
// //   }]}
// // >
// //   <View style={styles.headerContent}>
// //     <TouchableOpacity 
// //       style={styles.backButton}
// //       onPress={() => router.back()}
// //     >
// //       <ArrowLeft size={28} color={vibrantColors.white} strokeWidth={2.5} />
// //     </TouchableOpacity>
// //     <Text style={styles.headerTitle} numberOfLines={2}>
// //       {attributes.Name}
// //     </Text>
// //   </View>
  
// //   {/* Légère vague blanche pour la transition */}
// //   <View style={styles.bottomWave}>
// //     <View style={[styles.waveLine, { 
// //       backgroundColor: `${mainColor}33`,
// //       height: 8 
// //     }]} />
// //     <View style={[styles.waveLine, { 
// //       backgroundColor: `${mainColor}22`,
// //       height: 6 
// //     }]} />
// //     <View style={[styles.waveLine, { 
// //       backgroundColor: `${mainColor}11`,
// //       height: 4 
// //     }]} />
// //   </View>
// // </LinearGradient>

// //         <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
// //           {/* Carte enseignant */}
// //           <View style={[styles.teacherCard, { borderTopColor: mainColor }]}>
// //             {teacherImage && (
// //               <Image 
// //                 source={{ uri: teacherImage }}
// //                 style={styles.teacherImage}
// //               />
// //             )}
// //             <View style={styles.teacherInfo}>
// //               <View style={styles.durationBadge}>
// //                 <Clock size={16} color={vibrantColors.white} />
// //                 <Text style={styles.durationText}>{attributes.Duree}</Text>
// //               </View>
// //               <View style={[styles.statusBadge, { 
// //                 backgroundColor: attributes.FiniOuPas ? vibrantColors.green : vibrantColors.orange 
// //               }]}>
// //                 <Text style={styles.statusText}>
// //                   {attributes.FiniOuPas ? 'COMPLÉTÉ' : 'EN COURS'}
// //                 </Text>
// //               </View>
// //             </View>
// //           </View>

// //           {/* Description */}
// //           <View style={styles.descriptionCard}>
// //             <Text style={styles.sectionTitle}>DESCRIPTION</Text>
// //             <Text style={styles.descriptionText}>{attributes.description}</Text>
// //           </View>

// //           {/* Chapitres */}
// //           <View style={styles.sectionContainer}>
// //             <Text style={styles.sectionTitle}>CHAPITRES ({chapters.length})</Text>

          
            
// //             {chapters.length > 0 ? (
// //               chapters.map((chapter, index) => (
// //                 <TouchableOpacity 
// //                   key={chapter.id}
// //                   style={[styles.chapterCard, { 
// //                     borderLeftColor: mainColor,
// //                     backgroundColor: chapter.termine ? vibrantColors.lightGray : vibrantColors.white
                   
// //                   }]}
// //                   onPress={() => router.push({
// //                     pathname: "/screens/Chapter-details",
// //                     params: {
// //                       ...chapter,
// //                       color: attributes.color,
// //                       videoUrl: matchingVideo?.attributes.videoUrl || '',
// //                       description: matchingVideo?.attributes.description || '',
// //                       courseName: attributes.Name
// //                     }
// //                   })}
// //                   activeOpacity={0.7}
// //                 >
// //                   <View style={styles.chapterNumber}>
// //                     <Text style={[styles.chapterNumberText, { color: mainColor }]}>
// //                       {index + 1}
// //                     </Text>
// //                   </View>
                  
// //                   <View style={styles.chapterContent}>
// //                     <Text style={styles.chapterTitle}>{chapter.titre}</Text>
// //                     {chapter.duree && (
// //                       <View style={styles.chapterMeta}>
// //                         <Clock size={14} color={vibrantColors.gray} />
// //                         <Text style={styles.chapterDuration}>{chapter.duree}</Text>
// //                       </View>
// //                     )}
// //                   </View>
                  
// //                   <View style={styles.chapterAction}>
// //                     {chapter.termine ? (
// //                       <CheckCircle size={22} color={vibrantColors.green} />
// //                     ) : (
// //                       <PlayCircle size={22} color={mainColor} />
// //                     )}
// //                     <ChevronRight size={20} color={vibrantColors.gray} />
// //                   </View>
// //                 </TouchableOpacity>
// //               ))
// //             ) : (
// //               <Text style={styles.emptyText}>Aucun chapitre disponible</Text>
// //             )}
// //           </View>
// //         </ScrollView>
// //       </SafeAreaView>
// //     </>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   header: {
// //     height: 110,
// //     paddingTop: 50,
// //     paddingHorizontal: 20,
// //     position: 'relative',
// //     overflow: 'hidden',
// //   },
// //   headerContent: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     zIndex: 2,
// //   },
// //   bottomWave: {
// //     position: 'absolute',
// //     bottom: 0,
// //     left: 0,
// //     right: 0,
// //     flexDirection: 'column',
// //     alignItems: 'flex-start',
// //   },
// //   waveLine: {
// //     width: '100%',
// //     opacity: 0.7,
// //   },
// //   backButton: {
// //     marginRight: 16,
// //     padding: 4,
// //     backgroundColor: 'rgba(255,255,255,0.2)',
// //     borderRadius: 20,
// //     width: 40,
// //     height: 40,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   headerTitle: {
// //     fontSize: 20,
// //     color: vibrantColors.white,
// //     fontFamily: 'Inter_700Bold',
// //     flex: 1,
// //     textShadowColor: 'rgba(0,0,0,0.3)',
// //     textShadowOffset: { width: 0, height: 1 },
// //     textShadowRadius: 3,
// //     paddingRight: 10,
// //   },
// //   container: {
// //     flex: 1,
// //     backgroundColor: vibrantColors.lightGray,
// //   },
// //   loadingContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: vibrantColors.white,
// //   },
// //   errorContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     padding: 20,
// //     backgroundColor: vibrantColors.white,
// //   },
// //   errorText: {
// //     color: vibrantColors.red,
// //     fontSize: 18,
// //     fontFamily: 'Inter_700Bold',
// //     marginBottom: 20,
// //   },
// //   button: {
// //     paddingHorizontal: 24,
// //     paddingVertical: 12,
// //     borderRadius: 8,
// //   },
// //   buttonText: {
// //     color: vibrantColors.white,
// //     fontFamily: 'Inter_600SemiBold',
// //     fontSize: 16,
// //   },
// //   header: {
// //     height: 100,
// //     paddingTop: 40,
// //     paddingHorizontal: 20,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     shadowColor: vibrantColors.black,
// //     shadowOffset: { width: 0, height: 4 },
// //     shadowOpacity: 0.2,
// //     shadowRadius: 8,
// //     elevation: 5,
// //     zIndex: 10,
// //   },
// //   backButton: {
// //     marginRight: 16,
// //     padding: 4,
// //   },
// //   headerTitle: {
// //     fontSize: 20,
// //     color: vibrantColors.white,
// //     fontFamily: 'Inter_700Bold',
// //     flex: 1,
// //     textShadowColor: 'rgba(0,0,0,0.2)',
// //     textShadowOffset: { width: 0, height: 1 },
// //     textShadowRadius: 2,
// //   },
// //   scrollView: {
// //     flex: 1,
// //   },
// //   teacherCard: {
// //     backgroundColor: vibrantColors.white,
// //     borderRadius: 12,
// //     margin: 16,
// //     padding: 16,
// //     flexDirection: 'row',
// //     borderTopWidth: 4,
// //     shadowColor: vibrantColors.black,
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 6,
// //     elevation: 3,
// //   },
// //   teacherImage: {
// //     width: 80,
// //     height: 80,
// //     borderRadius: 8,
// //     marginRight: 16,
// //   },
// //   teacherInfo: {
// //     flex: 1,
// //     justifyContent: 'space-between',
// //   },
// //   durationBadge: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     backgroundColor: vibrantColors.darkGray,
// //     alignSelf: 'flex-start',
// //     paddingHorizontal: 10,
// //     paddingVertical: 5,
// //     borderRadius: 20,
// //   },
// //   durationText: {
// //     color: vibrantColors.white,
// //     fontFamily: 'Inter_600SemiBold',
// //     fontSize: 12,
// //     marginLeft: 6,
// //   },
// //   statusBadge: {
// //     alignSelf: 'flex-start',
// //     paddingHorizontal: 12,
// //     paddingVertical: 6,
// //     borderRadius: 20,
// //   },
// //   statusText: {
// //     color: vibrantColors.white,
// //     fontFamily: 'Inter_700Bold',
// //     fontSize: 12,
// //     letterSpacing: 0.5,
// //   },
// //   descriptionCard: {
// //     backgroundColor: vibrantColors.white,
// //     borderRadius: 12,
// //     marginHorizontal: 16,
// //     marginBottom: 16,
// //     padding: 20,
// //     shadowColor: vibrantColors.black,
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 6,
// //     elevation: 3,
// //   },
// //   sectionTitle: {
// //     fontSize: 14,
// //     fontFamily: 'Inter_700Bold',
// //     color: vibrantColors.gray,
// //     letterSpacing: 1,
// //     marginBottom: 12,
// //     textTransform: 'uppercase',
// //   },
// //   descriptionText: {
// //     fontSize: 15,
// //     lineHeight: 22,
// //     color: vibrantColors.darkGray,
// //     fontFamily: 'Inter_400Regular',
// //   },
// //   sectionContainer: {
// //     backgroundColor: vibrantColors.white,
// //     borderRadius: 12,
// //     marginHorizontal: 16,
// //     marginBottom: 24,
// //     padding: 20,
// //     shadowColor: vibrantColors.black,
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 6,
// //     elevation: 3,
// //   },
// //   emptyText: {
// //     textAlign: 'center',
// //     color: vibrantColors.gray,
// //     fontFamily: 'Inter_400Regular',
// //     marginVertical: 12,
// //   },
// //   chapterCard: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     padding: 16,
// //     borderRadius: 8,
// //     marginBottom: 10,
// //     borderLeftWidth: 4,
// //   },
// //   chapterNumber: {
// //     width: 32,
// //     height: 32,
// //     borderRadius: 16,
// //     backgroundColor: 'rgba(123, 44, 191, 0.1)',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginRight: 16,
// //   },
// //   chapterNumberText: {
// //     fontFamily: 'Inter_700Bold',
// //     fontSize: 16,
// //   },
// //   chapterContent: {
// //     flex: 1,
// //   },
// //   chapterTitle: {
// //     fontSize: 16,
// //     fontFamily: 'Inter_600SemiBold',
// //     color: vibrantColors.darkGray,
// //     marginBottom: 4,
// //   },
// //   chapterMeta: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   chapterDuration: {
// //     fontSize: 13,
// //     color: vibrantColors.gray,
// //     fontFamily: 'Inter_400Regular',
// //     marginLeft: 4,
// //   },
// //   chapterAction: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginLeft: 10,
// //   },
// // });

// // export default HomeworkDetails;

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
//   Image,
//   ActivityIndicator,
//   Dimensions
// } from 'react-native';
// import { ArrowLeft, ChevronRight, PlayCircle, CheckCircle, Clock } from 'lucide-react-native';
// import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
// import { LinearGradient } from 'expo-linear-gradient';
// import axios from 'axios';

// const colors = {
//   purple: '#7B2CBF',
//   green: '#2E8B57',
//   pink: '#E83F6F',
//   orange: '#FF7F11',
//   blue: '#1A8CD8',
//   lightPurple: '#E0AAFF',
//   white: '#FFFFFF',
//   black: '#000000',
//   gray: '#6C757D',
//   lightGray: '#E9ECEF',
//   darkGray: '#343A40',
//   red: '#DC3545'
// };

// const { width } = Dimensions.get('window');

// const HomeworkDetails = () => {
//   const router = useRouter();
//   const params = useLocalSearchParams();
//   const [homework, setHomework] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchHomeworkData = async () => {
//       try {
//         const response = await axios.get(
//           `https://strapi-server-app-m49w.onrender.com/api/homeworks/${params.id}?populate=*`
//         );
//         setHomework(response.data.data);
//       } catch (err) {
//         console.error('Error:', err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHomeworkData();
//   }, [params.id]);

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={colors.purple} />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>Erreur de chargement</Text>
//         <TouchableOpacity 
//           style={[styles.button, { backgroundColor: colors.purple }]}
//           onPress={() => router.back()}
//         >
//           <Text style={styles.buttonText}>Retour</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   if (!homework) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>Contenu introuvable</Text>
//       </View>
//     );
//   }

//   const attributes = homework.attributes;
//   const teacherImage = attributes.teacherImage?.data?.attributes?.url;
//   const chapters = attributes.chapitre || [];
//   const videos = attributes.video || [];
//   const mainColor = colors[attributes.color] || colors.purple;

//   const findMatchingVideo = (chapterTitle) => {
//     return videos.find(video => 
//       video.name.toLowerCase().includes(chapterTitle.toLowerCase()) ||
//       chapterTitle.toLowerCase().includes(video.name.toLowerCase())
//     );
//   };

//   return (
//     <>
//       <Stack.Screen options={{ headerShown: false }} />
      
//       <SafeAreaView style={styles.container}>
//         <StatusBar barStyle="light-content" backgroundColor={mainColor} />
        
//         <LinearGradient
//           colors={[mainColor, `${mainColor}dd`, `${mainColor}cc`]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 0 }}
//           style={styles.header}
//         >
//           <View style={styles.headerContent}>
//             <TouchableOpacity 
//               style={styles.backButton}
//               onPress={() => router.back()}
//             >
//               <ArrowLeft size={28} color={colors.white} strokeWidth={2.5} />
//             </TouchableOpacity>
//             <Text style={styles.headerTitle} numberOfLines={2}>
//               {attributes.Name}
//             </Text>
//           </View>
//         </LinearGradient>

//         <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
//           <View style={[styles.teacherCard, { borderTopColor: mainColor }]}>
//             {teacherImage && (
//               <Image 
//                 source={{ uri: teacherImage }}
//                 style={styles.teacherImage}
//               />
//             )}
//             <View style={styles.teacherInfo}>
//               <View style={styles.durationBadge}>
//                 <Clock size={16} color={colors.white} />
//                 <Text style={styles.durationText}>{attributes.Duree}</Text>
//               </View>
//               <View style={[styles.statusBadge, { 
//                 backgroundColor: attributes.FiniOuPas ? colors.green : colors.orange 
//               }]}>
//                 <Text style={styles.statusText}>
//                   {attributes.FiniOuPas ? 'COMPLÉTÉ' : 'EN COURS'}
//                 </Text>
//               </View>
//             </View>
//           </View>

//           <View style={styles.descriptionCard}>
//             <Text style={styles.sectionTitle}>DESCRIPTION</Text>
//             <Text style={styles.descriptionText}>{attributes.description}</Text>
//           </View>

//           <View style={styles.sectionContainer}>
//             <Text style={styles.sectionTitle}>CHAPITRES ({chapters.length})</Text>
            
//             {chapters.length > 0 ? (
//               chapters.map((chapter, index) => {
//                 const matchingVideo = findMatchingVideo(chapter.titre);
                
//                 return (
//                   <TouchableOpacity 
//                     key={chapter.id}
//                     style={[styles.chapterCard, { 
//                       borderLeftColor: mainColor,
//                       backgroundColor: chapter.termine ? colors.lightGray : colors.white
//                     }]}
//                     onPress={() => router.push({
//                       pathname: "/screens/Chapter-details",
//                       params: {
//                         id: chapter.id,
//                         titre: chapter.titre,
//                         contenu: chapter.contenu,
//                         duree: chapter.duree,
//                         termine: chapter.termine,
//                         color: attributes.color,
//                         videoUrl: matchingVideo?.videoUrl || '',
//                         description: matchingVideo?.description || '',
//                         courseName: attributes.Name
//                       }
//                     })}
//                     activeOpacity={0.7}
//                   >
//                     <View style={styles.chapterNumber}>
//                       <Text style={[styles.chapterNumberText, { color: mainColor }]}>
//                         {index + 1}
//                       </Text>
//                     </View>
                    
//                     <View style={styles.chapterContent}>
//                       <Text style={styles.chapterTitle}>{chapter.titre}</Text>
//                       {chapter.duree && (
//                         <View style={styles.chapterMeta}>
//                           <Clock size={14} color={colors.gray} />
//                           <Text style={styles.chapterDuration}>{chapter.duree}</Text>
//                         </View>
//                       )}
//                     </View>
                    
//                     <View style={styles.chapterAction}>
//                       {chapter.termine ? (
//                         <CheckCircle size={22} color={colors.green} />
//                       ) : (
//                         <PlayCircle size={22} color={mainColor} />
//                       )}
//                       <ChevronRight size={20} color={colors.gray} />
//                     </View>
//                   </TouchableOpacity>
//                 );
//               })
//             ) : (
//               <Text style={styles.emptyText}>Aucun chapitre disponible</Text>
//             )}
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.lightGray,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: colors.white,
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: colors.white,
//   },
//   errorText: {
//     color: colors.red,
//     fontSize: 18,
//     marginBottom: 20,
//   },
//   button: {
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: colors.white,
//     fontSize: 16,
//   },
//   header: {
//     height: 110,
//     paddingTop: 50,
//     paddingHorizontal: 20,
//     position: 'relative',
//     overflow: 'hidden',
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   headerContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
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
//     color: colors.white,
//     flex: 1,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   teacherCard: {
//     backgroundColor: colors.white,
//     borderRadius: 12,
//     margin: 16,
//     padding: 16,
//     flexDirection: 'row',
//     borderTopWidth: 4,
//     shadowColor: colors.black,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   teacherImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//     marginRight: 16,
//   },
//   teacherInfo: {
//     flex: 1,
//     justifyContent: 'space-between',
//   },
//   durationBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: colors.darkGray,
//     alignSelf: 'flex-start',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 20,
//   },
//   durationText: {
//     color: colors.white,
//     fontSize: 12,
//     marginLeft: 6,
//   },
//   statusBadge: {
//     alignSelf: 'flex-start',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 20,
//   },
//   statusText: {
//     color: colors.white,
//     fontSize: 12,
//     letterSpacing: 0.5,
//   },
//   descriptionCard: {
//     backgroundColor: colors.white,
//     borderRadius: 12,
//     marginHorizontal: 16,
//     marginBottom: 16,
//     padding: 20,
//     shadowColor: colors.black,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   sectionTitle: {
//     fontSize: 14,
//     color: colors.gray,
//     letterSpacing: 1,
//     marginBottom: 12,
//     textTransform: 'uppercase',
//   },
//   descriptionText: {
//     fontSize: 15,
//     lineHeight: 22,
//     color: colors.darkGray,
//   },
//   sectionContainer: {
//     backgroundColor: colors.white,
//     borderRadius: 12,
//     marginHorizontal: 16,
//     marginBottom: 24,
//     padding: 20,
//     shadowColor: colors.black,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   emptyText: {
//     textAlign: 'center',
//     color: colors.gray,
//     marginVertical: 12,
//   },
//   chapterCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     borderRadius: 8,
//     marginBottom: 10,
//     borderLeftWidth: 4,
//   },
//   chapterNumber: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: 'rgba(123, 44, 191, 0.1)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 16,
//   },
//   chapterNumberText: {
//     fontSize: 16,
//   },
//   chapterContent: {
//     flex: 1,
//   },
//   chapterTitle: {
//     fontSize: 16,
//     color: colors.darkGray,
//     marginBottom: 4,
//   },
//   chapterMeta: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   chapterDuration: {
//     fontSize: 13,
//     color: colors.gray,
//     marginLeft: 4,
//   },
//   chapterAction: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: 10,
//   },
// });

// export default HomeworkDetails;


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  ActivityIndicator,
  Dimensions,
  Linking
} from 'react-native';
import { ArrowLeft, ChevronRight, PlayCircle, CheckCircle, Clock, BookOpen } from 'lucide-react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

const colors = {
  purple: '#7B2CBF',
  green: '#2E8B57',
  pink: '#E83F6F',
  orange: '#FF7F11',
  blue: '#1A8CD8',
  lightPurple: '#E0AAFF',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#6C757D',
  lightGray: '#E9ECEF',
  darkGray: '#343A40',
  red: '#DC3545'
};

const { width } = Dimensions.get('window');

const HomeworkDetails = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [homework, setHomework] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeworkData = async () => {
      try {
        const response = await axios.get(
          `https://strapi-server-app-m49w.onrender.com/api/homeworks/${params.id}?populate=*`
        );
        setHomework(response.data.data);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeworkData();
  }, [params.id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.purple} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erreur de chargement</Text>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.purple }]}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!homework) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Contenu introuvable</Text>
      </View>
    );
  }

  const attributes = homework.attributes;
  const teacherImage = attributes.teacherImage?.data?.attributes?.url;
  const chapters = attributes.chapitre || [];
  const videos = attributes.video || [];
  const mainColor = colors[attributes.color] || colors.purple;

  const findMatchingVideo = (chapterTitle) => {
    return videos.find(video => 
      video.name.toLowerCase().includes(chapterTitle.toLowerCase()) ||
      chapterTitle.toLowerCase().includes(video.name.toLowerCase())
    );
  };

  const openVideo = (url) => {
    Linking.openURL(url).catch(err => 
      console.error("Erreur lors de l'ouverture de la vidéo:", err)
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={mainColor} />
        
        {/* En-tête avec dégradé */}
        <LinearGradient
          colors={[mainColor, `${mainColor}dd`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={28} color={colors.white} strokeWidth={2.5} />
            </TouchableOpacity>
            <Text style={styles.headerTitle} numberOfLines={2}>
              {attributes.Name}
            </Text>
          </View>
        </LinearGradient>

        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Carte enseignant */}
          <View style={[styles.teacherCard, { 
            borderColor: `${mainColor}30`,
            shadowColor: mainColor
          }]}>
            {teacherImage && (
              <Image 
                source={{ uri: teacherImage }}
                style={styles.teacherImage}
              />
            )}
            <View style={styles.teacherInfo}>
              <View style={styles.infoRow}>
                <View style={styles.durationBadge}>
                  <Clock size={16} color={colors.white} />
                  <Text style={styles.durationText}>{attributes.Duree}</Text>
                </View>
                <View style={[styles.statusBadge, { 
                  backgroundColor: attributes.FiniOuPas ? colors.green : colors.orange 
                }]}>
                  <Text style={styles.statusText}>
                    {attributes.FiniOuPas ? 'COMPLÉTÉ' : 'EN COURS'}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.courseDescription}>
                {attributes.description}
              </Text>
            </View>
          </View>

          {/* Section Vidéos */}
          {videos.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>VIDÉOS DU COURS</Text>
              <View style={styles.videosContainer}>
                {videos.map((video, index) => (
                  <TouchableOpacity
                    key={video.id}
                    style={[styles.videoCard, { borderLeftColor: mainColor }]}
                    onPress={() => openVideo(video.videoUrl)}
                  >
                    <View style={styles.videoNumber}>
                      <Text style={[styles.videoNumberText, { color: mainColor }]}>
                        {index + 1}
                      </Text>
                    </View>
                    <View style={styles.videoContent}>
                      <Text style={styles.videoTitle}>{video.name}</Text>
                      <Text style={styles.videoDescription}>{video.description}</Text>
                    </View>
                    <PlayCircle size={24} color={mainColor} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Section Chapitres */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>CHAPITRES ({chapters.length})</Text>
              <View style={styles.progressContainer}>
                <Text style={styles.progressText}>
                  {chapters.filter(c => c.termine).length}/{chapters.length} terminés
                </Text>
              </View>
            </View>
            
            {chapters.length > 0 ? (
              chapters.map((chapter, index) => {
                const matchingVideo = findMatchingVideo(chapter.titre);
                
                return (
                  <TouchableOpacity 
                    key={chapter.id}
                    style={[styles.chapterCard, { 
                      borderLeftColor: mainColor,
                      backgroundColor: chapter.termine ? `${mainColor}10` : colors.white
                    }]}
                    onPress={() => router.push({
                      pathname: "/screens/Chapter-details",
                      params: {
                        id: chapter.id,
                        titre: chapter.titre,
                        description: attributes.description, 
                        duree: chapter.duree,
                        termine: chapter.termine,
                        color: attributes.color,
                        videoUrl: matchingVideo?.videoUrl || '',
                        videoDescription: matchingVideo?.description || '',
                        courseName: attributes.Name
                      }
                    })}
                    activeOpacity={0.7}
                  >
                    <View style={styles.chapterNumber}>
                      <Text style={[styles.chapterNumberText, { color: mainColor }]}>
                        {index + 1}
                      </Text>
                    </View>
                    
                    <View style={styles.chapterContent}>
                      <Text style={styles.chapterTitle}>{chapter.titre}</Text>
                      {chapter.duree && (
                        <View style={styles.chapterMeta}>
                          <Clock size={14} color={colors.gray} />
                          <Text style={styles.chapterDuration}>{chapter.duree}</Text>
                        </View>
                      )}
                    </View>
                    
                    <View style={styles.chapterAction}>
                      {chapter.termine ? (
                        <CheckCircle size={22} color={colors.green} />
                      ) : (
                        <BookOpen size={22} color={mainColor} />
                      )}
                      <ChevronRight size={20} color={colors.gray} />
                    </View>
                  </TouchableOpacity>
                );
              })
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Aucun chapitre disponible</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.white,
  },
  errorText: {
    color: colors.red,
    fontSize: 18,
    marginBottom: 20,
    fontFamily: 'Inter_600SemiBold',
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  header: {
    height: 120,
    paddingTop: 50,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 22,
    color: colors.white,
    fontFamily: 'Inter_700Bold',
    flex: 1,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  teacherCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    margin: 16,
    padding: 20,
    flexDirection: 'row',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  teacherImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  teacherInfo: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.darkGray,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  durationText: {
    color: colors.white,
    fontSize: 12,
    marginLeft: 6,
    fontFamily: 'Inter_600SemiBold',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: colors.white,
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 0.5,
  },
  courseDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.darkGray,
    fontFamily: 'Inter_400Regular',
  },
  sectionContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    color: colors.gray,
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontFamily: 'Inter_700Bold',
  },
  progressContainer: {
    backgroundColor: colors.lightGray,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  progressText: {
    fontSize: 12,
    color: colors.darkGray,
    fontFamily: 'Inter_600SemiBold',
  },
  videosContainer: {
    marginTop: 10,
  },
  videoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 3,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  videoNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(123, 44, 191, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  videoNumberText: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
  },
  videoContent: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 15,
    color: colors.darkGray,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 2,
  },
  videoDescription: {
    fontSize: 13,
    color: colors.gray,
    fontFamily: 'Inter_400Regular',
  },
  emptyContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.gray,
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
  chapterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  chapterNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(123, 44, 191, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  chapterNumberText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  chapterContent: {
    flex: 1,
  },
  chapterTitle: {
    fontSize: 16,
    color: colors.darkGray,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  chapterMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chapterDuration: {
    fontSize: 13,
    color: colors.gray,
    fontFamily: 'Inter_400Regular',
    marginLeft: 4,
  },
  chapterAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
});

export default HomeworkDetails;