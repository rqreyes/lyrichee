import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Search from './components/organisms/Search';
import Spinner from './components/atoms/Spinner';
import TrackList from './components/organisms/TrackList';
import Artist from './components/organisms/Artist';
import Lyrics from './components/organisms/Lyrics';
import NotFound from './components/organisms/NotFound';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [tracks, setTracks] = useState([]);

  const trackListDisplay = isLoading ? (
    <Spinner />
  ) : tracks.length === 0 ? null : (
    <TrackList tracks={tracks} />
  );

  return (
    <div className='App'>
      <BrowserRouter>
        <Link to='/'>
          <h1>Lyrichee</h1>
        </Link>
        <Search setIsLoading={setIsLoading} setTracks={setTracks} />
        <Switch>
          <Route exact path='/'></Route>
          <Route exact path='/search'>
            {trackListDisplay}
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
