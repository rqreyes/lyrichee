import React from 'react';
import { Link } from 'react-router-dom';
import LogoFont from '../../images/logo-font.png';

const Heading = () => {
  return (
    <div className='heading'>
      <Link to='/'>
        <h1>Lyrichee</h1>
        <img src={LogoFont} alt='heading' />
      </Link>
    </div>
  );
};

export default Heading;
