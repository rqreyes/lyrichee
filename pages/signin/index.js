import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import {
  StyledMainFormContainer,
  StyledMainFormLabel,
  StyledMainFormInput,
} from '../../components/organisms/Styles';
import Logo from '../../components/molecules/Logo';
import Error from '../../components/atoms/Error';

const StyledP = styled.p`
  text-align: center;
  margin-top: 10px;
`;

export default () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const errorDisplay = error ? (
    <Error error={error} setError={setError} />
  ) : null;

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/user/signin',
        {
          username,
          password,
        }
      );

      Cookies.set('token', data.token);
      router.push('/favorites');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <>
      <Head>
        <title>Lyrichee Sign In</title>
      </Head>
      <StyledMainFormContainer>
        <Logo text />
        <form onSubmit={handleSubmit}>
          <StyledMainFormLabel isPopulated={username}>
            <span>Username</span>
            <FontAwesomeIcon icon={faUser} />
            <StyledMainFormInput
              type='text'
              value={username}
              onChange={(evt) => setUsername(evt.target.value)}
              required
            />
          </StyledMainFormLabel>
          <StyledMainFormLabel isPopulated={password}>
            <span>Password</span>
            <FontAwesomeIcon icon={faLock} />
            <StyledMainFormInput
              type='password'
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
              required
            />
          </StyledMainFormLabel>
          <button type='submit'>Sign In</button>
        </form>
        {errorDisplay}
        <StyledP>
          Don't have an account?{' '}
          <Link href='/register'>
            <a>
              <strong>Create one</strong>
            </a>
          </Link>
        </StyledP>
      </StyledMainFormContainer>
    </>
  );
};
