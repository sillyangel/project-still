export interface Album {
  id: string;
  name: string;
  tracklist: string;
  artist: string;
  cover: string;
}

const allAlbums: Album[] = [
  {
    id: "1",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/frankocean/blonde.json",
    name: "Blonde",
    artist: "Frank Ocean",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/FrankOcean/BLONDE.jpg",
  },
  {
    id: "2",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/frankocean/channelorange.json",
    name: "Channel Orange",
    artist: "Frank Ocean",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/FrankOcean/CHANNELORANGE.jpg",
  },
  {
    id: "3",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/billieeilish/whenwefallasleepwheredowego.json",
    name: "When We All Fall Asleep, Where Do We Go?",
    artist: "Billie Eilish",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/BillieEilish/WWAFAWDWG.jpg",
  },
  {
    id: "4",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/billieeilish/hitmehardandsoft.json",
    name: "Hit Me Hard and Soft",
    artist: "Billie Eilish",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/BillieEilish/HITMEHARDANDSOFT.jpg",
  },
  {
    id: "5",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/billieeilish/happierthanever.json",
    name: "Happier Than Ever",
    artist: "Billie Eilish",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/BillieEilish/HAPPIERTHANEVER.jpg",
  },
  {
    id: "6",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/kanyewest/808sheartbreak.json",
    name: "808s & Heartbreak",
    artist: "Kanye West",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/KanyeWest/808SHEARTBREAK.jpg",
  },
  {
    id: "7",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/kanyewest/dondadeluxe.json",
    name: "Donda (Deluxe)",
    artist: "Kanye West",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/KanyeWest/DONDA.jpg"
  },
  {
    id: "8",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/kanyewest/graduation.json",
    name: "Graduation",
    artist: "Kanye West",
    cover: 
      "https://offbrandspotifydb.web.app/AlbumArtwork/KanyeWest/GRADUATION.jpg",
  },
  {
    id: "9",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/kanyewest/jesusisking.json",
    name: "Jesus is King",
    artist: "Kanye West",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/KanyeWest/JESUSISKING.jpg",
  },
  {
    id: "10",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/kanyewest/kidsseeghost.json",
    name: "Kids See Ghosts",
    artist: "Kanye West",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/KanyeWest/KIDSSEEGHOSTS.jpg",
  },
  {
    id: "11",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/kanyewest/lateregistration.json",
    name: "Late Registration",
    artist: "Kanye West",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/KanyeWest/LATEREGISTRATION.jpg",
  },
  {
    id: "12",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/kanyewest/mybeautifuldarktwistedfantasy.json",
    name: "My Beautiful Dark Twisted Fantasy",
    artist: "Kanye West",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/KanyeWest/MYBEAUTIFULDARKTWISTEDFANTASY.jpg",
  },
  {
    id: "13",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/kanyewest/thecollegedropout.json",
    name: "The College Dropout",
    artist: "Kanye West",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/KanyeWest/THECOLLEGEDROPOUT.jpg",
  },
  {
    id: "14",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/kanyewest/thelifeofpablo.json",
    name: "The Life of Pablo",
    artist: "Kanye West",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/KanyeWest/THELIFEOFPABLO.jpg",
  },
  {
    id: "15",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/kanyewest/watchthethronedeluxe.json",
    name: "Watch The Throne (Deluxe)",
    artist: "Kanye West",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/KanyeWest/WATCHTHETHRONE.jpg",
  },
  {
    id: "16",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/kanyewest/ye.json",
    name: "Ye",
    artist: "Kanye West",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/KanyeWest/YE.jpg",
  },
  {
    id: "17",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/kanyewest/yeezus.json",
    name: "Yeezus",
    artist: "Kanye West",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/KanyeWest/YEEZUS.jpg",
  }
];

function getRandomAlbums(albums: Album[], count: number): Album[] {
  const shuffled = [...albums].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const listenNowAlbums: Album[] = getRandomAlbums(allAlbums, 5);
const remainingAlbums = allAlbums.filter(album => !listenNowAlbums.includes(album));
const madeForYouAlbums: Album[] = getRandomAlbums(remainingAlbums, 50);

export { listenNowAlbums, madeForYouAlbums };