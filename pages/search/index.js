import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  StyledH2,
  StyledSectionHeader,
  StyledColumnTwo,
  StyledSectionContent,
  StyledP,
} from '../../components/styles/Styles';
import TrackList from '../../components/molecules/TrackList';
import ArtistList from '../../components/molecules/ArtistList';

const getSearchResults = async (key, query) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/search?q=${encodeURI(query)}`
  );
  return data;
};

export async function getServerSideProps(context) {
  const data = await getSearchResults(null, context.query.q);
  return {
    props: {
      data,
    },
  };
}

export default ({ data }) => {
  const router = useRouter();
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
      <>
        <main>
          <StyledSectionHeader>
            <StyledH2>Search Results</StyledH2>
            <p>"{router.query.q}"</p>
          </StyledSectionHeader>
          {searchResultsDisplay}
        </main>
      </>
    </>
  );
};
