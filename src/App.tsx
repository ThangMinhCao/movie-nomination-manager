import * as React from 'react';
import { useState } from 'react';
import PageHeader from './components/PageHeader/PageHeader';
import MovieList from './components/MovieList/MovieList';
import './App.scss';

const App = () => {
  const [results, setResults] = useState<Array<MovieType>>([]);

  return (
    <div className="components-container">
      <PageHeader />
      <MovieList itemList={results} />
      <MovieList showElementsNumber itemList={results} />
    </div>
  );
}

export default App;
