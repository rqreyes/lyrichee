import { useEffect } from 'react';
import NProgress from 'nprogress';
import styled, { keyframes } from 'styled-components';
import { StyledH2 } from '../styles/Styles';

const randomDelay = () => `${Math.random() * 2}s`;

const notes = keyframes`
  0% {
    opacity: 0;
    transform: scale(1) translate(0, 0);
  }
  50% {
    opacity: 1;
    transform: scale(1.5) translate(50%, -50%);
  }
  80% {
    opacity: 0;
    transform: scale(1.5) translate(100%, -100%);
  }
  100% {
    opacity: 0;
    transform: scale(1.5) translate(100%, -100%);
  }
`;

const StyledLoading = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.snow};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  transition: top 2s 1s;

  &::before {
    content: '';
    display: block;
    opacity: 0.1;
    width: 100%;
    height: 100%;
    background: url(/images/bg.png) no-repeat center bottom;
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  ${({ data }) =>
    data &&
    `
      top: 100vh;
  `}
`;

const StyledNoteGroup = styled.div`
  width: 80%;
  height: 60px;
  position: relative;
  margin: 30vh auto 40px;

  > * {
    &:nth-child(1) {
      left: 0;
      animation-delay: 1s;
    }

    &:nth-child(2) {
      left: 10%;
      animation-delay: ${randomDelay()};
    }

    &:nth-child(3) {
      left: 20%;
      animation-delay: ${randomDelay()};
    }

    &:nth-child(4) {
      left: 30%;
      animation-delay: ${randomDelay()};
    }

    &:nth-child(5) {
      left: 40%;
      animation-delay: ${randomDelay()};
    }

    &:nth-child(6) {
      left: 50%;
      animation-delay: ${randomDelay()};
    }

    &:nth-child(7) {
      left: 60%;
      animation-delay: ${randomDelay()};
    }

    &:nth-child(8) {
      left: 70%;
      animation-delay: ${randomDelay()};
    }

    &:nth-child(9) {
      left: 80%;
      animation-delay: ${randomDelay()};
    }

    &:nth-child(10) {
      left: 90%;
      animation-delay: ${randomDelay()};
    }
  }
`;

const StyledNote = styled.div`
  opacity: 0;
  font-size: 40px;
  position: absolute;
  animation: ${notes} 2s infinite linear;
`;

const StyledLogo = styled(StyledNote)`
  height: 40px;
`;

const Loading = ({ data }) => {
  const logoSrc = '/images/logo-icon.png';

  NProgress.configure({
    minimum: 0.4,
    showSpinner: false,
  });

  useEffect(() => {
    NProgress.start();

    return () => NProgress.done();
  }, []);

  useEffect(() => {
    if (data) NProgress.done();
  }, [data]);

  return (
    <StyledLoading data={data}>
      <StyledNoteGroup>
        <StyledNote>&#9835;</StyledNote>
        <StyledNote>&#9839;</StyledNote>
        <StyledLogo as='img' src={logoSrc} alt='logo' />
        <StyledNote>&#119074;</StyledNote>
        <StyledLogo as='img' src={logoSrc} alt='logo' />
        <StyledNote>&#9837;</StyledNote>
        <StyledNote>&#9833;</StyledNote>
        <StyledLogo as='img' src={logoSrc} alt='logo' />
        <StyledNote>&#119070;</StyledNote>
        <StyledNote>&#9834;</StyledNote>
      </StyledNoteGroup>
      <StyledH2>Loading...</StyledH2>
    </StyledLoading>
  );
};

export default Loading;
