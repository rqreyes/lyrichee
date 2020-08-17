import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faExclamationTriangle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { StyledDivFormMessage, StyledP } from '../styles/Styles';

const StyledPFormMessage = styled(StyledP)`
  padding: 0 10px;
  margin: 0;
`;

// display message in forms
const FormMessage = ({ formMessage, setFormMessage }) => {
  const successIconDisplay = formMessage.success
    ? faCheck
    : faExclamationTriangle;

  return (
    <StyledDivFormMessage
      success={formMessage.success}
      onClick={() => setFormMessage({})}
    >
      <FontAwesomeIcon icon={successIconDisplay} />
      <StyledPFormMessage>{formMessage.message}</StyledPFormMessage>
      <FontAwesomeIcon icon={faTimes} />
    </StyledDivFormMessage>
  );
};

export default FormMessage;
