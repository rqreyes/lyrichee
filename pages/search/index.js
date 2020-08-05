import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import {
  StyledH2,
  StyledSectionHeader,
  StyledColumnTwo,
  StyledSectionContent,
  StyledP,
} from '../../components/styles/Styles';
import Error500 from '../../components/organisms/Error500';
import Loading from '../../components/atoms/Loading';
import Header from '../../components/organisms/Header';
import TrackList from '../../components/molecules/TrackList';
import ArtistList from '../../components/molecules/ArtistList';

export default () => {
  const router = useRouter();
  const { data, error } = useSWR(`/api/search?q=${router.query.q}`);

  if (error) return <Error500 />;
  if (!data) return <Loading />;

  let searchResultsDisplay;

  if (Array.isArray(data)) {
    const artists = data.reduce((artistsArr, track) => {
      if (artistsArr.findIndex(({ name }) => name === track.artist.name) < 0)
        artistsArr.push(track.artist);

      return artistsArr;
    }, []);

    searchResultsDisplay = (
      <StyledColumnTwo>
        <TrackList tracks={data} />
        <ArtistList artists={artists} />
      </StyledColumnTwo>
    );
  } else {
    searchResultsDisplay = (
      <StyledSectionContent>
        <StyledP alignCenter>No results were found</StyledP>
      </StyledSectionContent>
    );
  }

  return (
    <>
      <Head>
        <title>Lyrichee Search | {router.query.q}</title>
      </Head>
      <Header />
      <main>
        <StyledSectionHeader>
          <StyledH2>Search Results</StyledH2>
          <p>"{router.query.q}"</p>
        </StyledSectionHeader>
        {searchResultsDisplay}
      </main>
    </>
  );
};
