import React, { useState, Fragment } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Search from './components/organisms/Search';
import Spinner from './components/atoms/Spinner';
import TrackList from './components/organisms/TrackList';
import ArtistList from './components/organisms/ArtistList';
import Artist from './components/organisms/Artist';
import Lyrics from './components/organisms/Lyrics';
import NotFound from './components/organisms/NotFound';
import './styles/styles.scss';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);

  const searchResultsDisplay = isLoading ? (
    <Spinner />
  ) : tracks.length === 0 ? null : (
    <Fragment>
      <h2>Search Results</h2>
      <TrackList tracks={tracks} />
      <ArtistList artists={artists} />
    </Fragment>
  );

  return (
    <div className='App'>
      <BrowserRouter>
        <header>
          <Link to='/'>
            <h1>Lyrichee</h1>
          </Link>
          <Search
            setIsLoading={setIsLoading}
            setTracks={setTracks}
            setArtists={setArtists}
          />
        </header>
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
      </BrowserRouter>
    </div>
  );
}

export default App;
