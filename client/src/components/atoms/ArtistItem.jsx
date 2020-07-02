import React from 'react';
import { Link } from 'react-router-dom';

const ArtistItem = ({ artist }) => {
  return (
    <li>
      <p>{artist.name}</p>
      <Link to={`/artist/${artist.id}`}>
        <button type='button'>View Artist</button>
      </Link>
    </li>
  );
};

export default ArtistItem;
