import Headroom from 'react-headroom';
import Logo from '../molecules/Logo';
import Search from '../molecules/Search';
import Menu from '../atoms/Menu';

const Header = ({ landing }) => {
  const headerDisplay = landing ? (
    <header className='landing-header'>
      <Menu />
    </header>
  ) : (
    <Headroom>
      <header>
        <Logo />
        <Search />
        <Menu />
      </header>
    </Headroom>
  );

  return headerDisplay;
};

export default Header;
