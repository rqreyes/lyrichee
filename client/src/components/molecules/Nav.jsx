import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faStar,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
  const history = useHistory();

  return (
    <nav>
      <div className='button-group'>
        <button type='button' onClick={() => history.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button type='button' onClick={() => history.goForward()}>
          <FontAwesomeIcon icon={faArrowRight} />
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
