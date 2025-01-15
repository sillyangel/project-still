export interface Album {
  id: string;
  name: string;
  tracklist: string;
  artist: string;
  cover: string;
  database: number;
  explicit?: boolean;
  length?: string;
}

const databases = [
  { id: 0, url: "https://playmusichtml.web.app/play/" },
  { id: 1, url: "https://tuahdb.web.app/" },
  { id: 2, url: "https://playstorage2.web.app/" },
  { id: 3, url: "https://playstorage3.web.app/" },
  { id: 4, url: "https://playstorage3-e9531.web.app/" },
  { id: 5, url: "https://cdn.sillyangel.dev/"}
];

// /music/{artist}/{album}/{`${tracklist.index} + 1` + ${tracklist.name} + ".mp3"}
const allAlbums: Album[] = [
  {
    id: "1",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/frankocean/blonde.json",
    name: "Blonde",
    artist: "Frank Ocean",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/FrankOcean/BLONDE.jpg",
    database: 1
  },
  {
    id: "2",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/frankocean/channelorange.json",
    name: "Channel Orange",
    artist: "Frank Ocean",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/FrankOcean/CHANNELORANGE.jpg",
    database: 1
  },
  {
    id: "3",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/billieeilish/whenweallfallasleepwheredowego.json",
    name: "When We All Fall Asleep, Where Do We Go?",
    artist: "Billie Eilish",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/BillieEilish/WWAFAWDWG.jpg",
    database: 2,
  },
  {
    id: "4",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/billieeilish/hitmehardandsoft.json",
    name: "Hit Me Hard and Soft",
    artist: "Billie Eilish",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/BillieEilish/HITMEHARDANDSOFT.jpg",
    database: 2, 
  },
  {
    id: "5",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/billieeilish/happierthanever.json",
    name: "Happier Than Ever",
    artist: "Billie Eilish",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/BillieEilish/HAPPIERTHANEVER.jpg",
    database: 1
  },
  {
    id: "6",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/kanyewest/808sheartbreak.json",
    name: "808s & Heartbreak",
    artist: "Kanye West",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/KanyeWest/808SHEARTBREAK.jpg",
    database: 5
  },
  {
    id: "7",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/kanyewest/dondadeluxe.json",
    name: "Donda (Deluxe)",
    artist: "Kanye West",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/KanyeWest/DONDA.jpg",
    database: 5
  },
  {
    id: "8",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/kanyewest/graduation.json",
    name: "Graduation",
    artist: "Kanye West",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/KanyeWest/GRADUATION.jpg",
    database: 5
    },
  {
    id: "9",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/kanyewest/jesusisking.json",
    name: "Jesus is King",
    artist: "Kanye West",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/KanyeWest/JESUSISKING.jpg",
    database: 5
  },
  {
    id: "10",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/kanyewest/kidsseeghosts.json",
    name: "Kids See Ghosts",
    artist: "Kanye West",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/KanyeWest/KIDSSEEGHOSTS.jpg",
    database: 5
  },
  {
    id: "11",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/kanyewest/lateregistration.json",
    name: "Late Registration",
    artist: "Kanye West",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/KanyeWest/LATEREGISTRATION.jpg",
    database: 5
  },
  {
    id: "12",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/kanyewest/mybeautifuldarktwistedfantasy.json",
    name: "My Beautiful Dark Twisted Fantasy",
    artist: "Kanye West",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/KanyeWest/MYBEAUTIFULDARKTWISTEDFANTASY.jpg",
    database: 5
  },
  {
    id: "13",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/kanyewest/thecollegedropout.json",
    name: "The College Dropout",
    artist: "Kanye West",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/KanyeWest/THECOLLEGEDROPOUT.jpg",
    database: 5
  },
  {
    id: "14",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/kanyewest/thelifeofpablo.json",
    name: "The Life of Pablo",
    artist: "Kanye West",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/KanyeWest/THELIFEOFPABLO.jpg",
    database: 5
  },
  {
    id: "15",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/kanyewest/watchthethronedeluxe.json",
    name: "Watch The Throne (Deluxe)",
    artist: "Kanye West",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/KanyeWest/WATCHTHETHRONE.jpg",
    database: 5
  },
  {
    id: "16",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/kanyewest/ye.json",
    name: "Ye",
    artist: "Kanye West",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/KanyeWest/YE.jpg",
    database: 5 
  },
  {
    id: "17",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/kanyewest/yeezus.json",
    name: "Yeezus",
    artist: "Kanye West",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/KanyeWest/YEEZUS.jpg",
    database: 5
  },
  {
    id: "18",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/childishgambino/atavista.json",
    name: "Atavista",
    artist: "Childish Gambino",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/ChildishGambino/ATAVISTA.jpg",
    database: 4
  },
  {
    id: "19",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/childishgambino/awakenmylove.json",
    name: "Awaken, My Love!",
    artist: "Childish Gambino",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/ChildishGambino/AWAKENMYLOVE.jpg",
    database: 4
  },
  {
    id: "20",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/childishgambino/bandostoneandthenewworld.json",
    name: "Bando Stone, and the New World",
    artist: "Childish Gambino",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/ChildishGambino/BANDOSTONEANDTHENEWWORLD.jpg",
    database: 4
  },
  {
    id: "21",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/childishgambino/becausetheinternet.json",
    name: "Because The Internet",
    artist: "Childish Gambino",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/ChildishGambino/BECAUSETHEINTERNET.jpg",
    database: 4
  },
  {
    id: "22",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/childishgambino/camp.json",
    name: "Camp",
    artist: "Childish Gambino",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/ChildishGambino/CAMP.jpg",
    database: 4
  },
  // {
  //   id: "23",
  //   tracklist: "https://offbrandspotifydb.web.app/tracklist/dontoliver/heavenorhell.json",
  //   name: "Heaven or Hell",
  //   artist: "Don Toliver",
  //   cover: "https://offbrandspotifydb.web.app/AlbumArtwork/DonToliver/HEAVENORHELL.jpg",
  //   database: 4
  // },
  // {
  //   id: "24",
  //   tracklist: "https://offbrandspotifydb.web.app/tracklist/dontoliver/lifeofadon.json",
  //   name: "Life of a Don",
  //   artist: "Don Toliver",
  //   cover: "https://offbrandspotifydb.web.app/AlbumArtwork/DonToliver/LIFEOFADON.jpg",
  //   database: 4
  // }, 
  // {
  //   id: "25",
  //   tracklist: "https://offbrandspotifydb.web.app/tracklist/dontoliver/hardstonepsycho.json",
  //   name: "Hardstone Psycho",
  //   artist: "Don Toliver",
  //   cover: "https://offbrandspotifydb.web.app/AlbumArtwork/DonToliver/HARDSTONEPSYCHO.jpg",
  //   database: 4
  // },
  // {
  //   id: "26",
  //   tracklist: "https://offbrandspotifydb.web.app/tracklist/dontoliver/lovesickdeluxe.json",
  //   name: "Love Sick (Deluxe)",
  //   artist: "Don Toliver",
  //   cover: "https://offbrandspotifydb.web.app/AlbumArtwork/DonToliver/LOVESICK.jpg",
  //   database: 4
  // },
  {
    id: "27",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/tylerthecreator/wolf.json",
    name: "Wolf",
    artist: "Tyler, The Creator",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/TylerTheCreator/WOLF.jpg",
    database: 5
  },
  {
    id: "28",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/tylerthecreator/flowerboy.json",
    name: "Flower Boy",
    artist: "Tyler, The Creator",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/TylerTheCreator/FLOWERBOY.jpg",
    database: 5
  },
  {
    id: "29",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/tylerthecreator/igor.json",
    name: "Igor",
    artist: "Tyler, The Creator",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/TylerTheCreator/IGOR.jpg",
    database: 5
  },
  {
    id: "30",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/tylerthecreator/cherrybomb.json",
    name: "Cherry Bomb",
    artist: "Tyler, The Creator",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/TylerTheCreator/CHERRYBOMB.jpg",
    database: 5
  },
  {
    id: "31",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/tylerthecreator/goblin.json",
    name: "Goblin",
    artist: "Tyler, The Creator",
    database: 5,
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/TylerTheCreator/GOBLIN.jpg",
  },
  {
    id: "32",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/tylerthecreator/callmeifyougetlost.json",
    name: "Call Me If You Get Lost",
    artist: "Tyler, The Creator",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/TylerTheCreator/CALLMEIFYOUGETLOST.jpg",
    database: 5
  },
  {
    id: "33",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/tylerthecreator/callmeifyougetlosttheestatesale.json",
    name: "Call Me If You Get Lost: The Estate Sale",
    artist: "Tyler, The Creator",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/TylerTheCreator/CALLMEIFYOUGETLOSTESTATESELL.jpg",
    database: 5
  },
  {
    id: "34",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/tylerthecreator/chromakopia.json",
    name: "Chromakopia",
    artist: "Tyler, The Creator",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/TylerTheCreator/CHROMAKOPIA.jpg",
    database: 5
  },
  {
    id: "35",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/stevelacy/apolloxxi.json",
    name: "Apollo XXI",
    artist: "Steve Lacy",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/SteveLacy/APOLLOXXI.jpg",
    database: 6
  },
  {
    id: "36",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/stevelacy/geminirights.json",
    name: "Gemini Rights",
    artist: "Steve Lacy",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/SteveLacy/GEMINIRIGHTS.jpg",
    database: 6
  },
  {
    id: "37",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/stevelacy/stevelacysdemo.json",
    name: "Steve Lacy's Demo",
    artist: "Steve Lacy",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/SteveLacy/STEVELACYDEMO.jpg",
    database: 6
  },
  {
    id: "38",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/stevelacy/thelofis.json",
    name: "The Lo-Fis",
    artist: "Steve Lacy",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/SteveLacy/LOFIS.jpg",
    database: 6
  },
  {
    id: "39",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/travisscott/daysbeforerodeo.json",
    name: "Days Before Rodeo",
    artist: "Travis Scott",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/TravisScott/DAYSBEFORERODEO.jpg",
    database: 5
  },
  {
    id: "40",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/travisscott/rodeo.json",
    name: "Rodeo",
    artist: "Travis Scott",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/TravisScott/RODEO.jpg",
    database: 5
  },
  {
    id: "41",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/travisscott/birdsinthetrapsingmcknight.json",
    name: "Birds in the Trap Sing McKnight",
    artist: "Travis Scott",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/TravisScott/BIRDS INTHETRAPSINGMCKNIGHT.jpg",
    database: 5
  },
  {
    id: "42",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/travisscott/hunchojackjackhuncho.json",
    name: "Huncho Jack, Jack Huncho",
    artist: "Travis Scott",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/TravisScott/HUNCHOJACKJACKHUNCHO.jpg",
    database: 5
  },
  {
    id: "43",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/travisscott/astroworld.json",
    name: "Astroworld",
    artist: "Travis Scott",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/TravisScott/ASTROWORLD.jpg",
    database: 5
  },
  {
    id: "44",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/travisscott/jackboys.json",
    name: "Jackboys",
    artist: "Travis Scott",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/TravisScott/JACKBOYS.jpg",
    database: 5
  },
  {
    id: "45",
    tracklist: "https://offbrandspotifydb.web.app/tracklist/travisscott/utopia.json",
    name: "Utopia",
    artist: "Travis Scott",
    cover: "https://offbrandspotifydb.web.app/AlbumArtwork/TravisScott/UTOPIA.jpg",
    database: 5
  }
];

function getSeededRandom(seed: number) {
  return function() {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
}

function getRandomAlbums(albums: Album[], count: number): Album[] {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const random = getSeededRandom(seed);
  const shuffled = [...albums].sort(() => 0.5 - random());
  return shuffled.slice(0, count);
}

const listenNowAlbums: Album[] = getRandomAlbums(allAlbums, 5);
const remainingAlbums = allAlbums.filter(album => !listenNowAlbums.includes(album));
const madeForYouAlbums: Album[] = getRandomAlbums(remainingAlbums, 50);

export { listenNowAlbums, madeForYouAlbums, allAlbums, databases };
