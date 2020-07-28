import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import cookie from 'cookie';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarFull } from '@fortawesome/free-solid-svg-icons';
import { faSpotify, faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';
import { StyledSectionInfo } from '../../components/organisms/Styles';
import LyricsSection from '../../components/molecules/LyricsSection';

const StyledButtonOptions = styled.div`
  display: flex;
`;

const StyledButton = styled.button`
  width: auto;
`;

const StyledButtonFavorite = styled(StyledButton)`
  color: ${({ favorite, theme }) =>
    favorite ? theme.colors.greenDark : theme.colors.red};
  padding: 0;
  background: none;
  margin-right: 16px;

  &:hover {
    color: ${({ favorite, theme }) =>
      favorite ? theme.colors.red : theme.colors.greenDark};
    background: none;
  }

  svg {
    height: 36px;
  }
`;

const StyledButtonReset = styled(StyledButton)`
  display: block;
  margin: 0 auto 10px;
`;

const StyledSection = styled.section`
  background: #fff;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;

  /* Medium devices (tablets, 768px and up) */
  @media (min-width: 768px) {
    width: 730px;
    margin: auto;
  }
`;

const StyledSectionStreams = styled(StyledSection)`
  padding: 20px 40px;
  margin-bottom: 10px;

  /* Medium devices (tablets, 768px and up) */
  @media (min-width: 768px) {
    margin: 0 auto 10px;
  }
`;

const StyledSectionLyrics = styled(StyledSection)`
  padding: 20px 10px;

  .lyrics-section {
    &.active {
      .section-button {
        background: ${({ theme }) => theme.colors.greenDark};
      }
    }

    .section-button {
      height: 40px;
      padding: 0;
      margin-bottom: 10px;
      transition: all 0.6s;

      &:hover {
        background: ${({ theme }) => theme.colors.green} !important;
      }

      &.hide-section {
        visibility: hidden;
        opacity: 0;
        height: 0;

        svg {
          height: 0;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    > div {
      overflow: hidden;
      transition: all 0.6s;
    }
  }

  .lyrics-section-header {
    font-weight: 700;
    margin: 0 0 4px 30px;
  }

  .lyrics-line {
    display: flex;
    align-items: center;
    margin: 0 0 4px;

    &.hide-line {
      .line-button {
        opacity: 1;
      }

      p {
        opacity: 0;
      }
    }

    &.active {
      .line-button {
        color: ${({ theme }) => theme.colors.greenDark};
      }

      p {
        opacity: 1;
      }
    }

    .line-button {
      opacity: 0;
      width: 20px;
      height: 20px;
      color: ${({ theme }) => theme.colors.pink};
      background: none;
      padding: 0;
      margin-right: 10px;
      transition: all 0.6s;

      &:hover {
        color: ${({ theme }) => theme.colors.green} !important;
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    p {
      transition: all 0.6s;
    }
  }
`;

const StyledEmbedContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
  margin-bottom: 10px;
`;

const StyledIFrame = styled.iframe`
  border-radius: 10px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const StyledProviders = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledProvider = styled.a`
  width: 40px;
  height: 40px;
  margin: 0 5px;

  svg {
    width: 40px;
    height: 40px;
    color: ${({ theme }) => theme.colors.red};
    transition: color 0.2s;

    &:hover {
      color: ${({ theme }) => theme.colors.greenDark};
    }
  }
`;

const StyledCheckboxGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const StyledCheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin: 0 10px;
  position: relative;
  cursor: pointer;

  &:hover {
    > div {
      background: ${({ theme }) => theme.colors.green} !important;
    }
  }
`;

const StyledCheckboxInput = styled.input`
  opacity: 0;
  position: absolute;
  cursor: pointer;

  &:checked {
    ~ div {
      background: ${({ theme }) => theme.colors.greenDark};

      &::before {
        visibility: hidden;
        opacity: 0;
        width: 28px;
        height: 28px;
        z-index: 99;
        transform: scale(3);
        transition: all 0.4s;
      }

      &::after {
        width: 6px;
        height: 12px;
        top: 5px;
        left: 10px;
        transform: rotate(45deg) scale(1);
      }
    }
  }
`;

const StyledCheckboxCustom = styled.div`
  height: 28px;
  width: 28px;
  background: ${({ theme }) => theme.colors.red};
  border-radius: 4px;
  margin-right: 10px;
  position: relative;
  transition: all 0.4s;

  &::before {
    content: '';
    background: ${({ theme }) => theme.colors.greenDark};
    border-radius: 4px;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: scale(0);
  }

  &::after {
    content: '';
    width: 0px;
    height: 0px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    position: absolute;
    top: 14px;
    left: 14px;
    transform: rotate(45deg) scale(0);
    transition: all 0.4s;
  }
`;

const StyledLyricsContent = styled.div`
  transition: all 0.6s;

  &.learn-section {
    .lyrics-section-content {
      > div {
        &:last-child {
          margin-bottom: 10px;
        }
      }
    }
  }

  &.hide {
    opacity: 0;
  }
`;

const getTrack = async (key, id) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/track?id=${encodeURI(id)}`
  );
  return data;
};

