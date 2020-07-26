import Link from 'next/link';

const TrackItem = ({ track }) => {
  // display album art or placeholder image
  let albumDisplay;

  if (track.album) {
    albumDisplay = track.album.cover_art_url;
  } else if (track.thumbnail) {
    albumDisplay = track.thumbnail;
  } else {
    albumDisplay = '/images/no-image.png';
  }

  return (
    <li>
      <div className='item-content'>
        <img src={albumDisplay} alt='album art' />
        <div>
          <p>
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
