import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
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
        <main className='search-results'>
          <section className='search-query'>
            <h2>Search Results</h2>
            <p>"{router.query.q}"</p>
          </section>
          <div className='container full-container'>
            <TrackList tracks={tracks} />
            <ArtistList artists={artists} />
          </div>
        </main>
      </>
    </>
  );
};
