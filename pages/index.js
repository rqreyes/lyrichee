import Head from 'next/head';
import Logo from '../components/molecules/Logo';
import Search from '../components/molecules/Search';

const Landing = () => {
  return (
    <>
      <Head>
        <title>Lyrichee</title>
      </Head>
      <main className='landing-main'>
        <Logo landing />
        <Search landing />
      </main>
    </>
  );
};

export default Landing;
