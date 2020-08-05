import Link from 'next/link';
import fallbackSrc from '../../utils/fallbackSrc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { StyledButtonText } from '../styles/Styles';

const StyledLiFavorite = styled.li`
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

const StyledPArtist = styled.p`
  && {
    margin-bottom: 6px;
  }
`;

const StyledPLinesLearned = styled.p`
  display: flex;

  > * {
    margin-right: 6px;

    &:last-child {
      margin-right: 0;
    }
  }

  svg {
    width: 20px;
    color: ${({ theme }) => theme.colors.greenDark};
  }
`;

const FavoriteItem = ({ favoriteItem }) => (
  <StyledLiFavorite
    percentLearned={favoriteItem.percentLearned}
    className='favorite-item'
  >
    <div className='item-content'>
      <img src={favoriteItem.albumUrl} onError={fallbackSrc} alt='album art' />
      <div className='item-text'>
        <p>
          <strong>{favoriteItem.trackTitle}</strong>
        </p>
        <StyledPArtist>{favoriteItem.artistName}</StyledPArtist>
        <StyledPLinesLearned>
          <FontAwesomeIcon icon={faChartLine} />
          <strong>
            {favoriteItem.lyricsLinesLearned} / {favoriteItem.lyricsLinesTotal}
          </strong>
          <span>lines learned</span>
        </StyledPLinesLearned>
      </div>
    </div>
    <div className='button-group'>
      <Link href='/track/[id]' as={`/track/${favoriteItem.trackId}`} passHref>
        <a>
          <StyledButtonText type='button'>View Track</StyledButtonText>
        </a>
      </Link>
      <Link
        href='/artist/[id]'
        as={`/artist/${favoriteItem.artistId}`}
        passHref
      >
        <a>
          <StyledButtonText type='button'>View Artist</StyledButtonText>
        </a>
      </Link>
    </div>
  </StyledLiFavorite>
);

export default FavoriteItem;
