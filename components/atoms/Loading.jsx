import styled, { keyframes } from 'styled-components';

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
  width: 80%;
  margin: 30vh auto 0;
  position: relative;
`;

const StyledNoteGroup = styled.div`
  margin-bottom: 80px;

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

const Loading = () => {
  const logoSrc = '/images/logo-icon.png';

  return (
    <StyledLoading>
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
      <h2>Loading...</h2>
    </StyledLoading>
  );
};

export default Loading;
