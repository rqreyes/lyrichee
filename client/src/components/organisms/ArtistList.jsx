import React from 'react';
import ArtistItem from '../molecules/ArtistItem';

const ArtistList = ({ artists }) => {
  const artistItemDisplay = artists.map((artist) => (
    <ArtistItem key={artist.id} artist={artist} />
  ));

  return (
    <section className='artist-list'>
      <h3>Artists</h3>
      <ul>{artistItemDisplay}</ul>
    </section>
  );
};

export default ArtistList;
