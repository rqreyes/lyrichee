import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TrackList from './TrackList';

const Artist = () => {
  const [artist, setArtist] = useState({});
  const [artistTracks, setArtistTracks] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/artist/${id}`)
      .then((res) => {
        console.log('res: ', res);
        setArtist(res.data.artist);
        setArtistTracks(res.data.tracks);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <section>
      <img src={artist.thumbnail} alt='profile' width='200px' height='200px' />
      <h2>{artist.name}</h2>
      <TrackList tracks={artistTracks} />
    </section>
  );
};

export default Artist;
