import axios from 'axios';
import { allAlbums } from '@/app/data/albums'; // Adjust the path to your albums.ts file

describe('Album JSON files', () => {
  interface Album {
    name: string;
    tracklist: string;
  }

  allAlbums.forEach((album: Album) => {
    test(`should return 200 for ${album.name}`, async () => {
      try {
        const response = await axios.get(album.tracklist);
        expect(response.status).toBe(200);
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