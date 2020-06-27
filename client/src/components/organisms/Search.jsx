import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const Search = ({ setIsLoading, setTracks }) => {
  const [search, setSearch] = useState('');
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsLoading((prev) => !prev);

    axios
      .get(`/tracks/${search}`)
      .then((res) => {
        setIsLoading((prev) => !prev);
        setTracks(res.data);
      })
      .catch((err) => console.log(err));

    setSearch('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={search}
        onChange={(evt) => setSearch(evt.target.value)}
      />
    </form>
  );
};

export default Search;
