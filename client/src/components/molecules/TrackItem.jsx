import React from 'react';
import { Link } from 'react-router-dom';

const TrackItem = ({ track }) => {
  const albumDisplay = track.album
    ? track.album.cover_art_url
    : track.thumbnail
    ? track.thumbnail
    : 'https://picsum.photos/200';

  return (
    <li>
      <div className='track-item-info'>
        <img src={albumDisplay} alt='album art' />
        <div className='track-item-description'>
          <p>{track.artist.name}</p>
          <p>{track.titles.featured}</p>
        </div>
      </div>

      <div className='button-group'>
        <Link to={`/artist/${track.artist.id}`}>
          <button type='button'>View Artist</button>
        </Link>
        <Link to={`/tracks/${track.id}`}>
          <button type='button'>View Lyrics</button>
        </Link>
      </div>
    </li>
  );
};

export default TrackItem;
