import React, { useState, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/organisms/Header';
import Spinner from './components/atoms/Spinner';
import TrackList from './components/organisms/TrackList';
import ArtistList from './components/organisms/ArtistList';
import Artist from './components/organisms/Artist';
import Lyrics from './components/organisms/Lyrics';
import Footer from './components/organisms/Footer';
import NotFound from './components/organisms/NotFound';
import './styles/styles.scss';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);

  const searchResultsDisplay = isLoading ? (
    <Spinner />
  ) : tracks.length === 0 ? null : (
    <section className='search-results'>
      <h2>Search Results</h2>
      <div className='track-artist-list'>
        <TrackList tracks={tracks} />
        <ArtistList artists={artists} />
      </div>
    </section>
  );

  return (
    <div className='App'>
      <BrowserRouter>
        <header>
          <Header
            setIsLoading={setIsLoading}
            setTracks={setTracks}
            setArtists={setArtists}
          />
        </header>
        <main>
          <Switch>
            <Route exact path='/'></Route>
            <Route exact path='/search'>
              {searchResultsDisplay}
            </Route>
            <Route exact path='/tracks/:id'>
              <Lyrics />
            </Route>
            <Route exact path='/artist/:id'>
              <Artist />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
