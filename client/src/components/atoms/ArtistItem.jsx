import React from 'react';
import { Link } from 'react-router-dom';

const ArtistItem = ({ artist }) => {
  return (
    <li>
      <div className='item-details'>
        <img src={artist.thumbnail} alt='artist thumbnail' />
        <p>
          <strong>{artist.name}</strong>
        </p>
      </div>
      <div className='button-group'>
        <Link to={`/artist/${artist.id}`}>
          <button type='button'>View Artist</button>
        </Link>
      </div>
    </li>
  );
};

export default ArtistItem;
