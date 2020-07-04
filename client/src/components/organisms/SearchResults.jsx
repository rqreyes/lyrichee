import React, { useState, useEffect, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import Loading from '../atoms/Loading';
import Header from './Header';
import TrackList from '../molecules/TrackList';
import ArtistList from '../molecules/ArtistList';

const initSearchResults = {
  tracks: [],
  artists: [],
};

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState(initSearchResults);
  const location = useLocation();
  const searchQuery = queryString.parse(location.search).q;

  // display loading or search results
  const searchResultsDisplay =
    searchResults.tracks.length === 0 || searchResults.artists.length === 0 ? (
      <Loading />
    ) : (
      <Fragment>
        <Header />
        <main className='search-results'>
          <section className='search-query'>
            <h2>Search Results</h2>
            <p>"{searchQuery}"</p>
          </section>
          <section className='list-container'>
            <TrackList tracks={searchResults.tracks} />
            <ArtistList artists={searchResults.artists} />
          </section>
        </main>
      </Fragment>
    );

  // fetch search results
  useEffect(() => {
    if (searchQuery) {
      const fetchSearch = (searchQuery) => {
        axios
          .get(`/search?q=${searchQuery}`)
          .then((res) => {
            const tracks = res.data;
            const artists = res.data.reduce((artistsArr, track) => {
              if (
                artistsArr.findIndex(
                  (artist) => artist.name === track.artist.name
                ) < 0
              )
                artistsArr.push(track.artist);

              return artistsArr;
            }, []);

            setSearchResults({ tracks, artists });
          })
          .catch((err) => console.log(err));
      };

      fetchSearch(searchQuery);
    }
  }, [searchQuery, setSearchResults]);

  return searchResultsDisplay;
};

export default SearchResults;
