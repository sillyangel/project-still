import { useRouter } from 'next/router';
import Image from 'next/image';
import { listenNowAlbums } from '../../app/data/albums';

export default function AlbumPage() {
  const router = useRouter();
  const { id } = router.query;
  const album = listenNowAlbums.find((album) => album.id === id);

  if (!album) {
    return <p>Album not found</p>;
  }

  return (
    <div>
      <h1>{album.name}</h1>
      <Image src={album.cover} alt={album.name} width={300} height={300} />
      <p>{album.artist}</p>
    </div>
  );
}