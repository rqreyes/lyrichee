import TrackItem from '../atoms/TrackItem';
import { StyledH3, StyledUl, StyledSectionList } from '../styles/Styles';

const TrackList = ({ tracks }) => {
  const trackListDisplay = tracks.map((track) => (
    <TrackItem key={track.id} track={track} />
  ));

  return (
    <StyledSectionList>
      <StyledH3>Tracks</StyledH3>
      <StyledUl>{trackListDisplay}</StyledUl>
    </StyledSectionList>
  );
};

export default TrackList;
