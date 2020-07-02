import React from 'react';
import ArtistItem from '../atoms/ArtistItem';

const ArtistList = ({ artists }) => {
  const artistItemDisplay = artists.map((artist) => (
    <ArtistItem key={artist.id} artist={artist} />
  ));

  return (
    <div>
      <h3>Artists</h3>
      <ul>{artistItemDisplay}</ul>
    </div>
  );
};

export default ArtistList;
