import React, { useState, useEffect } from 'react';
import Headroom from 'react-headroom';
import Logo from '../molecules/Logo';
import Search from '../molecules/Search';
import Nav from '../molecules/Nav';
import Menu from '../atoms/Menu';

const mql = window.matchMedia('(min-width: 768px)');

const Header = ({ landing }) => {
  const [toggleOpen, setToggleOpen] = useState(mql.matches);

  const mediaQueryChanged = () => {
    setToggleOpen((prev) => !prev);
  };

  const menuDisplay = toggleOpen ? <Nav toggleOpen={toggleOpen} /> : <Menu />;
  const headerDisplay = landing ? (
    <header className='landing-header'>
      <Nav />
    </header>
  ) : (
    <Headroom>
      <header>
        <Logo />
        <Search />
        {menuDisplay}
      </header>
    </Headroom>
  );

  useEffect(() => {
    mql.addListener(mediaQueryChanged);

    return () => {
      mql.removeListener(mediaQueryChanged);
    };
  });

  return headerDisplay;
};

export default Header;
