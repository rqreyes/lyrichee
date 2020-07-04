import React, { Fragment } from 'react';
import Header from './Header';
import Logo from '../molecules/Logo';
import Search from '../molecules/Search';

const Landing = () => {
  return (
    <Fragment>
      <Header landing={true} />
      <main className='landing-main'>
        <Logo landing={true} />
        <Search landing={true} />
      </main>
    </Fragment>
  );
};

export default Landing;
