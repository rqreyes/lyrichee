import React, { Fragment, useContext, useEffect } from 'react';
import { NavContext } from '../../contexts/NavContext';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faStar,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';

const Nav = ({ toggleOpen }) => {
  const {
    historyStack,
    pathAdd,
    pathBack,
    pathForward,
    pathBranch,
  } = useContext(NavContext);
  const history = useHistory();
  const pathPrev = historyStack.stack[historyStack.index - 1];
  const pathNext = historyStack.stack[historyStack.index + 1];
  const navClass = toggleOpen ? 'open' : '';

  useEffect(() => {
    const pathCurr = `${history.location.pathname}${history.location.search}`;

    if (
      pathCurr !== historyStack.stack[historyStack.index] &&
      pathNext === undefined
    ) {
      pathAdd(pathCurr);
    } else if (pathCurr !== historyStack.stack[historyStack.index]) {
      pathBranch(pathCurr);
    }
  }, [
    history.location.pathname,
    history.location.search,
    historyStack.stack,
    historyStack.index,
    pathNext,
    pathAdd,
    pathBranch,
  ]);

  return (
    <nav className={navClass}>
      <div className='button-group'>
        <Fragment>
          <button
            type='button'
            onClick={() => {
              history.push(pathPrev);
              pathBack();
            }}
            disabled={pathPrev === undefined}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back
          </button>
          <button
            type='button'
            onClick={() => {
              history.push(pathNext);
              pathForward();
            }}
            disabled={pathNext === undefined}
          >
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
      </div>
    </nav>
  );
};

export default Nav;
