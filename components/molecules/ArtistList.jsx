import ArtistItem from '../atoms/ArtistItem';
import { StyledSectionList } from '../organisms/Styles';

const ArtistList = ({ artists }) => {
  const artistItemDisplay = artists.map((artist) => (
    <ArtistItem key={artist.id} artist={artist} />
  ));

  return (
    <StyledSectionList className='half-right'>
      <h3>Artists</h3>
      <ul>{artistItemDisplay}</ul>
    </StyledSectionList>
  );
};

export default ArtistList;
