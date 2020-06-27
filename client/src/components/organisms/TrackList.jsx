import React from 'react';
import TrackItem from '../molecules/TrackItem';

const TrackList = ({ tracks }) => {
  const trackItemDisplay = tracks.map((track) => (
    <TrackItem key={track.id} track={track} />
  ));

  return (
    <section>
      <h2>Search Results</h2>
      <ul>{trackItemDisplay}</ul>
    </section>
  );
};

export default TrackList;
