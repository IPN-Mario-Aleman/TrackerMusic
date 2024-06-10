import Slider from "@react-native-community/slider"
import { useEffect, useRef, useState } from "react"
import { Animated, Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native"
import IonIcons from 'react-native-vector-icons/Ionicons'
import songs, { TSongs } from "./utils/mocks"

import TrackPlayer, { State, usePlaybackState, useProgress } from 'react-native-track-player'

const { width: widthStyle } = Dimensions.get('window')

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.add(songs);
 };
 
 
 const togglePlayBack = async () => {
   let trackIndex = await TrackPlayer.getActiveTrackIndex();
   let trackObject = await TrackPlayer.getTrack(trackIndex ?? 0);
   const playback = await TrackPlayer.getPlaybackState();
 
   console.log(`Title: ${trackObject?.title}`);
   console.log('playback', playback);
   console.log('trackIndex', trackIndex);
 
   if (trackIndex !== null) {
     if (playback.state === State.Playing) {
       console.log('The player is playing');
       TrackPlayer.pause();
     } else {
       console.log('The player is not playing');
       TrackPlayer.play();
     }
   }
 };

const MusicPlayer = () => {
  const { width } = useWindowDimensions()
  const scrollX = useRef(new Animated.Value(0)).current
  const [songIndex, setSongIndex] = useState(0)
  const songSlider = useRef(null)

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      const index = Math.round(value / width)
      console.log(index)
      skipTo(index)
      setSongIndex(index)
    })
  })

  const renderSongs = ({ item, index}: { item: TSongs, index: number }) => {
    return (
      <Animated.View  style={{ width, justifyContent: 'center', alignItems: 'center' }} key={index}>
        <View style={styles.contentImage}>
          <Image 
            source={{ uri: item.image }}
            style={styles.img}
            resizeMode="cover"
            />
        </View>
      </Animated.View>
    )
  }

  const skipForward = () => {
    songSlider.current.scrollToOffset({ offset: (songIndex + 1) * width })
  }

  const skipTo = async (trackId: number) => {
    await TrackPlayer.skip(trackId)
  } 

  const skipToPrevious = () => {
    songSlider.current.scrollToOffset({ offset: (songIndex - 1) * width })
  }

  const playbackState = usePlaybackState();
  const progress = useProgress()
  console.log('playbackState', playbackState, progress.position);

  useEffect(() => {
    setupPlayer();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={{ width, marginBottom: 25 }}>
          <Animated.FlatList
            ref={songSlider}
            data={songs}
            renderItem={renderSongs}
            keyExtractor={(item) => item.title.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            // snapToAlignment="center"
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
          />
        </View>
        <View style={styles.songDescription}>
          <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>{songs[songIndex].title.toString()}</Text>
          <Text style={{ color: 'white', fontSize: 16, marginTop: 8 }}>{songs[songIndex].artist.toString()}</Text>
        </View>
        <View style={styles.slider}>
          <Slider 
            style={styles.progressBar}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            thumbTintColor="white"
            minimumTrackTintColor="#ffd369"
            maximumTrackTintColor="white"
            onSlidingComplete={
              async (value) => {
                await TrackPlayer.seekTo(value)
              }
            }
          />
          <View style={styles.progressLabelWrapper}>
            <Text style={styles.progressLabelText}>{new Date(progress.position * 1000).toISOString().substr(14, 5)}</Text>
            <Text style={styles.progressLabelText}>{new Date((progress.duration - progress.position) * 1000).toISOString().substr(14, 5)}</Text>
          </View>
        </View>
        <View style={styles.controlsPlayer}>
          <TouchableOpacity
            onPress={() => skipToPrevious()}
          >
            <IonIcons name="play-skip-back-outline" size={34} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => togglePlayBack(playbackState)}
          >
            <IonIcons name={playbackState.state === State.Playing ? 'pause-outline' : 'play-outline'} size={74} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => skipForward()}
          >
            <IonIcons name="play-skip-forward-outline" size={34} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View  style={styles.footer}>
        <View style={styles.footerContainer}>
          <View>
            <TouchableOpacity 
              style={{ flexDirection: 'column', alignItems: 'center'}}
              onPress={
                () => {
                  console.log('Hola')
                }
              }
            >
              <Text style={styles.text}>Descripción</Text>
              <IonIcons name="document-text-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity 
              style={{ flexDirection: 'column', alignItems: 'center'}}
              onPress={
                () => {
                  console.log('Hola')
                }
            }>
              <Text style={styles.text}>Lista</Text>
              <IonIcons name="list-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d'
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    borderTopColor: '#333',
    borderTopWidth: 1,
    width: widthStyle,
    alignItems: 'center',
    paddingVertical: 16
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%'
  },

  controlsPlayer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginTop: 16
  },
  contentImage: {
    width: 300,
    height: 340,

    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.58,
    shadowRadius: 3.84,

    elevation: 5
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 8
  },
  songDescription: {
    alignItems: 'center'
  },
  slider: {
    marginHorizontal: 50,
    alignItems: 'center'
  },
  progressLabelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  progressLabelText: {
    color: 'white'
  },
  progressBar: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    marginHorizontal: 0
  },
  text: {
    fontSize: 16,
    color: '#fff'
  }
})


export default MusicPlayer
