import axios from 'axios';
import { allAlbums } from '@/app/data/albums'; // Adjust the path to your albums.ts file

describe('Album.ts testing', () => {
  interface Album {
    name: string;
    tracklist: string;
    cover: string;
  }

  allAlbums.forEach((album: Album) => {
    test(`should return 200 for tracklist of ${album.name}`, async () => {
      try {
        const tracklistResponse = await axios.get(album.tracklist);
        expect(tracklistResponse.status).toBe(200);
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          expect(error.response.status).not.toBe(404);
        } else {
          throw error;
        }
      }
    });
  });
});