import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import styled from 'styled-components';
import { StyledContainerFull } from '../../components/organisms/Styles';
import TrackList from '../../components/molecules/TrackList';
import ArtistList from '../../components/molecules/ArtistList';

const StyledSection = styled.section`
  text-align: center;
  background: #fff;
  border: 0;
  border-bottom: ${({ theme }) => theme.border};
  border-radius: 0;
  padding: 20px 10px;
  margin-bottom: 10px;
`;

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
  const tracks = data;
  const artists = data.reduce((artistsArr, track) => {
    if (artistsArr.findIndex(({ name }) => name === track.artist.name) < 0)
      artistsArr.push(track.artist);

    return artistsArr;
  }, []);

  return (
    <>
      <Head>
        <title>Lyrichee Search | {router.query.q}</title>
      </Head>
      <>
        <main>
          <StyledSection>
            <h2>Search Results</h2>
            <p>"{router.query.q}"</p>
          </StyledSection>
          <StyledContainerFull>
            <TrackList tracks={tracks} />
            <ArtistList artists={artists} />
          </StyledContainerFull>
        </main>
      </>
    </>
  );
};
