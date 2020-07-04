import React from 'react';
import { Link } from 'react-router-dom';
import LogoFont from '../../images/logo-font.png';
import LogoIcon from '../../images/logo-icon.png';

const Logo = ({ landing }) => {
  const logoSrc = landing ? LogoFont : LogoIcon;

  return (
    <div className='logo'>
      <Link to='/'>
        <h1>Lyrichee</h1>
        <img src={logoSrc} alt='logo' />
      </Link>
    </div>
  );
};

export default Logo;
