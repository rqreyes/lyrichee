import React from 'react';
import TrackItem from '../atoms/TrackItem';

const TrackList = ({ tracks }) => {
  const trackItemDisplay = tracks.map((track) => (
    <TrackItem key={track.id} track={track} />
  ));

  return (
    <div>
      <h3>Tracks</h3>
      <ul>{trackItemDisplay}</ul>
    </div>
  );
};

export default TrackList;
