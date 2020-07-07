import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faStar,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
  return (
    <nav>
      <div className='button-group'>
        <button type='button'>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button type='button'>
          <FontAwesomeIcon icon={faStar} />
        </button>
        <button type='button'>
          <FontAwesomeIcon icon={faSignInAlt} />
        </button>
      </div>
    </nav>
  );
};

export default Nav;
