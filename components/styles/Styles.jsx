import styled from 'styled-components';

// headings
export const StyledH1 = styled.h1`
  text-indent: -9999px;
  visibility: hidden;
  position: absolute;
`;

export const StyledH2 = styled.h2`
  text-align: center;
  margin: 0;

  ${({ notFound }) =>
    notFound &&
    `
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'MuseoModerno', cursive;
      font-size: 72px;
      margin-bottom: 10px;
  `}
`;

export const StyledH3 = styled.h3`
  text-align: center;
  margin: ${({ noBottom }) => (noBottom ? '0' : '0 0 10px')};
`;

export const StyledH4 = styled.h4`
  text-align: center;
  margin: 0 0 10px;
`;

// p
export const StyledP = styled.p`
  text-align: ${({ alignCenter }) => (alignCenter ? 'center' : 'left')};
`;

export const StyledPForm = styled(StyledP)`
  text-align: center;
  margin-top: 10px;
`;

// list
export const StyledUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

// button
export const StyledButton = styled.button`
  background: none;
  padding: 0;
  border: 0;
  cursor: pointer;
`;

export const StyledButtonText = styled(StyledButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ widthAuto }) => (widthAuto ? 'auto' : '100%')};
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  color: #fff;
  background: ${({ theme }) => theme.colors.red};
  padding: 10px 20px;
  border-radius: 4px;
  margin: ${({ marginAuto, marginBottom }) => {
    if (marginAuto) return '0 auto';
    else if (marginBottom) return '0 auto 10px';
    else return '0';
  }};
  transition: background-color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.greenDark};
  }
`;

export const StyledButtonSearch = styled(StyledButton)`
  width: 30px;
  height: 30px;
  color: #fff;
  background: ${({ theme }) => theme.colors.red};
  padding: 0;
  border-radius: 50%;
  position: absolute;
  top: 5px;
  right: 5px;
  transition: background-color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.greenDark};
  }

  svg {
    height: 50%;
  }

  ${({ home }) =>
    home &&
    `
      width: 40px;
      height: 40px;
  `}
`;

export const StyledButtonNav = styled(StyledButton)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.brown};
  padding: 10px 20px;
  white-space: nowrap;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.greenDark};
  }

  svg {
    width: 20px !important;
    margin-right: 10px;
  }

  /* Medium devices (tablets, 768px and up) */
  @media (min-width: 768px) {
    flex-direction: column;
    width: 70px;
    font-size: 16px;
    padding: 10px 0;
    border-radius: 4px;

    svg {
      height: 20px;
      margin: 0;
    }
  }
`;

export const StyledButtonFavorite = styled(StyledButton)`
  color: ${({ isFavorite, theme }) =>
    isFavorite ? theme.colors.greenDark : theme.colors.red};
  padding: 0;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.green};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.grey} !important;
    cursor: auto !important;
  }

  svg {
    height: 36px;
  }
`;

// label
export const StyledMainFormLabel = styled.label`
  position: relative;

  svg {
    width: 20px;
    height: 20px;
    color: ${({ isPopulated, theme }) =>
      isPopulated ? theme.colors.greenDark : theme.colors.red};
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

// input
export const StyledInput = styled.input`
  width: 100%;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.brown};
`;

export const StyledInputSearch = styled(StyledInput)`
  padding: 10px 40px 10px 20px;
  border: ${({ theme }) => theme.border};
  border-radius: 100px;
  -webkit-appearance: none;
  box-shadow: ${({ theme }) => theme.boxShadow};

  ${({ home }) =>
    home &&
    `
      font-size: 24px;
  `}
`;

export const StyledInputMainForm = styled(StyledInput)`
  padding: 10px 10px 10px 30px;
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  margin-bottom: 20px;
`;

// main
export const StyledMainCenter = styled.main`
  padding: 0 20px;
  margin: 16vh auto 0;

  /* Medium devices (tablets, 768px and up) */
  @media (min-width: 768px) {
    max-width: 440px;
    margin-top: 20vh;
  }
`;

export const StyledMainFormContainer = styled(StyledMainCenter)`
  background: #fff;
  padding: 40px;
  border-top: ${({ theme }) => theme.border};
  border-bottom: ${({ theme }) => theme.border};
  margin-top: 0;

  img {
    margin: 0 auto 20px;
  }

  /* Medium devices (tablets, 768px and up) */
  @media (min-width: 768px) {
    border: ${({ theme }) => theme.border};
    border-radius: 10px;
    margin-top: 16vh;
  }
`;

// section
export const StyledSection = styled.section`
  background: #fff;
`;

export const StyledSectionHeader = styled(StyledSection)`
  text-align: center;
  padding: 20px 10px;
  border: 0;
  border-bottom: ${({ theme }) => theme.border};
  border-radius: 0;
  margin-bottom: 10px;
`;

export const StyledSectionHero = styled(StyledSection)`
  height: 360px;
  text-align: center;
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

  .details-container {
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

  .details-image-container {
    width: 180px;
    height: 180px;
    background: white;
    border: 6px solid #fff;
    border-radius: 10px;
    margin: 0 auto;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .details-content {
    padding: 0 10px;
  }

  .details-favorite {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

  .details-text {
    margin-right: 10px;
  }

  /* Medium devices (tablets, 768px and up) */
  @media (min-width: 768px) {
    height: 350px;
    text-align: left;
    border-radius: 0;
    border: 0;
    border-bottom: 1px solid #eee;

    .details-container {
      flex-direction: row;
      justify-content: center;
      align-items: flex-end;
    }

    .details-image-container {
      margin: 0 10px 0 0;
    }

    .details-content {
      padding: 0;
      margin-bottom: 6px;
    }

    h2 {
      text-align: left;
    }
  }
`;

export const StyledSectionContent = styled(StyledSection)`
  padding: ${({ padding }) => (padding ? '20px' : '20px 10px')};
  border-top: ${({ theme }) => theme.border};
  border-bottom: ${({ theme }) => theme.border};
`;

export const StyledSectionList = styled(StyledSectionContent)`
  li {
    display: flex;
    justify-content: space-between;
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
    object-fit: cover;
    border-radius: 4px;
    margin-right: 10px;
  }

  p {
    margin: 0;
  }

  .button-group {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;

    a {
      &:nth-child(2) {
        margin-top: 10px;
      }
    }
  }
`;

// div
export const StyledColumnOne = styled.div`
  /* Medium devices (tablets, 768px and up) */
  @media (min-width: 768px) {
    max-width: 600px;
    margin: 0 auto;
  }
`;

export const StyledColumnTwo = styled.div`
  max-width: 1200px;

  > * {
    &:nth-child(1) {
      margin-bottom: 10px;
    }
  }

  /* Medium devices (tablets, 768px and up) */
  @media (min-width: 768px) {
    display: flex;
    align-items: flex-start;
    margin: auto;

    > * {
      flex: 1;

      &:nth-child(1) {
        margin: 0 5px 0 10px;
      }

      &:nth-child(2) {
        margin: 0 10px 0 5px;
      }
    }
  }
`;

export const StyledDivFormMessage = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ success }) =>
    success ? 'rgb(40, 167, 69)' : 'rgb(220, 53, 69)'};
  background: ${({ success }) =>
    success ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)'};
  padding: 10px 20px;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;

  svg {
    flex: 0 0 auto;
    width: 20px;
    height: 20px;
  }
`;
