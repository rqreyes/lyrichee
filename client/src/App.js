import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/organisms/Header';
import SearchResults from './components/organisms/SearchResults';
import Lyrics from './components/organisms/Lyrics';
import Artist from './components/organisms/Artist';
import Footer from './components/organisms/Footer';
import NotFound from './components/organisms/NotFound';
import './styles/styles.scss';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <header>
          <Header />
        </header>
        <main>
          <Switch>
            <Route exact path='/'></Route>
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
        </main>
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
