import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faStar,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';

const Nav = ({ toggleOpen, landing }) => {
  const history = useHistory();
  const navClass = toggleOpen ? 'open' : '';
  const buttonsDisplay = landing ? (
    <Fragment>
      <button type='button'>
        <FontAwesomeIcon icon={faStar} />
        Favorites
      </button>
      <button type='button'>
        <FontAwesomeIcon icon={faSignInAlt} />
        Sign In
      </button>
    </Fragment>
  ) : (
    <Fragment>
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
    </Fragment>
  );

  return (
    <nav className={navClass}>
      <div className='button-group'>{buttonsDisplay}</div>
    </nav>
  );
};

export default Nav;
