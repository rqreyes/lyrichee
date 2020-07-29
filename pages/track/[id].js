import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import cookie from 'cookie';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import {
  faStar as faStarFull,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { faSpotify, faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';
import { StyledSectionInfo } from '../../components/organisms/Styles';
import LyricsSection from '../../components/molecules/LyricsSection';

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
    color: ${({ theme }) => theme.colors.green};
    background: none;
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.grey} !important;
    cursor: auto !important;
  }

  svg {
    height: 36px;
  }
`;

const StyledButtonReset = styled.button`
  width: auto;
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

const StyledSectionContent = styled(StyledSection)`
  padding: 30px 40px;
  margin-bottom: 10px;

  /* Medium devices (tablets, 768px and up) */
  @media (min-width: 768px) {
    margin: 0 auto 10px;
  }
`;

const StyledSectionDescription = styled(StyledSectionContent)`
  padding: ${({ description }) =>
    description ? '30px 40px' : '30px 40px 20px'};
`;

const StyledHeaderDescription = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const StyledButtonDescription = styled.button`
  width: 20px;
  height: 20px;
  color: ${({ description, theme }) =>
    description ? theme.colors.greenDark : theme.colors.red};
  padding: 0;
  background: none;
  margin-right: 10px;
  transition: transform 0.6s;

  &:hover {
    color: ${({ theme }) => theme.colors.green};
    background: none;
  }

  &.active {
    transform: rotate(90deg);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const StyledHeadingDescription = styled.h3`
  margin-bottom: 0;
`;

const StyledContentDescription = styled.div`
  overflow: hidden;
  transition: max-height 0.6s;
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
      background: ${({ theme }) => theme.colors.pink};
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

    > .lyrics-section-content {
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
      color: ${({ theme }) => theme.colors.red};
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
  const dataFavoriteItem = context.req.headers.cookie
    ? await getFavoriteItem(
        null,
        context.params.id,
        cookie.parse(context.req.headers.cookie).token
      )
    : {};
  const signedIn = context.req.headers.cookie ? true : false;

  return {
    props: {
      dataTrack,
      dataFavoriteItem,
      signedIn,
    },
  };
}

