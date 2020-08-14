import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
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
  StyledPForm,
} from '../../components/styles/Styles';
import Header from '../../components/organisms/Header';
import Logo from '../../components/molecules/Logo';
import ErrorForm from '../../components/atoms/ErrorForm';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const errorDisplay = error ? (
    <ErrorForm error={error} setError={setError} />
  ) : null;

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const { data } = await axios.post('/api/user/register', {
        email,
        password,
        passwordConfirm,
      });

      Cookies.set('token', data.token, { expires: 1 });
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
          <StyledMainFormLabel isPopulated={email}>
            <span>Email</span>
            <FontAwesomeIcon icon={faUser} />
            <StyledInputMainForm
              type='email'
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              required
            />
          </StyledMainFormLabel>
          <StyledMainFormLabel isPopulated={password}>
            <span>Password</span>
            <FontAwesomeIcon icon={faLock} />
            <StyledInputMainForm
              type='password'
              value={password}
              minLength={10}
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
              minLength={10}
              onChange={(evt) => setPasswordConfirm(evt.target.value)}
              required
            />
          </StyledMainFormLabel>
          <StyledButtonText type='submit'>Register</StyledButtonText>
        </form>
        {errorDisplay}
        <StyledPForm>
          Already have an account?{' '}
          <Link href='/signin'>
            <a>
              <strong>Sign in</strong>
            </a>
          </Link>
        </StyledPForm>
      </StyledMainFormContainer>
    </>
  );
};
