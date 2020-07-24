import { useState, useEffect } from 'react';
import Head from 'next/head';
import NProgress from 'nprogress';
import Loading from '../components/atoms/Loading';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import 'nprogress/nprogress.css';
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

  NProgress.configure({
    minimum: 0.4,
    showSpinner: false,
  });

  useEffect(() => {
    const start = () => {
      setLoading(true);
      NProgress.start();
    };
    const end = () => {
      setLoading(false);
      NProgress.done();
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
