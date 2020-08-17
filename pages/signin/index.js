import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import {
  StyledButtonText,
  StyledMainFormContainer,
  StyledMainFormLabel,
  StyledInputMainForm,
  StyledPForm,
} from '../../components/styles/Styles';
import Header from '../../components/organisms/Header';
import Logo from '../../components/molecules/Logo';
import FormMessage from '../../components/atoms/FormMessage';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formMessage, setFormMessage] = useState({});
  const router = useRouter();
  let formMessageDisplay;

  formMessageDisplay = Object.keys(formMessage).length ? (
    <FormMessage formMessage={formMessage} setFormMessage={setFormMessage} />
  ) : null;

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const { data } = await axios.post('/api/user/signin', {
        email,
        password,
      });

      Cookies.set('token', data.token, { expires: 1 });
      router.push('/favorites');
    } catch (err) {
      setFormMessage(err.response.data);
    }
  };

  useEffect(() => {
    if (router.query.token) {
      (async () => {
        try {
          const { data } = await axios.get(
            `/api/user/email?token=${router.query.token}`
          );

          setFormMessage(data);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  });

  return (
    <>
      <Head>
        <title>Lyrichee Sign In</title>
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
              onChange={(evt) => setPassword(evt.target.value)}
              required
            />
          </StyledMainFormLabel>
          <StyledButtonText type='submit'>Sign In</StyledButtonText>
        </form>
        {formMessageDisplay}
        <StyledPForm>
          Don't have an account?{' '}
          <Link href='/register'>
            <a>
              <strong>Create one</strong>
            </a>
          </Link>
        </StyledPForm>
      </StyledMainFormContainer>
    </>
  );
};
