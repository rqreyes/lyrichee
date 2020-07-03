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
