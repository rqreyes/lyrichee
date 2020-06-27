import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Search from './components/organisms/Search';
import Spinner from './components/atoms/Spinner';
import TrackList from './components/organisms/TrackList';
import Lyrics from './components/organisms/Lyrics';
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
      <h1>Lyrichee</h1>
      <BrowserRouter>
        <Search setIsLoading={setIsLoading} setTracks={setTracks} />
        <Switch>
          <Route exact path='/search'>
            {trackListDisplay}
          </Route>
          <Route exact path='/tracks/:id'>
            <Lyrics />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
