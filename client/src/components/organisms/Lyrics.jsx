import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../atoms/Loading';
import Header from './Header';

const Lyrics = () => {
  const [trackData, setTrackData] = useState({
    track: {},
    lyrics: '',
  });
  const { id } = useParams();
  let lyricsDisplay;

  const parseLyrics = (lyrics) => {
    return lyrics.split(/\n\n/).map((section) => (
      <div>
        {section.split(/\n/).map((line) => (
          <p>{line}</p>
        ))}
      </div>
    ));
  };

  if (Object.keys(trackData).length === 0 || trackData.lyrics === '') {
    lyricsDisplay = <Loading />;
  } else {
    let videoDisplay;
    const videoURL = trackData.track.raw.media.find(
      (media) => media.provider === 'youtube'
    );

    if (videoURL) {
      videoDisplay = (
        <div className='embed-container'>
          <iframe
            src={`${videoURL.url.replace('watch?v=', 'embed/')}`}
            frameBorder='0'
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            title='music video'
          ></iframe>
        </div>
      );
    }

    const parsedLyrics = parseLyrics(trackData.lyrics);

    lyricsDisplay = (
      <Fragment>
        <Header />
        <section className='lyrics'>
          <h2>
            {trackData.track.artist.name} - {trackData.track.titles.featured}
          </h2>
          <div className='media'>{videoDisplay}</div>
          <div className='lyrics-content'>{parsedLyrics}</div>
        </section>
      </Fragment>
    );
  }

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
