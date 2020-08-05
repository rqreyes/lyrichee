import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { StyledDivError, StyledP } from '../styles/Styles';

const StyledPError = styled(StyledP)`
  padding: 0 10px;
  margin: 0;
`;

// display error in forms
const ErrorForm = ({ error, setError }) => {
  return (
    <StyledDivError onClick={() => setError('')}>
      <FontAwesomeIcon icon={faExclamationTriangle} />
      <StyledPError>{error}</StyledPError>
      <FontAwesomeIcon icon={faTimes} />
    </StyledDivError>
  );
};

export default ErrorForm;
