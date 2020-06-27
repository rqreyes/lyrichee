import React, { useState } from 'react';
import './App.css';
import Search from './components/organisms/Search';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Spinner from './components/atoms/Spinner';
import TrackList from './components/organisms/TrackList';
import Lyrics from './components/organisms/Lyrics';

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
      <h1>Lyrichee</h1>
      <Search setIsLoading={setIsLoading} setTracks={setTracks} />
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            {trackListDisplay}
          </Route>
          <Route exact path='/lyrics/:id'>
            <Lyrics />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
