import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { StyledMainCenter } from '../components/organisms/Styles';

const StyledH2 = styled.h2`
  font-family: 'MuseoModerno', cursive;
  font-size: 72px;
  margin-bottom: 0;
`;

const StyledP = styled.p`
  text-align: center;
`;

const StyledButton = styled.button`
  width: auto;
  margin: auto;
`;

export default () => {
  return (
    <>
      <Head>
        <title>Lyrichee 404</title>
      </Head>
      <StyledMainCenter>
        <StyledH2>404</StyledH2>
        <StyledP>Oops, this page does not exist</StyledP>
        <Link href='/' passHref>
          <a>
            <StyledButton>Let's Go Home</StyledButton>
          </a>
        </Link>
      </StyledMainCenter>
    </>
  );
};
