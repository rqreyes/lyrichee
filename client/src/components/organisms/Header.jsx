import React, { Fragment } from 'react';
import Heading from '../molecules/Heading';
import Search from '../molecules/Search';

const Header = () => {
  return (
    <Fragment>
      <Heading />
      <Search />
    </Fragment>
  );
};

export default Header;
