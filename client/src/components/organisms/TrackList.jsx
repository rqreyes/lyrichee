import React from 'react';
import TrackItem from '../molecules/TrackItem';

const TrackList = ({ tracks }) => {
  const trackItemDisplay = tracks.map((track) => (
    <TrackItem key={track.id} track={track} />
  ));

  return (
    <section className='track-list'>
      <h3>Tracks</h3>
      <ul>{trackItemDisplay}</ul>
    </section>
  );
};

export default TrackList;
