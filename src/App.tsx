import * as React from 'react';
import { useState } from 'react';
import PageHeader from './components/PageHeader/PageHeader';
import MovieList from './components/MovieList/MovieList'
import './App.scss';

const App = () => {
  const [results, setResults] = useState<Array<MovieType>>([
    { title: 'Win', year: 2020, posterURL: 'https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/black-panther-web.jpg'},
    { title: 'Win2', year: 2021, posterURL: 'https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/black-panther-web.jpg'},
  ]);

  const [nominations, setNominations] = useState<Array<MovieType>>([
  ]);

  const isEquals = (movie1: MovieType, movie2: MovieType): boolean => {
    return movie1.title === movie2.title && movie1.year === movie2.year && movie1.posterURL === movie2.posterURL;
  }

  const addNomination = (movie: MovieType): void => {
    if (nominations.length >= 5) {
      console.log('Your nomination list is full.');
      return;
    } else if (isNominated(movie)) {
      console.log('The given movie is already nominated.');
      return; 
    }
    setNominations([...nominations, movie]);
  } 

  const removeNomination = (movie: MovieType): void => {
    if (!nominations.includes(movie)) {
      console.log('The given movie is not in the nomination list');
      return;
    }
    setNominations(nominations.filter(item => !isEquals(item, movie)));
  }

  const isNominated = (movie: MovieType): boolean => {
    for (let i = 0; i < nominations.length; i++) {
      if (isEquals(nominations[i], movie)) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className="components-container">
      <PageHeader />
      <MovieList
        isNominated={isNominated}
        nominate={addNomination}
        removeNomination={removeNomination}
        listName="Results"
        itemList={results}
      />
      <MovieList
        isNominated={isNominated}
        nominate={addNomination}
        removeNomination={removeNomination}
        listName="Nominations"
        showElementsNumber
        itemList={nominations}
      />
    </div>
  );
}

export default App;
