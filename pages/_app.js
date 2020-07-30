import { useState, useEffect } from 'react';
import Head from 'next/head';
import NProgress from 'nprogress';
import axios from 'axios';
import Cookies from 'js-cookie';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Loading from '../components/atoms/Loading';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import 'nprogress/nprogress.css';

const theme = {
  colors: {
    snow: 'snow',
    grey: '#ccc',
    pink: '#f7a3c0',
    red: '#e04666',
    redDark: '#a6001f',
    lychee: '#f7dfd4',
    brown: '#472816',
    green: '#6bb745',
    greenDark: '#5ca943',
  },
  border: '1px solid #eee',
  boxShadow: '0 2px 4px #eee',
};

const GlobalStyle = createGlobalStyle`
  /* typography */
  h1 {
  text-indent: -9999px;
  }

  h2,
  h3 {
    text-align: center;
    margin: 0 0 10px;
  }

  body,
  button {
    font-family: 'Roboto', sans-serif;
  }

  button {
    font-size: 14px;
  }

  input {
    font-size: 16px;
  }

/* general */
  * {
    box-sizing: border-box;
  }

  html {
    height: 100%;
  }

  body,
  #root,
  #__next {
    min-height: 100%;
  }

  body {
    color: ${({ theme }) => theme.colors.brown};
    background: ${({ theme }) => theme.colors.snow};
    margin: 0;
    position: relative;

    &::before {
      content: '';
      opacity: 0.1;
      width: 100%;
      height: 100%;
      background: url(/images/bg.png) no-repeat center bottom;
      background-size: cover;
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
    }
  }

  #__next {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
  }

  main {
    width: 100%;
    margin-bottom: 60px;
  }

  input {
    width: 100%;
    color: ${({ theme }) => theme.colors.brown}
  }

  .button-group {
    flex: 0 0 auto;
    display: flex;
    justify-content: center;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: #fff;
    background: ${({ theme }) => theme.colors.red};
    padding: 10px 20px;
    border: 0;
    border-radius: 4px;
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
      background: ${({ theme }) => theme.colors.greenDark};
    }
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  p {
    margin: 0 0 16px;

    &:last-child {
      margin-bottom: 0;
    }

    a {
      color: ${({ theme }) => theme.colors.red};
      transition: color 0.2s;

      &:hover {
        color: ${({ theme }) => theme.colors.greenDark}
      }
    }
  }

  /* nprogress */
  #nprogress {
    .bar {
      background: ${({ theme }) => theme.colors.red};
    }
    .peg {
      box-shadow: 0 0 10px ${({ theme }) => theme.colors.red}, 0 0 5px ${({
  theme,
}) => theme.colors.red};
    }
  }

  /* Medium devices (tablets, 768px and up) */
  @media (min-width: 768px) {
    section {
      border: ${({ theme }) => theme.border};
      border-radius: 10px;
    }
  }
`;

export default ({ Component, pageProps, router }) => {
  const [loading, setLoading] = useState(false);

  const headerDisplay = router.pathname === '/' ? <Header home /> : <Header />;
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

  useEffect(() => {
    (async () => {
      if (Cookies.get('token')) {
        const { data } = await axios.post('/api/user/verify', {
          token: Cookies.get('token'),
        });

        if (!data) {
          Cookies.remove('token');
        }
      }
    })();
  });

  return (
    <>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {loadingDisplay}
        <Footer />
      </ThemeProvider>
    </>
  );
};
