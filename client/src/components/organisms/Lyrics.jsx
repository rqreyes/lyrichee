import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../atoms/Spinner';

const Lyrics = () => {
  const [track, setTrack] = useState({});
  const [lyrics, setLyrics] = useState('');
  const { id } = useParams();

  const lyricsDisplay =
    Object.keys(track) === 0 || lyrics === '' ? (
      <Spinner />
    ) : (
      <Fragment>
        <h2>{track.titles.full}</h2>
        <pre>{lyrics}</pre>
      </Fragment>
    );

  useEffect(() => {
    axios
      .get(`/tracks/lyrics/${id}`)
      .then((res) => {
        console.log(res.data);
        setTrack(res.data.track);
        setLyrics(res.data.lyrics);
      })
      .catch((err) => console.log(err));
  }, []);

  return <section>{lyricsDisplay}</section>;
};

export default Lyrics;
