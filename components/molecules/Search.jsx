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

  ${({ landing }) =>
    landing &&
    `
      margin-bottom: 20px;
  `}
`;

const StyledInput = styled.input`
  ${({ landing }) =>
    landing &&
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
  }

  ${({ landing }) =>
    landing &&
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

const Search = ({ landing }) => {
  const [search, setSearch] = useState('');
  const searchRef = useRef(null);
  const router = useRouter();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    router.push(`/search?q=${search}`);
    setSearch('');
  };

  // display slogan
  const sloganDisplay = landing ? (
    <StyledSlogan>
      Learning lyrics just got more <StyledStrong>appeeling</StyledStrong>
    </StyledSlogan>
  ) : null;

  // focus on input
  useEffect(() => {
    if (landing) searchRef.current.focus();
  }, [landing]);

  return (
    <StyledSearch>
      <StyledForm landing={landing} onSubmit={handleSubmit}>
        <StyledInput
          landing={landing}
          type='text'
          value={search}
          onChange={(evt) => setSearch(evt.target.value)}
          required
          ref={searchRef}
        />
        <StyledButton landing={landing} type='submit'>
          <FontAwesomeIcon icon={faSearch} />
        </StyledButton>
      </StyledForm>
      {sloganDisplay}
    </StyledSearch>
  );
};

export default Search;
