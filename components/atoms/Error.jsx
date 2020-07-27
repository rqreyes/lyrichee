import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const StyledError = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgb(235, 90, 70);
  background: rgba(235, 90, 70, 0.1);
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const StyledP = styled.p`
  padding: 0 10px;
  margin: 0;
`;

// display error in forms
const Error = ({ error, setError }) => {
  return (
    <StyledError onClick={() => setError('')}>
      <FontAwesomeIcon icon={faExclamationTriangle} />
      <StyledP>{error}</StyledP>
      <FontAwesomeIcon icon={faTimes} />
    </StyledError>
  );
};

export default Error;
