import Head from 'next/head';
import { StyledMainCenter } from '../components/styles/Styles';
import Header from '../components/organisms/Header';
import Logo from '../components/molecules/Logo';
import Search from '../components/molecules/Search';

export default () => {
  return (
    <>
      <Head>
        <title>Lyrichee</title>
      </Head>
      <Header home />
      <StyledMainCenter>
        <Logo text home />
        <Search home />
      </StyledMainCenter>
    </>
  );
};
