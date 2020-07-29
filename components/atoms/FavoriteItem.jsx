import Link from 'next/link';
import styled from 'styled-components';

const StyledLi = styled.li`
  overflow: hidden;
  position: relative;

  &.favorite-item {
    padding: 10px 10px 20px;
  }

  &::before {
    content: '';
    width: 100%;
    height: 10px;
    background: ${({ theme }) => theme.colors.grey};
    position: absolute;
    bottom: 0;
    left: 0;
  }

  &::after {
    content: '';
    width: ${({ percentLearned }) => percentLearned * 100 + '%'};
    height: 10px;
    background: ${({ theme }) => theme.colors.greenDark};
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

const FavoriteItem = ({ favoriteItem }) => {
  console.log('favoriteItem.percentLearned: ', favoriteItem.percentLearned);
  return (
    <StyledLi
      percentLearned={favoriteItem.percentLearned}
      className='favorite-item'
    >
      <div className='item-content'>
        <img src={favoriteItem.albumUrl} alt='album art' />
        <div>
          <p>
            <strong>{favoriteItem.trackTitle}</strong>
          </p>
          <p>{favoriteItem.artistName}</p>
        </div>
      </div>
      <div className='button-group'>
        <Link href={`/track/${favoriteItem.trackId}`}>
          <a>
            <button type='button'>View Track</button>
          </a>
        </Link>
        <Link href={`/artist/${favoriteItem.artistId}`}>
          <a>
            <button type='button'>View Artist</button>
          </a>
        </Link>
      </div>
    </StyledLi>
  );
};

export default FavoriteItem;
