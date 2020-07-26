import Head from 'next/head';
import styled from 'styled-components';
import Logo from '../components/molecules/Logo';
import Search from '../components/molecules/Search';

const StyledMain = styled.main`
  width: 100%;
  max-width: 400px;
  padding: 0 10px;
  margin: auto;
`;

const Landing = () => {
  return (
    <>
      <Head>
        <title>Lyrichee</title>
      </Head>
      <StyledMain>
        <Logo landing />
        <Search landing />
      </StyledMain>
    </>
  );
};

export default Landing;
