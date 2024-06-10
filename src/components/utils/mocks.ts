import { faker } from '@faker-js/faker'

export type TSongs = {
    id: number,
    title: string,
    artist: string,
    album: string,
    image: string,
    url: string
}

const songs = [
  {
    id: 1,
    title: faker.music.songName(),
    artist: faker.person.firstName('male'),
    album: faker.music.genre(),
    image: faker.image.url(),
    url: require('./music/smartest.mp3')
  },
  {
    id: 2,
    title: faker.music.songName(),
    artist: faker.person.firstName('male'),
    album: faker.music.genre(),
    image: faker.image.url(),
    url: require('./music/anti.mp3')
  },
  {
    id: 3,
    title: faker.music.songName(),
    artist: faker.person.firstName('male'),
    album: faker.music.genre(),
    image: faker.image.url(),
    url: require('./music/music-1.mp3')
  },
  {
    id: 4,
    title: faker.music.songName(),
    artist: faker.person.firstName('male'),
    album: faker.music.genre(),
    image: faker.image.url(),
    url: require('./music/music-2.mp3')
  },
  {
    id: 5,
    title: faker.music.songName(),
    artist: faker.person.firstName('male'),
    album: faker.music.genre(),
    image: faker.image.url(),
    url: require('./music/smartest.mp3')
  },
  {
    id: 6,
    title: faker.music.songName(),
    artist: faker.person.firstName('male'),
    album: faker.music.genre(),
    image: faker.image.url(),
    url: require('./music/anti.mp3')
  },
  {
    id: 7,
    title: faker.music.songName(),
    artist: faker.person.firstName('male'),
    album: faker.music.genre(),
    image: faker.image.url(),
    url: require('./music/music-1.mp3')
  },
  {
    id: 8,
    title: faker.music.songName(),
    artist: faker.person.firstName('male'),
    album: faker.music.genre(),
    image: faker.image.url(),
    url: require('./music/music-2.mp3')
  },
  {
    id: 9,
    title: faker.music.songName(),
    artist: faker.person.firstName('male'),
    album: faker.music.genre(),
    image: faker.image.url(),
    url: require('./music/smartest.mp3')
  }
]

export default songs
