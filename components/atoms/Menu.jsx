import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { StyledButton } from '../styles/Styles';
import Nav from '../molecules/Nav';

const StyledMenu = styled.div`
  display: flex;
  position: relative;
`;

const StyledMenuButton = styled(StyledButton)`
  width: 30px;
  height: 30px;
  color: ${({ theme }) => theme.colors.brown};
  padding: 0;

  svg {
    width: 30px;
    height: 30px;
  }

  /* Medium devices (tablets, 768px and up) */
  @media (min-width: 768px) {
    display: none;
  }
`;

const Menu = ({ home }) => {
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
      <Nav home={home} toggleOpen={toggleOpen} />
    </StyledMenu>
  );
};

export default Menu;
