import React, { Fragment } from 'react';
import Heading from '../molecules/Heading';
import Search from '../molecules/Search';

const Header = ({ setIsLoading, setTracks, setArtists }) => {
  return (
    <Fragment>
      <Heading />
      <Search
        setIsLoading={setIsLoading}
        setTracks={setTracks}
        setArtists={setArtists}
      />
    </Fragment>
  );
};

export default Header;
