import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faUserLock } from '@fortawesome/free-solid-svg-icons';
import {
  StyledMainFormContainer,
  StyledMainFormLabel,
  StyledMainFormInput,
} from '../../components/organisms/Styles';
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
      const { data } = await axios.post('http://localhost:3000/api/register', {
        username,
        password,
        passwordConfirm,
      });

      Cookies.set('token', data.token);
      router.push('/favorites');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <Head>
        <title>Lyrichee Register</title>
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
          <StyledMainFormLabel isPopulated={passwordConfirm}>
            <span>Confirm Password</span>
            <FontAwesomeIcon icon={faUserLock} />
            <StyledMainFormInput
              type='password'
              value={passwordConfirm}
              onChange={(evt) => setPasswordConfirm(evt.target.value)}
              required
            />
          </StyledMainFormLabel>
          <button type='submit'>Register</button>
        </form>
        {errorDisplay}
      </StyledMainFormContainer>
    </>
  );
};
