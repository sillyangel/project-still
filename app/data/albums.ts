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
    tracklist: "https://offbrandspotifydb.web.app/tracklist/kanyewest/graduation.json",
    name: "Graduation",
    artist: "Kanye West",
    cover: 
      "https://a5.mzstatic.com/us/r1000/0/Music116/v4/2f/db/2c/2fdb2c9d-171c-c6dc-57ee-4bae2b4bb11a/07UMGIM12671.rgb.jpg",
  },
  {
    id: "2",
    tracklist: "",
    name: "Utopia",
    artist: "Travis Scott",
    cover:
      "https://a5.mzstatic.com/us/r1000/0/Music126/v4/09/7d/b0/097db06f-8403-3cf7-7510-139e570ca66b/196871341882.jpg",
  },
  {
    id: "3",
    tracklist: "",
    name: "Because the Internet",
    artist: "Childish Gambino",
    cover:
      "https://a5.mzstatic.com/us/r1000/0/Music211/v4/40/2d/68/402d682f-9eb4-664d-be54-dcd7fc511e88/0044003173460_Cover.jpg",
  },
  {
    id: "4",
    tracklist: "",
    name: "Wolf",
    artist: "Tyler The, Creator",
    cover:
      "https://a5.mzstatic.com/us/r1000/0/Music116/v4/41/36/cb/4136cbae-f6aa-b1fc-5452-6f5e153f28a4/886443853874.jpg",
  },
  {
    id: "5",
    tracklist: "",
    name: "Rodeo",
    artist: "Travis Scott",
    cover:
      "https://a5.mzstatic.com/us/r1000/0/Music221/v4/71/87/78/7187786f-70af-fd36-fc7f-a4ba61b65d98/886445454987.jpg",
  },
  {
    id: "6",
    tracklist: "",
    name: "Chromakopia",
    artist: "Tyler The, Creator",
    cover:
      "https://a5.mzstatic.com/us/r1000/0/Music221/v4/7d/bd/e9/7dbde97e-b97d-8cc3-0203-218b687408a9/196872555059.jpg",
  },
  {
    id: "7",
    tracklist: "",
    name: "Damn",
    artist: "Kendrick Lamar",
    cover:
      "https://a5.mzstatic.com/us/r1000/0/Music112/v4/86/c9/bb/86c9bb30-fe3d-442e-33c1-c106c4d23705/17UMGIM88776.rgb.jpg",
  },
  {
    id: "8",
    tracklist: "",
    name: "Bando Stone and The New World",
    artist: "Childish Gambino",
    cover:
      "https://a5.mzstatic.com/us/r1000/0/Music221/v4/3c/d3/37/3cd3376c-55f6-26ea-1dad-5d26b9391a45/196872224030.jpg",
  },
  {
    id: "9",
    tracklist: "",
    name: "My Dark Twisted Fantasy",
    artist: "Kanye West",
    cover:
      "https://a5.mzstatic.com/us/r1000/0/Music125/v4/0a/0b/31/0a0b31cc-077c-31bf-e7fe-612191774948/10UMGIM30072.rgb.jpg",
  },
  {
    id: "10",
    tracklist: "",
    name: "Apollo XXI",
    artist: "Steve Lacy",
    cover:
      "https://a5.mzstatic.com/us/r1000/0/Music114/v4/a4/2d/93/a42d9329-4df4-2825-208e-855aab7413e3/5056167115243_1.jpg",
  },
];

function getRandomAlbums(albums: Album[], count: number): Album[] {
  const shuffled = [...albums].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const listenNowAlbums: Album[] = getRandomAlbums(allAlbums, 5);
const remainingAlbums = allAlbums.filter(album => !listenNowAlbums.includes(album));
const madeForYouAlbums: Album[] = getRandomAlbums(remainingAlbums, 5);

export { listenNowAlbums, madeForYouAlbums };