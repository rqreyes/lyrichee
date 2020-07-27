import Link from 'next/link';
import styled from 'styled-components';

const StyledLink = styled.a`
  display: flex;

  ${({ landing }) =>
    landing &&
    `
      justify-content: center;
      margin-bottom: 20px;
  `}
`;

const StyledH1 = styled.h1`
  visibility: hidden;
  position: absolute;
`;

const StyledImg = styled.img`
  height: 50px;

  ${({ landing }) =>
    landing &&
    `
      width: 300px;
      height: auto;
  `}
`;

const Logo = ({ landing }) => {
  const logoSrc = landing ? '/images/logo-text.png' : '/images/logo-icon.png';

  return (
    <Link href='/'>
      <StyledLink landing={landing}>
        <StyledH1>Lyrichee</StyledH1>
        <StyledImg landing={landing} src={logoSrc} alt='logo' />
      </StyledLink>
    </Link>
  );
};

export default Logo;
