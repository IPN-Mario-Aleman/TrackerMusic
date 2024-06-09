import { faker } from '@faker-js/faker'

export type TSongs = {
    id: number,
    title: string,
    artist: string,
    album: string,
    image: string
}

const songs = [
  {
    id: 1,
    title: faker.music.songName(),
    artist: faker.person.firstName('male'),
    album: faker.music.genre(),
    image: faker.image.url()
  },
  {
    id: 2,
    title: faker.music.songName(),
    artist: faker.person.firstName('male'),
    album: faker.music.genre(),
    image: faker.image.url()
  },
  {
    id: 3,
    title: faker.music.songName(),
    artist: faker.person.firstName('male'),
    album: faker.music.genre(),
    image: faker.image.url()
  },
  {
    id: 4,
    title: faker.music.songName(),
    artist: faker.person.firstName('male'),
    album: faker.music.genre(),
    image: faker.image.url()
  },
  {
    id: 5,
    title: faker.music.songName(),
    artist: faker.person.firstName('male'),
    album: faker.music.genre(),
    image: faker.image.url()
  },
  {
    id: 6,
    title: faker.music.songName(),
    artist: faker.person.firstName('male'),
    album: faker.music.genre(),
    image: faker.image.url()
  },
  {
    id: 7,
    title: faker.music.songName(),
    artist: faker.person.firstName('male'),
    album: faker.music.genre(),
    image: faker.image.url()
  },
  {
    id: 8,
    title: faker.music.songName(),
    artist: faker.person.firstName('male'),
    album: faker.music.genre(),
    image: faker.image.url()
  },
  {
    id: 9,
    title: faker.music.songName(),
    artist: faker.person.firstName('male'),
    album: faker.music.genre(),
    image: faker.image.url()
  }
]

export default songs
