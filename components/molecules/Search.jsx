import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import {
  StyledP,
  StyledButtonSearch,
  StyledInputSearch,
} from '../styles/Styles';

const StyledForm = styled.form`
  flex: 1;
  position: relative;

  ${({ home }) =>
    home &&
    `
      max-width: 400px;
      margin: 0 auto 20px;
  `}
`;

const StyledStrong = styled.strong`
  color: ${({ theme }) => theme.colors.red};
`;

const Search = ({ home }) => {
  const [search, setSearch] = useState('');
  const searchRef = useRef(null);
  const router = useRouter();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    router.push(`/search?q=${search}`);
    setSearch('');
  };

  // display slogan
  const sloganDisplay = home ? (
    <StyledP alignCenter>
      Learning lyrics just became more <StyledStrong>appeeling</StyledStrong>
    </StyledP>
  ) : null;

  // focus on input
  useEffect(() => {
    if (home) searchRef.current.focus();
  }, [home]);

  return (
    <>
      <StyledForm home={home} onSubmit={handleSubmit}>
        <StyledInputSearch
          home={home}
          type='text'
          value={search}
          onChange={(evt) => setSearch(evt.target.value)}
          required
          ref={searchRef}
        />
        <StyledButtonSearch home={home} type='submit'>
          <FontAwesomeIcon icon={faSearch} />
        </StyledButtonSearch>
      </StyledForm>
      {sloganDisplay}
    </>
  );
};

export default Search;
