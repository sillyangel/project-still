export interface Artist {
    name: string;
    pictureurl: string;
}

const allArtists: Artist[] = [
    {
        name: "Frank Ocean",
        pictureurl: "https://offbrandspotifydb.web.app/artistprofile/frankocean.jpg"
    },
    {
        name: "Billie Eilish",
        pictureurl: "https://offbrandspotifydb.web.app/artistprofile/billieeilish.jpg"
    },
    {
        name: "Kanye West",
        pictureurl: "https://offbrandspotifydb.web.app/artistprofile/kanyewest.jpg"
    },
    {
        name: "Childish Gambino",
        pictureurl: "https://offbrandspotifydb.web.app/artistprofile/childishgambino.jpg"
    },
    {
        name: "Don Toliver",
        pictureurl: "https://offbrandspotifydb.web.app/artistprofile/dontoliver.jpg"
    },
    {
        name: "Tyler, The Creator",
        pictureurl: "https://offbrandspotifydb.web.app/artistprofile/tylerthecreator.jpg"
    }
];

export { allArtists };