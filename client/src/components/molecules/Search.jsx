import React, { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = ({ focus }) => {
  const [search, setSearch] = useState('');
  const [searchSubmit, setSearchSubmit] = useState('');
  const [redirect, setRedirect] = useState(false);
  const searchRef = useRef(null);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setRedirect((prev) => !prev);
    setSearchSubmit(search);
    setSearch('');
  };

  useEffect(() => {
    if (focus) searchRef.current.focus();
  }, [focus]);

  return (
    <div className='search'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={search}
          onChange={(evt) => setSearch(evt.target.value)}
          required
          ref={searchRef}
        />
        <button type='submit'>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
      <p>
        Finding lyrics just got <strong>sweeter</strong>
      </p>
      {redirect ? <Redirect to={`/search?q=${searchSubmit}`} /> : null}
    </div>
  );
};

export default Search;
