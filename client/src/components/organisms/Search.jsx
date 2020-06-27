import React, { useState, Fragment } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Search = ({ setIsLoading, setTracks }) => {
  const [search, setSearch] = useState('');
  const [searchSubmit, setSearchSubmit] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsLoading((prev) => !prev);
    setRedirect((prev) => !prev);

    axios
      .get(`/search?q=${search}`)
      .then((res) => {
        setIsLoading((prev) => !prev);
        setTracks(res.data);
        setRedirect((prev) => !prev);
      })
      .catch((err) => console.log(err));

    setSearchSubmit(search);
    setSearch('');
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={search}
          onChange={(evt) => setSearch(evt.target.value)}
        />
        <button type='submit'>Search Lyrics</button>
      </form>
      {redirect ? <Redirect to={`/search?q=${searchSubmit}`} /> : null}
    </Fragment>
  );
};

export default Search;
