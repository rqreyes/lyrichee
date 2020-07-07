import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../atoms/Loading';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify, faSoundcloud } from '@fortawesome/free-brands-svg-icons';

const Lyrics = () => {
  const [trackData, setTrackData] = useState({
    track: {},
    lyrics: '',
  });
  const [hideLyrics, setHideLyrics] = useState(false);
  const { id } = useParams();
  let lyricsDisplay;

  // parse lyrics string into HTML
  const parseLyrics = (lyrics) => {
    return lyrics.split(/\n\n/).map((section, ind) => (
      <div key={`section-${ind}`}>
        {section.split(/\n/).map((line, ind) => (
          <p key={`line-${ind}`}>{line}</p>
        ))}
      </div>
    ));
  };

  // display loading or track information
  if (Object.keys(trackData).length === 0 || trackData.lyrics === '') {
    lyricsDisplay = <Loading />;
  } else {
    // display media
    let streamsDisplay;

    if (trackData.track.raw.media.length > 0) {
      // display youtube video
      let youtubeDisplay;
      const youtubeURL = trackData.track.raw.media.find(
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
      const spotifyURL = trackData.track.raw.media.find(
        (media) => media.provider === 'spotify'
      );
      const soundcloudURL = trackData.track.raw.media.find(
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
            <a
              href={soundcloudURL.url}
              target='_blank'
              rel='noopener noreferrer'
            >
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
        <div className='left-half'>
          <h3>Streams</h3>
          {youtubeDisplay}
          {providersDisplay}
        </div>
      );
    }

    const lyricsClass = hideLyrics ? 'hidden' : '';
    const parsedLyrics = (
      <Fragment>
        <div className='checkbox-group'>
          <label className='checkbox-label'>
            <input
              type='checkbox'
              checked={hideLyrics}
              onChange={() => setHideLyrics((prev) => !prev)}
            />
            <div className='checkbox-custom'></div>
            <span>Hide All</span>
          </label>
        </div>
        <div className={`lyrics-content ${lyricsClass}`}>
          {parseLyrics(trackData.lyrics)}
        </div>
      </Fragment>
    );

    lyricsDisplay = (
      <Fragment>
        <Header />
        <main className='lyrics'>
          <section className='info'>
            <div
              className='thumbnail-container'
              style={{
                backgroundImage: `url(${trackData.track.artist.image})`,
              }}
            >
              <img
                src={trackData.track.album.cover_art_url}
                alt='album cover art thumbnail'
              />
            </div>
            <div className='details'>
              <h2>{trackData.track.titles.featured}</h2>
              <p>{trackData.track.artist.name}</p>
            </div>
          </section>
          <section className='full-container'>
            {streamsDisplay}
            <div className='right-half'>
              <h3>Lyrics</h3>
              {parsedLyrics}
            </div>
          </section>
        </main>
      </Fragment>
    );
  }

  // fetch track information
  useEffect(() => {
    axios
      .get(`/tracks/${id}`)
      .then((res) => {
        setTrackData({ track: res.data.track, lyrics: res.data.lyrics });
      })
      .catch((err) => console.log(err));
  }, [id]);

  return lyricsDisplay;
};

export default Lyrics;
