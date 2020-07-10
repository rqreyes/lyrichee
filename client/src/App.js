import React from 'react';
import NavContextProvider from './contexts/NavContext';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from './components/organisms/Landing';
import SearchResults from './components/organisms/SearchResults';
import Lyrics from './components/organisms/Lyrics';
import Artist from './components/organisms/Artist';
import Footer from './components/organisms/Footer';
import NotFound from './components/organisms/NotFound';
import './styles/styles.scss';

function App() {
  return (
    <div className='App'>
      <NavContextProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path='/'>
              <Landing />
            </Route>
            <Route exact path='/search'>
              <SearchResults />
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
          <Footer />
        </BrowserRouter>
      </NavContextProvider>
    </div>
  );
}

export default App;
