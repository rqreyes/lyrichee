import Link from 'next/link';

const TrackItem = ({ track }) => {
  // display album art or placeholder image
  const albumDisplay = track.album
    ? track.album.cover_art_url
    : track.thumbnail
    ? track.thumbnail
    : 'https://picsum.photos/200';

  return (
    <li>
      <div className='item-details'>
        <img src={albumDisplay} alt='album art' />
        <div>
          <p className='item-title'>
            <strong>{track.titles.featured}</strong>
          </p>
          <p>{track.artist.name}</p>
        </div>
      </div>

      <div className='button-group'>
        <Link href={`/track/${track.id}`}>
          <a>
            <button type='button'>View Track</button>
          </a>
        </Link>
        <Link href={`/artist/${track.artist.id}`}>
          <a>
            <button type='button'>View Artist</button>
          </a>
        </Link>
      </div>
    </li>
  );
};

export default TrackItem;
