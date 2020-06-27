import React, { useState } from 'react';
import './App.css';
import Search from './components/organisms/Search';

function App() {
  const [tracks, setTracks] = useState([]);

  return (
    <div className='App'>
      <h1>Lyrichee</h1>
      <Search setTracks={setTracks} />
      <ul>
        {tracks.length === 0
          ? null
          : tracks.map((track) => <li>{track.titles.full}</li>)}
      </ul>
    </div>
  );
}

export default App;
