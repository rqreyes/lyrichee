import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify, faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import LyricsSection from '../../components/molecules/LyricsSection';

const getTrack = async (key, id) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/track?id=${encodeURI(id)}`
  );
  return data;
};

export async function getServerSideProps(context) {
  const data = await getTrack(null, context.params.id);
  return {
    props: {
      data,
    },
  };
}

export default ({ data }) => {
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

  if (data.track.album) {
    albumDisplay = data.track.album.cover_art_url;
  } else if (data.track.thumbnail) {
    albumDisplay = data.track.thumbnail;
  } else {
    albumDisplay = '/images/no-image.png';
  }

  // display media
  let streamsDisplay;

  if (data.track.raw.media.length > 0) {
    // display youtube video
    let youtubeDisplay;
    const youtubeURL = data.track.raw.media.find(
      (media) => media.provider === 'youtube'
    );
    if (youtubeURL) {
      youtubeDisplay = (
        <div className='embed-container'>
          <iframe
            src={`${youtubeURL.url.replace('watch?v=', 'embed/')}`}
            frameBorder='0'
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            title='music video'
          ></iframe>
        </div>
      );
    }

    // display providers
    let providersDisplay;
    const spotifyURL = data.track.raw.media.find(
      (media) => media.provider === 'spotify'
    );
    const soundcloudURL = data.track.raw.media.find(
      (media) => media.provider === 'soundcloud'
    );

    if (spotifyURL || soundcloudURL) {
      // display spotify icon
      let spotifyDisplay;
      if (spotifyURL) {
        spotifyDisplay = (
          <a href={spotifyURL.url} target='_blank' rel='noopener noreferrer'>
            <FontAwesomeIcon icon={faSpotify} />
          </a>
        );
      }

      // display soundcloud icon
      let soundcloudDisplay;
      if (soundcloudURL) {
        soundcloudDisplay = (
          <a href={soundcloudURL.url} target='_blank' rel='noopener noreferrer'>
            <FontAwesomeIcon icon={faSoundcloud} />
          </a>
        );
      }

      providersDisplay = (
        <div className='providers'>
          {spotifyDisplay}
          {soundcloudDisplay}
        </div>
      );
    }

    streamsDisplay = (
      <section className='streams'>
        <h3>Streams</h3>
        {youtubeDisplay}
        {providersDisplay}
      </section>
    );
  }

  let lyricsClass = 'lyrics-content';
  if (learnSection) lyricsClass += ' learn-section';
  if (hideAll) lyricsClass += ' hide';

  const parsedLyrics = (
    <>
      <div className='checkbox-group'>
        <label className='checkbox-label'>
          <input
            type='checkbox'
            checked={learnLine}
            onChange={() => setLearnLine((prev) => !prev)}
          />
          <div className='checkbox-custom'></div>
          <span>Line</span>
        </label>
        <label className='checkbox-label'>
          <input
            type='checkbox'
            checked={learnSection}
            onChange={() => setLearnSection((prev) => !prev)}
          />
          <div className='checkbox-custom'></div>
          <span>Section</span>
        </label>
        <label className='checkbox-label'>
          <input
            type='checkbox'
            checked={hideAll}
            onChange={() => setHideAll((prev) => !prev)}
          />
          <div className='checkbox-custom'></div>
          <span>All</span>
        </label>
      </div>
      <button className='btn-info' onClick={updateLearnReset}>
        Reset
      </button>
      <div className={lyricsClass}>{parseLyrics(data.lyrics)}</div>
    </>
  );

  return (
    <>
      <Head>
        <title>
          Lyrichee Track | {data.track.artist.name} -{' '}
          {data.track.titles.featured}
        </title>
      </Head>
      <main className='lyrics'>
        <section className='info'>
          <div
            className='hero'
            style={{
              backgroundImage: `url(${data.track.artist.image})`,
            }}
          ></div>
          <div className='details'>
            <img src={albumDisplay} alt='album cover art thumbnail' />
            <div className='details-text'>
              <h2>{data.track.titles.featured}</h2>
              <p>{data.track.artist.name}</p>
              <Link href={`/artist/${data.track.artist.id}`}>
                <a>
                  <button className='btn-info'>View Artist</button>
                </a>
              </Link>
            </div>
          </div>
        </section>
        {streamsDisplay}
        <section className='lyrics-container'>
          <h3>Lyrics</h3>
          {parsedLyrics}
        </section>
      </main>
    </>
  );
};
