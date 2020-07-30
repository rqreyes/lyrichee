import Head from 'next/head';
import axios from 'axios';
import {
  StyledH2,
  StyledH3,
  StyledSectionHero,
  StyledColumnTwo,
  StyledSectionContent,
} from '../../components/styles/Styles';
import TrackList from '../../components/molecules/TrackList';

const getArtist = async (key, id) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/artist?id=${encodeURI(id)}`
  );
  return data;
};

export async function getServerSideProps(context) {
  const data = await getArtist(null, context.params.id);
  return {
    props: {
      data,
    },
  };
}

export default ({ data }) => {
  // parse the description DOM into HTML
  const parseDOM = (DOM) => {
    if (DOM === undefined) return;

    return DOM.map((parent, idx) => {
      if (typeof parent === 'string') return parent;

      const Tag = parent.tag;
      const parentAttributes = parent.attributes;
      if (parent.tag === 'a') parentAttributes.target = '_blank';

      return (
        <Tag key={`key-${idx}`} {...parentAttributes}>
          {parseDOM(parent.children)}
        </Tag>
      );
    });
  };

  const alternateNames = data.artist.raw.alternate_names.length ? (
    <p>AKA: {data.artist.raw.alternate_names.join(', ')}</p>
  ) : (
    ''
  );
  const parsedDOM = (
    <div>{parseDOM(data.artist.raw.description.dom.children)}</div>
  );

  return (
    <>
      <Head>
        <title>Lyrichee Artist | {data.artist.name}</title>
      </Head>
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
          <StyledSectionContent className='half-right'>
            <StyledH3>About</StyledH3>
            {parsedDOM}
          </StyledSectionContent>
        </StyledColumnTwo>
      </main>
    </>
  );
};