const getFavoriteItem = async (key, id, token) => {
  const { data } = await axios.get(
    'http://localhost:3000/api/user/favoriteItem',
    {
      params: {
        token,
        queryId: encodeURI(id),
      },
    }
  );
  return data;
};

export async function getServerSideProps(context) {
  const dataTrack = await getTrack(null, context.params.id);
  const dataFavoriteItem = await getFavoriteItem(
    null,
    context.params.id,
    cookie.parse(context.req.headers.cookie).token
  );
  return {
    props: {
      dataTrack,
      dataFavoriteItem,
    },
  };
}

export default ({ dataTrack, dataFavoriteItem }) => {
  const [favorite, setFavorite] = useState(dataFavoriteItem);
  const [learnLine, setLearnLine] = useState(false);
  const [learnSection, setLearnSection] = useState(false);
  const [hideAll, setHideAll] = useState(false);
  const [learnReset, setLearnReset] = useState(false);

  const updateLearnReset = () => {
    setLearnLine(false);
    setLearnSection(false);
    setHideAll(false);
    setLearnReset(!learnReset);
  };

  // parse lyrics string into HTML
  const parseLyrics = (lyrics) => {
    return lyrics
      .split(/\n\n/)
      .map((section, ind) => (
        <LyricsSection
          key={`section-${ind}`}
          section={section}
          learnLine={learnLine}
          learnSection={learnSection}
          learnReset={learnReset}
        />
      ));
  };

  // display album art or placeholder image
  let albumDisplay;

  if (dataTrack.track.album) {
    albumDisplay = dataTrack.track.album.cover_art_url;
  } else if (dataTrack.track.thumbnail) {
    albumDisplay = dataTrack.track.thumbnail;
  } else {
    albumDisplay = '/images/no-image.png';
  }

  const favoriteDisplay = favorite ? (
    <FontAwesomeIcon icon={faStarFull} />
  ) : (
    <FontAwesomeIcon icon={faStarEmpty} />
  );

  // display media
  let streamsDisplay;

  if (dataTrack.track.raw.media.length > 0) {
    // display youtube video
    let youtubeDisplay;
    const youtubeURL = dataTrack.track.raw.media.find(
      (media) => media.provider === 'youtube'
    );
    if (youtubeURL) {
      youtubeDisplay = (
        <StyledEmbedContainer>
          <StyledIFrame
            src={`${youtubeURL.url.replace('watch?v=', 'embed/')}`}
            frameBorder='0'
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            title='music video'
          ></StyledIFrame>
        </StyledEmbedContainer>
      );
    }

    // display providers
    let providersDisplay;
    const spotifyURL = dataTrack.track.raw.media.find(
      (media) => media.provider === 'spotify'
    );
    const soundcloudURL = dataTrack.track.raw.media.find(
      (media) => media.provider === 'soundcloud'
    );

    if (spotifyURL || soundcloudURL) {
      // display spotify icon
      let spotifyDisplay;
      if (spotifyURL) {
        spotifyDisplay = (
          <StyledProvider
            href={spotifyURL.url}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FontAwesomeIcon icon={faSpotify} />
          </StyledProvider>
        );
      }

      // display soundcloud icon
      let soundcloudDisplay;
      if (soundcloudURL) {
        soundcloudDisplay = (
          <StyledProvider
            href={soundcloudURL.url}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FontAwesomeIcon icon={faSoundcloud} />
          </StyledProvider>
        );
      }

      providersDisplay = (
        <StyledProviders>
          {spotifyDisplay}
          {soundcloudDisplay}
        </StyledProviders>
      );
    }

    streamsDisplay = (
      <StyledSectionStreams>
        <h3>Streams</h3>
        {youtubeDisplay}
        {providersDisplay}
      </StyledSectionStreams>
    );
  }

  let lyricsClass = '';
  if (learnSection) lyricsClass += ' learn-section';
  if (hideAll) lyricsClass += ' hide';

  const parsedLyrics = (
    <>
      <StyledCheckboxGroup>
        <StyledCheckboxLabel>
          <StyledCheckboxInput
            type='checkbox'
            checked={learnLine}
            onChange={() => setLearnLine((prev) => !prev)}
          />
          <StyledCheckboxCustom></StyledCheckboxCustom>
          <span>Line</span>
        </StyledCheckboxLabel>
        <StyledCheckboxLabel>
          <StyledCheckboxInput
            type='checkbox'
            checked={learnSection}
            onChange={() => setLearnSection((prev) => !prev)}
          />
          <StyledCheckboxCustom></StyledCheckboxCustom>
          <span>Section</span>
        </StyledCheckboxLabel>
        <StyledCheckboxLabel>
          <StyledCheckboxInput
            type='checkbox'
            checked={hideAll}
            onChange={() => setHideAll((prev) => !prev)}
          />
          <StyledCheckboxCustom></StyledCheckboxCustom>
          <span>All</span>
        </StyledCheckboxLabel>
      </StyledCheckboxGroup>
      <StyledButtonReset className='reset' onClick={updateLearnReset}>
        Reset
      </StyledButtonReset>
      <StyledLyricsContent className={lyricsClass}>
        {parseLyrics(dataTrack.lyrics)}
      </StyledLyricsContent>
    </>
  );

  useEffect(() => {
    (async () => {
      try {
        if (favorite) {
          await axios.post('http://localhost:3000/api/user/favoriteItem', {
            token: Cookies.get('token'),
            trackData: {
              trackId: dataTrack.track.id,
              trackTitle: dataTrack.track.titles.featured,
              albumUrl: albumDisplay,
              lines: [],
              linesTotal: 20,
              percentLearned: 0,
            },
          });
        } else {
          await axios.delete('http://localhost:3000/api/user/favoriteItem', {
            params: {
              token: Cookies.get('token'),
              queryId: dataTrack.track.id,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [favorite]);

  return (
    <>
      <Head>
        <title>
          Lyrichee Track | {dataTrack.track.artist.name} -{' '}
          {dataTrack.track.titles.featured}
        </title>
      </Head>
      <main>
        <StyledSectionInfo>
          <div
            className='hero'
            style={{
              backgroundImage: `url(${dataTrack.track.artist.image})`,
            }}
          ></div>
          <div className='details'>
            <img src={albumDisplay} alt='album cover art thumbnail' />
            <div className='details-text'>
              <h2>{dataTrack.track.titles.featured}</h2>
              <p>{dataTrack.track.artist.name}</p>
              <StyledButtonOptions>
                <StyledButtonFavorite
                  favorite={favorite}
                  type='button'
                  onClick={() => setFavorite((prev) => !prev)}
                >
                  {favoriteDisplay}
                </StyledButtonFavorite>
                <Link href={`/artist/${dataTrack.track.artist.id}`}>
                  <a>
                    <StyledButton className='artist'>View Artist</StyledButton>
                  </a>
                </Link>
              </StyledButtonOptions>
            </div>
          </div>
        </StyledSectionInfo>
        {streamsDisplay}
        <StyledSectionLyrics>
          <h3>Lyrics</h3>
          {parsedLyrics}
        </StyledSectionLyrics>
      </main>
    </>
  );
};
