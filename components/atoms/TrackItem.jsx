import Link from 'next/link';
import { StyledButtonText } from '../styles/Styles';

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
        <div className='item-text'>
          <p>
            <strong>{track.titles.featured}</strong>
          </p>
          <p>{track.artist.name}</p>
        </div>
      </div>
      <div className='button-group'>
        <Link href={`/track/${track.id}`} passHref>
          <a>
            <StyledButtonText type='button'>View Track</StyledButtonText>
          </a>
        </Link>
        <Link href={`/artist/${track.artist.id}`} passHref>
          <a>
            <StyledButtonText type='button'>View Artist</StyledButtonText>
          </a>
        </Link>
      </div>
    </li>
  );
};

export default TrackItem;
