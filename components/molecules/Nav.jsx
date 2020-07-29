import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMusic,
  faStar,
  faSignInAlt,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const StyledNav = styled.nav`
  visibility: hidden;
  opacity: 0;
  background: #fff;
  border-right: 0;
  border-bottom: ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) => theme.boxShadow};
  position: absolute;
  top: 47px;
  right: -20px;
  transition: all 0.2s;

  ${({ toggleOpen }) =>
    toggleOpen &&
    `
      visibility: visible;
      opacity: 1;
  `}

  /* Medium devices (tablets, 768px and up) */
  @media (min-width: 768px) {
    visibility: visible;
    opacity: 1;
    background: none;
    border: 0;
    box-shadow: none;
    position: static;
  }
`;

const StyledButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;

  /* Medium devices (tablets, 768px and up) */
  @media (min-width: 768px) {
    flex-direction: row;
    padding: 0;
  }
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.brown};
  background: none;
  border-radius: 0;
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.greenDark};
    background: none;
  }

  svg {
    width: 20px !important;
    margin-right: 10px;
  }

  /* Medium devices (tablets, 768px and up) */
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    padding: 10px;
    border-radius: 4px;

    &:hover {
      color: ${({ theme }) => theme.colors.greenDark};
    }

    svg {
      height: 20px;
      margin: 0;
    }
  }
`;

const Nav = ({ home, toggleOpen }) => {
  const [signedIn, setSignedIn] = useState(false);
  const router = useRouter();

  const removeData = () => {
    Cookies.remove('token');
    router.push('/');
  };

  const navDisplay = signedIn ? (
    <>
      <Link href='/favorites' passHref>
        <a>
          <StyledButton type='button'>
            <FontAwesomeIcon icon={faStar} />
            Favorites
          </StyledButton>
        </a>
      </Link>
      <StyledButton type='button' onClick={removeData}>
        <FontAwesomeIcon icon={faSignOutAlt} />
        Sign Out
      </StyledButton>
    </>
  ) : (
    <>
      <Link href='/register' passHref>
        <a>
          <StyledButton type='button'>
            <FontAwesomeIcon icon={faMusic} />
            Register
          </StyledButton>
        </a>
      </Link>
      <Link href='/signin' passHref>
        <a>
          <StyledButton type='button'>
            <FontAwesomeIcon icon={faSignInAlt} />
            Sign In
          </StyledButton>
        </a>
      </Link>
    </>
  );

  useEffect(() => {
    if (Cookies.get('token')) {
      setSignedIn(true);
    }
  }, []);

  return (
    <StyledNav home={home} toggleOpen={toggleOpen}>
      <StyledButtonGroup>{navDisplay}</StyledButtonGroup>
    </StyledNav>
  );
};

export default Nav;
