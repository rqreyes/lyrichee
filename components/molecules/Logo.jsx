import Link from 'next/link';
import styled from 'styled-components';

const StyledLink = styled.a`
  display: flex;

  ${({ home }) =>
    home &&
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

  ${({ home }) =>
    home &&
    `
      width: 300px;
      height: auto;
  `}
`;

const Logo = ({ text, home }) => {
  const logoSrc = text ? '/images/logo-text.png' : '/images/logo-icon.png';

  return (
    <Link href='/' passHref>
      <StyledLink home={home}>
        <StyledH1>Lyrichee</StyledH1>
        <StyledImg home={home} src={logoSrc} alt='logo' />
      </StyledLink>
    </Link>
  );
};

export default Logo;
