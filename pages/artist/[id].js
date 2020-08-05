import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { parseDom } from '../../utils/parseDom';
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

export default () => {
  const router = useRouter();
  const { data, error } = useSWR(`/api/artist?id=${router.query.id}`);

  if (error) return <div>failed to load</div>;
  if (!data) return <Loading />;

  const alternateNames = data.artist.raw.alternate_names.length ? (
    <p>AKA: {data.artist.raw.alternate_names.join(', ')}</p>
  ) : (
    ''
  );
  const parseDomDisplay = (
    <div>{parseDom(data.artist.raw.description.dom.children)}</div>
  );

  return (
    <>
      <Head>
        <title>Lyrichee Artist | {data.artist.name}</title>
      </Head>
      <Header />
      <main>
        <StyledSectionHero>
          <div
            className='hero'
            style={{
              backgroundImage: `url(${data.artist.image})`,
            }}
          />
          <div className='details-container'>
            <img src={data.artist.thumbnail} alt='artist thumbnail' />
            <div className='details-content'>
              <StyledH2 alignLeft>{data.artist.name}</StyledH2>
              {alternateNames}
            </div>
          </div>
        </StyledSectionHero>
        <StyledColumnTwo>
          <TrackList tracks={data.tracks} />
          <StyledSectionContent className='half-right' padding>
            <StyledH3>About</StyledH3>
            {parseDomDisplay}
          </StyledSectionContent>
        </StyledColumnTwo>
      </main>
    </>
  );
};
