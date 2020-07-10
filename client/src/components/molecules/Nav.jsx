import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faStar,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';

const Nav = ({ toggleOpen }) => {
  const history = useHistory();
  const navClass = toggleOpen ? 'open' : '';

  return (
    <nav className={navClass}>
      <div className='button-group'>
        <button type='button' onClick={() => history.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </button>
        <button type='button' onClick={() => history.goForward()}>
          <FontAwesomeIcon icon={faArrowRight} />
          Forward
        </button>
        <button type='button'>
          <FontAwesomeIcon icon={faStar} />
          Favorites
        </button>
        <button type='button'>
          <FontAwesomeIcon icon={faSignInAlt} />
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Nav;
