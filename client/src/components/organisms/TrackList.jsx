import React from 'react';
import TrackItem from '../molecules/TrackItem';

const TrackList = ({ tracks }) => {
  const trackItemDisplay = tracks.map((track) => (
    <TrackItem key={track.id} track={track} />
  ));

  return <ul>{trackItemDisplay}</ul>;
};

export default TrackList;
