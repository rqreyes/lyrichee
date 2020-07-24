import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Nav from '../molecules/Nav';

const Menu = () => {
  const [toggleOpen, setToggleOpen] = useState(false);
  const menuIconDisplay = toggleOpen ? (
    <FontAwesomeIcon icon={faTimes} />
  ) : (
    <FontAwesomeIcon icon={faBars} />
  );

  return (
    <div className='menu'>
      <button
        className='menu-button'
        type='button'
        onClick={() => setToggleOpen((prev) => !prev)}
      >
        {menuIconDisplay}
      </button>
      <Nav toggleOpen={toggleOpen} />
    </div>
  );
};

export default Menu;
