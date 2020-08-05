import Head from 'next/head';
import Link from 'next/link';
import {
  StyledMainCenter,
  StyledH2,
  StyledP,
  StyledButtonText,
} from '../styles/Styles';
import Header from '../organisms/Header';

export default () => {
  return (
    <>
      <Head>
        <title>Lyrichee 500</title>
        <link
          href='https://fonts.googleapis.com/css2?family=MuseoModerno&display=swap'
          rel='stylesheet'
        ></link>
      </Head>
      <Header />
      <StyledMainCenter>
        <StyledH2 notFound>
          5<img src='/images/lychee.png' alt='lychee' />
          <img src='/images/lychee.png' alt='lychee' />
        </StyledH2>
        <StyledP alignCenter>Oops, you've found a glitch in the Matrix</StyledP>
        <Link href='/' passHref>
          <a>
            <StyledButtonText widthAuto marginAuto>
              Let's Go Home
            </StyledButtonText>
          </a>
        </Link>
      </StyledMainCenter>
    </>
  );
};
