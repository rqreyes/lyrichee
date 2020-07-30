import ArtistItem from '../atoms/ArtistItem';
import { StyledH3, StyledUl, StyledSectionList } from '../styles/Styles';

const ArtistList = ({ artists }) => {
  const artistListDisplay = artists.map((artist) => (
    <ArtistItem key={artist.id} artist={artist} />
  ));

  return (
    <StyledSectionList>
      <StyledH3>Artists</StyledH3>
      <StyledUl>{artistListDisplay}</StyledUl>
    </StyledSectionList>
  );
};

export default ArtistList;
