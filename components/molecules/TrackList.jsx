import TrackItem from '../atoms/TrackItem';

const TrackList = ({ tracks }) => {
  const trackItemDisplay = tracks.map((track) => (
    <TrackItem key={track.id} track={track} />
  ));

  return (
    <section className='search-items track-list left-half'>
      <h3>Tracks</h3>
      <ul>{trackItemDisplay}</ul>
    </section>
  );
};

export default TrackList;
