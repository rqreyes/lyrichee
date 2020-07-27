import Head from 'next/head';
import { StyledMainCenter } from '../components/organisms/Styles';
import Logo from '../components/molecules/Logo';
import Search from '../components/molecules/Search';

const Landing = () => {
  return (
    <>
      <Head>
        <title>Lyrichee</title>
      </Head>
      <StyledMainCenter>
        <Logo landing />
        <Search landing />
      </StyledMainCenter>
    </>
  );
};

export default Landing;
