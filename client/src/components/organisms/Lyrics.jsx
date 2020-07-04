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
  const { id } = useParams();
  let lyricsDisplay;

  // parse lyrics string into HTML
  const parseLyrics = (lyrics) => {
    return lyrics.split(/\n\n/).map((section) => (
      <div>
        {section.split(/\n/).map((line) => (
          <p>{line}</p>
        ))}
      </div>
    ));
  };

  // display loading or track information
  if (Object.keys(trackData).length === 0 || trackData.lyrics === '') {
    lyricsDisplay = <Loading />;
  } else {
    // display media
    let mediaDisplay;

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

      mediaDisplay = (
        <section className='media'>
          {youtubeDisplay}
          {providersDisplay}
        </section>
      );
    }

    const parsedLyrics = parseLyrics(trackData.lyrics);

    lyricsDisplay = (
      <Fragment>
        <Header />
        <main className='lyrics'>
          <h2>
            {trackData.track.artist.name} - {trackData.track.titles.featured}
          </h2>
          {mediaDisplay}
          <section className='lyrics-content'>{parsedLyrics}</section>
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
