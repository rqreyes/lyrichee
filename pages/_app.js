import { useState, useEffect } from 'react';
import Head from 'next/head';
import Loading from '../components/atoms/Loading';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import '../styles/styles.scss';

export default ({ Component, pageProps, router }) => {
  const [loading, setLoading] = useState(false);

  const headerDisplay =
    router.pathname === '/' ? <Header landing /> : <Header />;
  const loadingDisplay = loading ? (
    <Loading />
  ) : (
    <>
      {headerDisplay}
      <Component {...pageProps} />
    </>
  );

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);
    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
  }, []);
  return (
    <>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'
          rel='stylesheet'
        />
      </Head>
      {loadingDisplay}
      <Footer />
    </>
  );
};
