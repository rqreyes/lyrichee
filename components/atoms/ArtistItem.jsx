import Link from 'next/link';

const ArtistItem = ({ artist }) => {
  return (
    <li>
      <div className='item-content'>
        <img src={artist.thumbnail} alt='artist thumbnail' />
        <p>
          <strong>{artist.name}</strong>
        </p>
      </div>
      <div className='button-group'>
        <Link href={`/artist/${artist.id}`} passHref>
          <a>
            <button type='button'>View Artist</button>
          </a>
        </Link>
      </div>
    </li>
  );
};

export default ArtistItem;
