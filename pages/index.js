import Head from 'next/head';
import { StyledMainCenter } from '../components/organisms/Styles';
import Logo from '../components/molecules/Logo';
import Search from '../components/molecules/Search';

export default () => {
  return (
    <>
      <Head>
        <title>Lyrichee</title>
      </Head>
      <StyledMainCenter>
        <Logo text home />
        <Search home />
      </StyledMainCenter>
    </>
  );
};
