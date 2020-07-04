import React from 'react';
import Headroom from 'react-headroom';
import Logo from '../molecules/Logo';
import Search from '../molecules/Search';
import Nav from '../molecules/Nav';

const Header = ({ landing }) => {
  const landingDisplay = landing ? (
    <Headroom>
      <header>
        <Nav />
      </header>
    </Headroom>
  ) : (
    <Headroom>
      <header>
        <Logo />
        <Search />
        <Nav />
      </header>
    </Headroom>
  );

  return landingDisplay;
};

export default Header;