export default ({ dataTrack, dataFavoriteItem, signedIn }) => {
  const [favorite, setFavorite] = useState(dataFavoriteItem);
  const [description, setDescription] = useState(false);
  const [learnLine, setLearnLine] = useState(
    Object.keys(dataFavoriteItem).length ? true : false
  );
  const [learnSection, setLearnSection] = useState(false);
  const [hideAll, setHideAll] = useState(false);
  const [learnReset, setLearnReset] = useState(false);
  const descriptionRef = useRef();

  const handleFavorite = () => {
    setFavorite((prev) => {
      setLearnSection(false);
      setHideAll(false);
      setLearnReset((prev) => !prev);

      if (Object.keys(prev).length) {
        setLearnLine(false);
        return {};
      } else {
        setLearnLine(true);

        const regex = RegExp('^\\[');
        const lyricsTotal = dataTrack.lyrics
          .split(/\n\n/)
          .map((section) => section.split(/\n/))
          .flat()
          .filter((line) => !regex.test(line)).length;

        return {
          trackId: dataTrack.track.id,
          trackTitle: dataTrack.track.titles.featured,
          artistId: dataTrack.track.artist.id,
          artistName: dataTrack.track.artist.name,
          albumUrl: albumDisplay,
          lyricsLearned: [],
          lyricsTotal,
          percentLearned: 0,
        };
      }
    });
  };

  const updateLearnedLyrics = (add, sectionIdx, lineIdx) => {
    let learnedLyricsCopy = [...favorite.lyricsLearned];

    if (add) {
      if (learnedLyricsCopy[sectionIdx]) {
        const learnedLyricsSectionCopy = learnedLyricsCopy[sectionIdx];

        learnedLyricsSectionCopy.push(lineIdx);
        learnedLyricsSectionCopy.sort((a, b) => a - b);
      } else {
        learnedLyricsCopy[sectionIdx] = [lineIdx];
      }
    } else {
      learnedLyricsCopy[sectionIdx] = learnedLyricsCopy[sectionIdx].filter(
        (line) => line !== lineIdx
      );

      if (learnedLyricsCopy[sectionIdx].length === 0)
        learnedLyricsCopy = learnedLyricsCopy.filter(
          (section) => section.length
        );
    }

    setFavorite({ ...favorite, lyricsLearned: learnedLyricsCopy });
  };

  const handleReset = () => {
    setFavorite({ ...favorite, lyricsLearned: [] });
    setLearnLine(false);
    setLearnSection(false);
    setHideAll(false);
    setLearnReset((prev) => !prev);
  };

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

  // parse lyrics string into HTML
  const parseLyrics = (lyrics) => {
    return lyrics.split(/\n\n/).map((section, idx) => {
      let learnedSection;

      if (Object.keys(favorite).length && favorite.lyricsLearned[idx]) {
        learnedSection = favorite.lyricsLearned[idx];
      } else {
        learnedSection = [];
      }

      return (
        <LyricsSection
          key={`section-${idx}`}
          favorite={favorite}
          learnedSection={learnedSection}
          section={section}
          learnLine={learnLine}
          learnSection={learnSection}
          learnReset={learnReset}
          sectionIdx={idx}
          updateLearnedLyrics={updateLearnedLyrics}
        />
      );
    });
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

  const favoriteDisplay = Object.keys(favorite).length ? (
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
          />
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
      <StyledSectionContent>
        <h3>Streams</h3>
        {youtubeDisplay}
        {providersDisplay}
      </StyledSectionContent>
    );
  }

  let lyricsClass = '';
  if (learnSection) lyricsClass += ' learn-section';
  if (hideAll) lyricsClass += ' hide';

  const descriptionClass = description ? 'active' : '';

  useEffect(() => {
    if (descriptionRef && descriptionRef.current) {
      descriptionRef.current.style.maxHeight = description
        ? `${descriptionRef.current.scrollHeight}px`
        : '0px';
    }
  }, [description, descriptionRef]);

  useEffect(() => {
    (async () => {
      try {
        if (signedIn && Object.keys(favorite).length) {
          await axios.post('http://localhost:3000/api/user/favoriteItem', {
            token: Cookies.get('token'),
            trackData: favorite,
          });
        } else if (signedIn) {
          await axios.delete('http://localhost:3000/api/user/favoriteItem', {
            params: {
              token: Cookies.get('token'),
              queryId: dataTrack.track.id,
            },
          });
        }
      } catch (err) {
        console.log(err);
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
          />
          <div className='details-container'>
            <img src={albumDisplay} alt='album cover art thumbnail' />
            <div className='details-content'>
              <div className='details-favorite'>
                <div className='details-text'>
                  <h2>{dataTrack.track.titles.featured}</h2>
                  <p>{dataTrack.track.artist.name}</p>
                </div>
                <StyledButtonFavorite
                  favorite={Object.keys(favorite).length}
                  type='button'
                  onClick={handleFavorite}
                  disabled={!signedIn}
                >
                  {favoriteDisplay}
                </StyledButtonFavorite>
              </div>
              <Link href={`/artist/${dataTrack.track.artist.id}`}>
                <a>
                  <StyledButton className='artist'>View Artist</StyledButton>
                </a>
              </Link>
            </div>
          </div>
        </StyledSectionInfo>
        {streamsDisplay}
        <StyledSectionDescription description={description}>
          <StyledHeaderDescription>
            <StyledButtonDescription
              description={description}
              className={`accordion-icon ${descriptionClass}`}
              type='button'
              onClick={() => setDescription((prev) => !prev)}
            >
              <FontAwesomeIcon icon={faChevronCircleRight} />
            </StyledButtonDescription>
            <StyledHeadingDescription>Description</StyledHeadingDescription>
          </StyledHeaderDescription>
          <StyledContentDescription ref={descriptionRef}>
            {parseDOM(dataTrack.track.raw.description.dom.children)}
          </StyledContentDescription>
        </StyledSectionDescription>
        <StyledSectionLyrics>
          <h3>Lyrics</h3>
          <StyledCheckboxGroup>
            <StyledCheckboxLabel>
              <StyledCheckboxInput
                type='checkbox'
                checked={learnLine}
                onChange={() => setLearnLine((prev) => !prev)}
              />
              <StyledCheckboxCustom />
              <span>Line</span>
            </StyledCheckboxLabel>
            <StyledCheckboxLabel>
              <StyledCheckboxInput
                type='checkbox'
                checked={learnSection}
                onChange={() => setLearnSection((prev) => !prev)}
              />
              <StyledCheckboxCustom />
              <span>Section</span>
            </StyledCheckboxLabel>
            <StyledCheckboxLabel>
              <StyledCheckboxInput
                type='checkbox'
                checked={hideAll}
                onChange={() => setHideAll((prev) => !prev)}
              />
              <StyledCheckboxCustom />
              <span>All</span>
            </StyledCheckboxLabel>
          </StyledCheckboxGroup>
          <StyledButtonReset type='button' onClick={() => handleReset()}>
            Reset
          </StyledButtonReset>
          <StyledLyricsContent className={lyricsClass}>
            {parseLyrics(dataTrack.lyrics)}
          </StyledLyricsContent>
        </StyledSectionLyrics>
      </main>
    </>
  );
};
