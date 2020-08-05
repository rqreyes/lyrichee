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
  StyledButtonText,
  StyledMainFormContainer,
  StyledMainFormLabel,
  StyledInputMainForm,
} from '../../components/styles/Styles';
import Header from '../../components/organisms/Header';
import Logo from '../../components/molecules/Logo';
import ErrorForm from '../../components/atoms/ErrorForm';

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
    <ErrorForm error={error} setError={setError} />
  ) : null;

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const { data } = await axios.post('/api/user/signin', {
        username,
        password,
      });

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
      <Header />
      <StyledMainFormContainer>
        <Logo text />
        <form onSubmit={handleSubmit}>
          <StyledMainFormLabel isPopulated={username}>
            <span>Username</span>
            <FontAwesomeIcon icon={faUser} />
            <StyledInputMainForm
              type='text'
              value={username}
              onChange={(evt) => setUsername(evt.target.value)}
              required
            />
          </StyledMainFormLabel>
          <StyledMainFormLabel isPopulated={password}>
            <span>Password</span>
            <FontAwesomeIcon icon={faLock} />
            <StyledInputMainForm
              type='password'
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
              required
            />
          </StyledMainFormLabel>
          <StyledButtonText type='submit'>Sign In</StyledButtonText>
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
