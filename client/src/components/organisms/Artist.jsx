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

  // parse the description DOM into HTML
  const parseDOM = (DOM) => {
    if (DOM === undefined) return;

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

  // display loading or artist profile
  if (
    Object.keys(artistProfile.artist).length === 0 ||
    artistProfile.tracks.length === 0
  ) {
    artistProfileDisplay = <Loading />;
  } else {
    const alternateNames = artistProfile.artist.raw.alternate_names.length ? (
      <p>AKA: {artistProfile.artist.raw.alternate_names.join(', ')}</p>
    ) : (
      ''
    );
    const parsedDOM = parseDOM(
      artistProfile.artist.raw.description.dom.children
    );

    artistProfileDisplay = (
      <Fragment>
        <Header />
        <main className='artist'>
          <section className='info'>
            <div
              className='hero'
              style={{
                backgroundImage: `url(${artistProfile.artist.image})`,
              }}
            ></div>
            <div className='details'>
              <img
                src={artistProfile.artist.thumbnail}
                alt='artist thumbnail'
              />
              <div className='details-text'>
                <h2>{artistProfile.artist.name}</h2>
                {alternateNames}
              </div>
            </div>
          </section>
          <div className='container full-container'>
            <TrackList tracks={artistProfile.tracks} />
            <section className='right-half'>
              <h3>About</h3>
              <div>{parsedDOM}</div>
            </section>
          </div>
        </main>
      </Fragment>
    );
  }

  // fetch artist information
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
