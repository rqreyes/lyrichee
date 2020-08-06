import { useEffect } from 'react';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import axios from 'axios';
import Cookies from 'js-cookie';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Footer from '../components/organisms/Footer';
import 'nprogress/nprogress.css';
import 'react-responsive-modal/styles.css';

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
    font-family: 'Roboto', sans-serif;
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

  a {
    color: inherit;
    text-decoration: none;
  }

  p {
    margin: 0 0 16px;

    &:last-of-type {
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

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default ({ Component, pageProps }) => {
  useEffect(() => {
    (async () => {
      try {
        if (Cookies.get('token')) {
          const { data } = await axios.post('/api/user/verify', {
            token: Cookies.get('token'),
          });

          if (!data) {
            Cookies.remove('token');
          }
        }
      } catch (err) {
        console.log(err);
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
        <SWRConfig value={{ revalidateOnFocus: false, fetcher }}>
          <Component {...pageProps} />
        </SWRConfig>
        <Footer />
      </ThemeProvider>
    </>
  );
};
