import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faUserLock } from '@fortawesome/free-solid-svg-icons';
import {
  StyledButtonText,
  StyledMainFormContainer,
  StyledMainFormLabel,
  StyledInputMainForm,
} from '../../components/styles/Styles';
import Header from '../../components/organisms/Header';
import Logo from '../../components/molecules/Logo';
import Error from '../../components/atoms/Error';

export default () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const errorDisplay = error ? (
    <Error error={error} setError={setError} />
  ) : null;

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const { data } = await axios.post('/api/user/register', {
        username,
        password,
        passwordConfirm,
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
        <title>Lyrichee Register</title>
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
          <StyledMainFormLabel isPopulated={passwordConfirm}>
            <span>Confirm Password</span>
            <FontAwesomeIcon icon={faUserLock} />
            <StyledInputMainForm
              type='password'
              value={passwordConfirm}
              onChange={(evt) => setPasswordConfirm(evt.target.value)}
              required
            />
          </StyledMainFormLabel>
          <StyledButtonText type='submit'>Register</StyledButtonText>
        </form>
        {errorDisplay}
      </StyledMainFormContainer>
    </>
  );
};
