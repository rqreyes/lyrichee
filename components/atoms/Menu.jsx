import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Nav from '../molecules/Nav';

const StyledMenu = styled.div`
  display: flex;
  position: relative;
`;

const StyledMenuButton = styled.button`
  width: 30px;
  height: 30px;
  color: ${({ theme }) => theme.colors.brown};
  padding: 0;
  background: none;

  &:hover {
    background: none;
  }

  svg {
    width: 30px;
    height: 30px;
  }

  /* Medium devices (tablets, 768px and up) */
  @media (min-width: 768px) {
    display: none;
  }
`;

const Menu = ({ landing }) => {
  const [toggleOpen, setToggleOpen] = useState(false);
  const menuIconDisplay = toggleOpen ? (
    <FontAwesomeIcon icon={faTimes} />
  ) : (
    <FontAwesomeIcon icon={faBars} />
  );

  return (
    <StyledMenu>
      <StyledMenuButton
        type='button'
        onClick={() => setToggleOpen((prev) => !prev)}
      >
        {menuIconDisplay}
      </StyledMenuButton>
      <Nav landing={landing} toggleOpen={toggleOpen} />
    </StyledMenu>
  );
};

export default Menu;
