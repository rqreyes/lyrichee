import styled from 'styled-components';

export const StyledSectionInfo = styled.section`
  height: 360px;
  text-align: center;
  background: #fff;
  border-bottom: ${({ theme }) => theme.border};
  margin-bottom: 10px;
  position: relative;

  .hero {
    width: 100%;
    height: 200px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  img {
    display: block;
    width: 180px;
    height: 180px;
    object-fit: cover;
    border: 6px solid #fff;
    border-radius: 10px;
    margin: 0 auto;
  }

  .details {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 10px;
    margin: auto;
    position: absolute;
    right: 0;
    bottom: 20px;
    left: 0;
  }

  .details-text {
    padding: 0 10px;
  }

  h2 {
    margin-bottom: 0;
  }

  /* Medium devices (tablets, 768px and up) */
  @media (min-width: 768px) {
    height: 350px;
    text-align: left;
    border-radius: 0;
    border: 0;
    border-bottom: 1px solid #eee;

    .details {
      flex-direction: row;
      justify-content: center;
      align-items: flex-end;
    }

    .details-text {
      padding: 0;
      margin-bottom: 6px;
    }

    img {
      margin: 0 10px 0 0;
    }

    h2 {
      text-align: left;
    }
  }
`;

export const StyledContainerFull = styled.div`
  max-width: 950px;

  .half-left,
  .half-right {
    background: #fff;
    padding: 20px 10px;
    border-top: ${({ theme }) => theme.border};
    border-bottom: ${({ theme }) => theme.border};
  }

  .half-left {
    margin-bottom: 10px;
  }

  /* Medium devices (tablets, 768px and up) */
  @media (min-width: 768px) {
    display: flex;
    align-items: flex-start;
    margin: auto;

    .half-left,
    .half-right {
      flex: 1;
      margin: 0 10px;
    }
  }

  /* Large devices (desktops, 992px and up) */
  @media (min-width: 992px) {
    /* width: 950px; */
    .half-left {
      margin: 0 10px 0 0;
    }

    .half-right {
      margin: 0 0 0 10px;
    }
  }
`;

export const StyledSectionList = styled.section`
  li {
    display: flex;
    justify-content: space-between;
    background: #fff;
    border: ${({ theme }) => theme.border};
    border-radius: 10px;
    box-shadow: ${({ theme }) => theme.boxShadow};
    padding: 10px;
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .item-content {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }

  img {
    width: 80px;
    height: 80px;
    border-radius: 4px;
    margin-right: 10px;
  }

  p {
    margin: 0;
  }

  .button-group {
    flex-direction: column;

    a {
      &:nth-child(2) {
        margin-top: 10px;
      }
    }
  }
`;

export const StyledMainCenter = styled.main`
  max-width: 420px;
  padding: 0 10px;
  margin: 20vh auto 0;
`;

export const StyledMainFormContainer = styled(StyledMainCenter)`
  background: #fff;
  padding: 40px;
  border: ${({ theme }) => theme.border};
  border-radius: 10px;

  img {
    margin: 0 auto 20px;
  }
`;

export const StyledMainFormLabel = styled.label`
  position: relative;

  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.red};
    position: absolute;
    bottom: 0;
    left: 0;
  }

  ${({ isPopulated }) =>
    isPopulated &&
    `
      svg {
        color: #5ca943;
      }
  `}
`;

export const StyledMainFormInput = styled.input`
  padding: 10px 10px 10px 30px;
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  margin-bottom: 20px;
`;
