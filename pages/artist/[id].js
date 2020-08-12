import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import fallbackSrc from '../../utils/fallbackSrc';
import parseDom from '../../utils/parseDom';
import styled from 'styled-components';
import {
  StyledH2,
  StyledH3,
  StyledSectionHero,
  StyledColumnTwo,
  StyledSectionContent,
} from '../../components/styles/Styles';
import Loading from '../../components/atoms/Loading';
import Header from '../../components/organisms/Header';
import TrackList from '../../components/molecules/TrackList';

const StyledDivAbout = styled.div`
  img {
    width: 100%;
    height: auto;
  }
`;

export default () => {
  const router = useRouter();
  const { data } = useSWR(`/api/artist?id=${router.query.id}`);

  let artistNameDisplay,
    heroUrlDisplay,
    artistThumbnail,
    alternateNamesDisplay,
    dataTracks = [],
    parseDomDisplay;

  if (data) {
    artistNameDisplay = data.artist.name;
    heroUrlDisplay = data.artist.image;
    artistThumbnail = data.artist.thumbnail;
    alternateNamesDisplay = data.artist.raw.alternate_names.length ? (
      <p>AKA: {data.artist.raw.alternate_names.join(', ')}</p>
    ) : (
      ''
    );
    dataTracks = data.tracks;
    parseDomDisplay = (
      <StyledDivAbout>
        {parseDom(data.artist.raw.description.dom.children)}
      </StyledDivAbout>
    );
  }

  return (
    <>
      <Head>
        <title>Lyrichee Artist | {artistNameDisplay}</title>
      </Head>
      <Header />
      <main>
        <StyledSectionHero>
          <div
            className='hero'
            style={{
              backgroundImage: `url(${heroUrlDisplay})`,
            }}
          />
          <div className='details-container'>
            <div className='details-image-container'>
              <img
                src={artistThumbnail}
                onError={fallbackSrc}
                alt='artist thumbnail'
              />
            </div>
            <div className='details-content'>
              <StyledH2>{artistNameDisplay}</StyledH2>
              {alternateNamesDisplay}
            </div>
          </div>
        </StyledSectionHero>
        <StyledColumnTwo>
          <TrackList tracks={dataTracks} />
          <StyledSectionContent className='half-right' padding>
            <StyledH3>About</StyledH3>
            {parseDomDisplay}
          </StyledSectionContent>
        </StyledColumnTwo>
      </main>
      <Loading data={data} />
    </>
  );
};
