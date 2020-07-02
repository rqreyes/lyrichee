import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import TrackList from '../molecules/TrackList';
import ArtistList from '../molecules/ArtistList';

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState({
    tracks: [],
    artists: [],
  });

  const location = useLocation();
  const searchQuery = queryString.parse(location.search).q;

  useEffect(() => {
    if (
      searchQuery &&
      searchResults.tracks.length === 0 &&
      searchResults.artists.length === 0
    ) {
      const fetchSearch = (searchQuery) => {
        axios
          .get(`/search?q=${searchQuery}`)
          .then((res) => {
            const tracks = res.data;
            const uniqueArtists = {};

            res.data.forEach(
              (track) => (uniqueArtists[track.artist.name] = track.artist.id)
            );
            const artists = Object.keys(uniqueArtists).map((artist) => ({
              id: uniqueArtists[artist],
              name: artist,
            }));

            setSearchResults({ tracks, artists });
          })
          .catch((err) => console.log(err));
      };

      fetchSearch(searchQuery);
    }
  }, [
    searchQuery,
    searchResults.tracks.length,
    searchResults.artists.length,
    setSearchResults,
  ]);

  return (
    <section className='search-results'>
      <div className='search-query'>
        <p>"{searchQuery}"</p>
        <h2>Search Results</h2>
      </div>
      <div className='list-container'>
        <TrackList tracks={searchResults.tracks} />
        <ArtistList artists={searchResults.artists} />
      </div>
    </section>
  );
};

export default SearchResults;
