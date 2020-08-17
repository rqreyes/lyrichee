import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
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
import FormMessage from '../../components/atoms/FormMessage';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [formMessage, setFormMessage] = useState({});

  const formMessageDisplay = Object.keys(formMessage).length ? (
    <FormMessage formMessage={formMessage} setFormMessage={setFormMessage} />
  ) : null;

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const { data } = await axios.post('/api/user/register', {
        email,
        password,
        passwordConfirm,
      });

      setEmail('');
      setPassword('');
      setPasswordConfirm('');
      setFormMessage(data);
    } catch (err) {
      setFormMessage(err.response.data);
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
        {formMessageDisplay}
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
