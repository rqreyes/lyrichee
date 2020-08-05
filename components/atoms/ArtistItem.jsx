import Link from 'next/link';
import fallbackSrc from '../../utils/fallbackSrc';
import { StyledButtonText } from '../styles/Styles';

const ArtistItem = ({ artist }) => {
  return (
    <li>
      <div className='item-content'>
        <img
          src={artist.thumbnail}
          onError={fallbackSrc}
          alt='artist thumbnail'
        />
        <div className='item-text'>
          <p>
            <strong>{artist.name}</strong>
          </p>
        </div>
      </div>
      <div className='button-group'>
        <Link href='/artist/[id]' as={`/artist/${artist.id}`} passHref>
          <a>
            <StyledButtonText type='button'>View Artist</StyledButtonText>
          </a>
        </Link>
      </div>
    </li>
  );
};

export default ArtistItem;
