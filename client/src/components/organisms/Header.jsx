import React from 'react';
import Heading from '../molecules/Heading';
import Search from '../molecules/Search';

const Header = ({ focus }) => {
  return (
    <header>
      <Heading />
      <Search focus={focus} />
    </header>
  );
};

export default Header;
