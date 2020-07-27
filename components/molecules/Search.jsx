import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const StyledSearch = styled.div`
  flex: 1;
`;

const StyledForm = styled.form`
  position: relative;

  ${({ home }) =>
    home &&
    `
      margin-bottom: 20px;
  `}
`;

const StyledInput = styled.input`
  padding: 10px 40px 10px 20px;
  border: ${({ theme }) => theme.border};
  border-radius: 100px;
  box-shadow: ${({ theme }) => theme.boxShadow};

  ${({ home }) =>
    home &&
    `
      font-size: 24px;
  `}
`;

const StyledButton = styled.button`
  width: 30px;
  height: 30px;
  color: #fff;
  padding: 0;
  border-radius: 50%;
  position: absolute;
  top: 5px;
  right: 5px;

  svg {
    width: 50% !important;
    height: 50%;
    margin-bottom: 2px;
  }

  ${({ home }) =>
    home &&
    `
      width: 40px;
      height: 40px;
  `}
`;

const StyledSlogan = styled.p`
  text-align: center;
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
    <StyledSlogan>
      Learning lyrics just got more <StyledStrong>appeeling</StyledStrong>
    </StyledSlogan>
  ) : null;

  // focus on input
  useEffect(() => {
    if (home) searchRef.current.focus();
  }, [home]);

  return (
    <StyledSearch>
      <StyledForm home={home} onSubmit={handleSubmit}>
        <StyledInput
          home={home}
          type='text'
          value={search}
          onChange={(evt) => setSearch(evt.target.value)}
          required
          ref={searchRef}
        />
        <StyledButton home={home} type='submit'>
          <FontAwesomeIcon icon={faSearch} />
        </StyledButton>
      </StyledForm>
      {sloganDisplay}
    </StyledSearch>
  );
};

export default Search;
