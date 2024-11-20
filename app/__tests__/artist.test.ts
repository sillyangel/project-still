import axios from 'axios';
import { allArtists } from '@/app/data/artists'; // Adjust the path to your artists.ts file

describe('Artist Picture Testing', () => {
  interface Artist {
    name: string;
    pictureurl: string;
  }

  allArtists.forEach((artist: Artist) => {
    test(`should return 200 for picture of ${artist.name}`, async () => {
      try {
        const pictureResponse = await axios.get(artist.pictureurl);
        expect(pictureResponse.status).toBe(200);
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