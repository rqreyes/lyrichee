import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const Search = ({ setTracks }) => {
  const [search, setSearch] = useState('');
  const handleSubmit = (evt) => {
    evt.preventDefault();

    axios
      .get(`/lyrics/${search}`)
      .then((res) => setTracks(res.data))
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
