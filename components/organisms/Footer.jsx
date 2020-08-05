import styled from 'styled-components';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background: #fff;
  border-top: ${({ theme }) => theme.border};
  position: absolute;
  bottom: 0;
  z-index: 2;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <p>
        Made by{' '}
        <a href='http://rqreyes.com/' target='_blank' rel='noopener noreferrer'>
          <strong>Randy Reyes</strong>
        </a>
      </p>
    </StyledFooter>
  );
};

export default Footer;
