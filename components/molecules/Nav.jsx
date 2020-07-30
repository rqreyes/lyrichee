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
import { StyledButtonNav } from '../styles/Styles';

const StyledNav = styled.nav`
  visibility: hidden;
  opacity: 0;
  background: #fff;
  border-right: 0;
  border-bottom: ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) => theme.boxShadow};
  position: absolute;
  top: 45px;
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

const StyledDivButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;

  /* Medium devices (tablets, 768px and up) */
  @media (min-width: 768px) {
    flex-direction: row;
    padding: 0;
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
          <StyledButtonNav type='button'>
            <FontAwesomeIcon icon={faStar} />
            Favorites
          </StyledButtonNav>
        </a>
      </Link>
      <StyledButtonNav type='button' onClick={removeData}>
        <FontAwesomeIcon icon={faSignOutAlt} />
        Sign Out
      </StyledButtonNav>
    </>
  ) : (
    <>
      <Link href='/register' passHref>
        <a>
          <StyledButtonNav type='button'>
            <FontAwesomeIcon icon={faMusic} />
            Register
          </StyledButtonNav>
        </a>
      </Link>
      <Link href='/signin' passHref>
        <a>
          <StyledButtonNav type='button'>
            <FontAwesomeIcon icon={faSignInAlt} />
            Sign In
          </StyledButtonNav>
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
      <StyledDivButtonGroup>{navDisplay}</StyledDivButtonGroup>
    </StyledNav>
  );
};

export default Nav;
