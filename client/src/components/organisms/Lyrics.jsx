import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../atoms/Spinner';

const Lyrics = () => {
  const [track, setTrack] = useState({});
  const [lyrics, setLyrics] = useState('');
  const { id } = useParams();
  let lyricsDisplay;

  if (Object.keys(track) === 0 || lyrics === '') {
    lyricsDisplay = <Spinner />;
  } else {
    const videoURL = track.raw.media
      .find((media) => media.provider === 'youtube')
      .url.replace('watch?v=', 'embed/');

    lyricsDisplay = (
      <Fragment>
        <h2>{track.titles.full}</h2>
        <iframe
          width='560'
          height='315'
          src={`${videoURL}`}
          frameBorder='0'
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          title='music video'
        ></iframe>
        <pre>{lyrics}</pre>
      </Fragment>
    );
  }

  useEffect(() => {
    axios
      .get(`/tracks/lyrics/${id}`)
      .then((res) => {
        setTrack(res.data.track);
        setLyrics(res.data.lyrics);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return <section>{lyricsDisplay}</section>;
};

export default Lyrics;
