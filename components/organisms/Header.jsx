import Headroom from 'react-headroom';
import styled from 'styled-components';
import Logo from '../molecules/Logo';
import Search from '../molecules/Search';
import Menu from '../atoms/Menu';

const StyledHeadroom = styled(Headroom)`
  width: 100%;

  .headroom {
    background: #fff;
    border-bottom: ${({ theme }) => theme.border};

    &.headroom--pinned {
      box-shadow: ${({ theme }) => theme.boxShadow};
    }
  }
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 950px;
  height: 60px;
  padding: 0 20px;
  margin: auto;

  > * {
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }
  }

  ${({ landing }) =>
    landing &&
    `
      justify-content: flex-end;
  `}
`;

const Header = ({ landing }) => {
  const headerDisplay = landing ? (
    <StyledHeader landing={landing}>
      <Menu landing={landing} />
    </StyledHeader>
  ) : (
    <StyledHeadroom>
      <StyledHeader>
        <Logo />
        <Search />
        <Menu />
      </StyledHeader>
    </StyledHeadroom>
  );

  return headerDisplay;
};

export default Header;
