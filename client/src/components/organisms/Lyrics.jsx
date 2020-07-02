import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../atoms/Spinner';
import Header from './Header';

const Lyrics = () => {
  const [trackData, setTrackData] = useState({
    track: {},
    lyrics: '',
  });
  const { id } = useParams();
  let lyricsDisplay;

  if (Object.keys(trackData).length === 0 || trackData.lyrics === '') {
    lyricsDisplay = <Spinner />;
  } else {
    let videoDisplay;
    const videoURL = trackData.track.raw.media.find(
      (media) => media.provider === 'youtube'
    );

    if (videoURL) {
      videoDisplay = (
        <iframe
          width='560'
          height='315'
          src={`${videoURL.url.replace('watch?v=', 'embed/')}`}
          frameBorder='0'
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          title='music video'
        ></iframe>
      );
    }

    lyricsDisplay = (
      <Fragment>
        <Header />
        <section>
          <h2>{trackData.track.titles.full}</h2>
          {videoDisplay}
          <pre>{trackData.lyrics}</pre>
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
