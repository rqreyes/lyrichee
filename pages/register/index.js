import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faUserLock } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { StyledMainCenter } from '../../components/organisms/Styles';
import Logo from '../../components/molecules/Logo';

const StyledRegister = styled(StyledMainCenter)`
  background: #fff;
  padding: 40px;
  border: ${({ theme }) => theme.border};
  border-radius: 10px;
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

  ${({ isEmpty }) =>
    !isEmpty &&
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
  const [username, setUsername] = useState({ text: '', isEmpty: true });
  const [password, setPassword] = useState({ text: '', isEmpty: true });
  const [passwordConfirm, setPasswordConfirm] = useState({
    text: '',
    isEmpty: true,
  });

  const handleUsername = (evt) => {
    if (evt.target.value === '') setUsername({ text: '', isEmpty: true });
    else setUsername({ text: evt.target.value, isEmpty: false });
  };

  const handlePassword = (evt) => {
    if (evt.target.value === '') setPassword({ text: '', isEmpty: true });
    else setPassword({ text: evt.target.value, isEmpty: false });
  };

  const handlePasswordConfirm = (evt) => {
    if (evt.target.value === '')
      setPasswordConfirm({ text: '', isEmpty: true });
    else setPasswordConfirm({ text: evt.target.value, isEmpty: false });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:3000/api/register', {
        username,
        password,
      });
      console.log('data: ', data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledRegister>
      <Logo landing />
      <form onSubmit={handleSubmit}>
        <StyledLabel isEmpty={username.isEmpty}>
          <span>Username</span>
          <FontAwesomeIcon icon={faUser} />
          <StyledInput
            type='text'
            value={username.text}
            onChange={handleUsername}
            required
          />
        </StyledLabel>
        <StyledLabel isEmpty={password.isEmpty}>
          <span>Password</span>
          <FontAwesomeIcon icon={faLock} />
          <StyledInput
            type='password'
            value={password.text}
            onChange={handlePassword}
            required
          />
        </StyledLabel>
        <StyledLabel isEmpty={passwordConfirm.isEmpty}>
          <span>Confirm Password</span>
          <FontAwesomeIcon icon={faUserLock} />
          <StyledInput
            type='password'
            value={passwordConfirm.text}
            onChange={handlePasswordConfirm}
            required
          />
        </StyledLabel>
        <button type='submit'>Register</button>
      </form>
    </StyledRegister>
  );
};
