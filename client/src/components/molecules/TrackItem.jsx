import React from 'react';
import { Link } from 'react-router-dom';

const TrackItem = ({ track }) => {
  return (
    <li>
      <p>{track.titles.full}</p>
      <Link to={`/tracks/${track.id}`}>
        <button type='button'>View Lyrics</button>
      </Link>
    </li>
  );
};

export default TrackItem;
