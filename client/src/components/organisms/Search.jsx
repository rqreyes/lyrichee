import React, { useState, Fragment, useRef, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Search = ({ setIsLoading, setTracks, setArtists }) => {
  const [search, setSearch] = useState('');
  const [searchSubmit, setSearchSubmit] = useState('');
  const [redirect, setRedirect] = useState(false);
  const searchRef = useRef(null);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsLoading((prev) => !prev);
    setRedirect((prev) => !prev);

    axios
      .get(`/search?q=${search}`)
      .then((res) => {
        setIsLoading((prev) => !prev);
        setTracks(res.data);

        const uniqueArtists = {};
        res.data.forEach(
          (track) => (uniqueArtists[track.artist.name] = track.artist.id)
        );
        const uniqueArtistsArr = Object.keys(uniqueArtists).map((artist) => ({
          id: uniqueArtists[artist],
          name: artist,
        }));

        setArtists(uniqueArtistsArr);
        setRedirect((prev) => !prev);
      })
      .catch((err) => console.log(err));

    setSearchSubmit(search);
    setSearch('');
  };

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={search}
          onChange={(evt) => setSearch(evt.target.value)}
          required
          ref={searchRef}
        />
        <button type='submit'>Search Lyrics</button>
      </form>
      {redirect ? <Redirect to={`/search?q=${searchSubmit}`} /> : null}
    </Fragment>
  );
};

export default Search;
