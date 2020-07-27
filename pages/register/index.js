import { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faUserLock } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { StyledMainCenter } from '../../components/organisms/Styles';
import Logo from '../../components/molecules/Logo';
import Error from '../../components/atoms/Error';

const StyledRegister = styled(StyledMainCenter)`
  background: #fff;
  padding: 40px;
  border: ${({ theme }) => theme.border};
  border-radius: 10px;

  img {
    margin: 0 auto 20px;
  }
`;

const StyledLabel = styled.label`
  position: relative;

  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.red};
    position: absolute;
    bottom: 0;
    left: 0;
  }

  ${({ isPopulated }) =>
    isPopulated &&
    `
    svg {
      color: #5ca943;
    }
  `}
`;

const StyledInput = styled.input`
  padding: 10px 10px 10px 30px;
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  margin-bottom: 20px;
`;

export default () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');

  const errorDisplay = error ? (
    <Error error={error} setError={setError} />
  ) : null;

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:3000/api/register', {
        username,
        password,
        passwordConfirm,
      });

      console.log('data', data);
      localStorage.setItem('auth-token', data.token);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <Head>
        <title>Lyrichee Register</title>
      </Head>
      <StyledRegister>
        <Logo text />
        <form onSubmit={handleSubmit}>
          <StyledLabel isPopulated={username}>
            <span>Username</span>
            <FontAwesomeIcon icon={faUser} />
            <StyledInput
              type='text'
              value={username}
              onChange={(evt) => setUsername(evt.target.value)}
              required
            />
          </StyledLabel>
          <StyledLabel isPopulated={password}>
            <span>Password</span>
            <FontAwesomeIcon icon={faLock} />
            <StyledInput
              type='password'
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
              required
            />
          </StyledLabel>
          <StyledLabel isPopulated={passwordConfirm}>
            <span>Confirm Password</span>
            <FontAwesomeIcon icon={faUserLock} />
            <StyledInput
              type='password'
              value={passwordConfirm}
              onChange={(evt) => setPasswordConfirm(evt.target.value)}
              required
            />
          </StyledLabel>
          <button type='submit'>Register</button>
        </form>
        {errorDisplay}
      </StyledRegister>
    </>
  );
};
