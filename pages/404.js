import Head from 'next/head';
import Link from 'next/link';
import {
  StyledMainCenter,
  StyledH2,
  StyledP,
  StyledButtonText,
} from '../components/styles/Styles';
import Header from '../components/organisms/Header';

export default () => {
  return (
    <>
      <Head>
        <title>Lyrichee 404</title>
        <link
          href='https://fonts.googleapis.com/css2?family=MuseoModerno&display=swap'
          rel='stylesheet'
        ></link>
      </Head>
      <Header />
      <StyledMainCenter>
        <StyledH2 notFound>
          4<img src='/images/lychee.png' alt='lychee' />4
        </StyledH2>
        <StyledP alignCenter>Oops, this page does not exist</StyledP>
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
