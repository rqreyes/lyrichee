import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../atoms/Loading';
import Header from './Header';
import TrackList from '../molecules/TrackList';

const Artist = () => {
  const [artistProfile, setArtistProfile] = useState({
    artist: {},
    tracks: [],
  });
  const { id } = useParams();
  let artistProfileDisplay;

  const parseDOM = (DOM) => {
    return DOM.map((parent, ind) => {
      if (typeof parent === 'string') return parent;

      const Tag = parent.tag;
      const parentAttributes = parent.attributes;
      if (parent.tag === 'a') parentAttributes.target = '_blank';

      return (
        <Tag key={`key-${ind}`} {...parentAttributes}>
          {parseDOM(parent.children)}
        </Tag>
      );
    });
  };

  if (
    Object.keys(artistProfile.artist).length === 0 ||
    artistProfile.tracks.length === 0
  ) {
    artistProfileDisplay = <Loading />;
  } else {
    const parsedDOM = parseDOM(
      artistProfile.artist.raw.description.dom.children
    );
    artistProfileDisplay = (
      <Fragment>
        <Header />
        <section className='search-results'>
          <h2>{artistProfile.artist.name}</h2>
          <img
            className='artist-thumbnail'
            src={artistProfile.artist.thumbnail}
            alt='artist thumbnail'
          />
          {parsedDOM}
          <TrackList tracks={artistProfile.tracks} />
        </section>
      </Fragment>
    );
  }

  useEffect(() => {
    axios
      .get(`/artist/${id}`)
      .then((res) => {
        setArtistProfile({ artist: res.data.artist, tracks: res.data.tracks });
      })
      .catch((err) => console.log(err));
  }, [id]);

  return artistProfileDisplay;
};

export default Artist;
