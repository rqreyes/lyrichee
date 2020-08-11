import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { Modal } from 'react-responsive-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faIdCard,
  faMusic,
  faStar,
  faSignInAlt,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { StyledH4, StyledButtonNav } from '../styles/Styles';

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
  const [aboutModal, setAboutModal] = useState(false);
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
      <StyledDivButtonGroup>
        <StyledButtonNav type='button' onClick={() => setAboutModal(true)}>
          <FontAwesomeIcon icon={faIdCard} />
          About
        </StyledButtonNav>
        <Modal open={aboutModal} onClose={() => setAboutModal(false)}>
          <StyledH4>About</StyledH4>
          <p>
            Lyrichee is a lyrics search engine application that helps users
            learn lyrics from their favorite tracks and measure their progress,
            line by line.
          </p>
          <StyledH4>But it's so slow!</StyledH4>
          <p>
            Ah, sorry! Lyrichee works hard, and it sometimes may take a while to
            retrieve the information. In the meanwhile, feel free to drink some
            tea, take a nap, or enjoy a long walk to the fridge :&#41;
          </p>
        </Modal>
        {navDisplay}
      </StyledDivButtonGroup>
    </StyledNav>
  );
};

export default Nav;
