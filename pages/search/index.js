import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import {
  StyledH2,
  StyledH3,
  StyledSectionHeader,
  StyledColumnTwo,
  StyledSectionContent,
  StyledP,
} from '../../components/styles/Styles';
import Loading from '../../components/atoms/Loading';
import Header from '../../components/organisms/Header';
import TrackList from '../../components/molecules/TrackList';
import ArtistList from '../../components/molecules/ArtistList';

export default () => {
  const router = useRouter();
  const { data } = useSWR(`/api/search?q=${router.query.q}`);

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
  } else if (data === undefined) {
    searchResultsDisplay = (
      <StyledSectionContent>
        <StyledH3 noBottom>Searching...</StyledH3>
      </StyledSectionContent>
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
      <Loading data={data} />
    </>
  );
};
