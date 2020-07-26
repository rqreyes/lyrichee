import TrackItem from '../atoms/TrackItem';
import { StyledSectionList } from '../organisms/Styles';

const TrackList = ({ tracks }) => {
  const trackItemDisplay = tracks.map((track) => (
    <TrackItem key={track.id} track={track} />
  ));

  return (
    <StyledSectionList className='half-left'>
      <h3>Tracks</h3>
      <ul>{trackItemDisplay}</ul>
    </StyledSectionList>
  );
};

export default TrackList;
