import React from 'react';
import ArtistItem from '../atoms/ArtistItem';

const ArtistList = ({ artists }) => {
  const artistItemDisplay = artists.map((artist) => (
    <ArtistItem key={artist.id} artist={artist} />
  ));

  return (
    <section className='search-items artist-list right-half'>
      <h3>Artists</h3>
      <ul>{artistItemDisplay}</ul>
    </section>
  );
};

export default ArtistList;
