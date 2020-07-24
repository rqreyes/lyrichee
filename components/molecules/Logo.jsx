import Link from 'next/link';

const Logo = ({ landing }) => {
  const logoSrc = landing ? '/images/logo-font.png' : '/images/logo-icon.png';

  return (
    <div className='logo'>
      <Link href='/'>
        <a>
          <h1>Lyrichee</h1>
          <img src={logoSrc} alt='logo' />
        </a>
      </Link>
    </div>
  );
};

export default Logo;
