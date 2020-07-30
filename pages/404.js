import Head from 'next/head';
import Link from 'next/link';
import {
  StyledMainCenter,
  StyledH2,
  StyledP,
  StyledButtonText,
} from '../components/styles/Styles';

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
      <StyledMainCenter>
        <StyledH2 notFound>404</StyledH2>
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
