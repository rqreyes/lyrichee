import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../atoms/Spinner';
import TrackList from '../molecules/TrackList';

const Artist = () => {
  const [artist, setArtist] = useState({});
  const [artistTracks, setArtistTracks] = useState([]);
  const { id } = useParams();
  let artistDisplay;

  if (Object.keys(artist) === 0 || artistTracks.length === 0) {
    artistDisplay = <Spinner />;
  } else {
    artistDisplay = (
      <Fragment>
        <img
          src={artist.thumbnail}
          alt='profile'
          width='200px'
          height='200px'
        />
        <h2>{artist.name}</h2>
        <TrackList tracks={artistTracks} />
      </Fragment>
    );
  }

  useEffect(() => {
    axios
      .get(`/artist/${id}`)
      .then((res) => {
        setArtist(res.data.artist);
        setArtistTracks(res.data.tracks);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return <section>{artistDisplay}</section>;
};

export default Artist;
