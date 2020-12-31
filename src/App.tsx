import * as React from 'react';
import PageHeader from './components/PageHeader/PageHeader';
import './App.scss';

const App = () => {

  return (
    <div className="page-container">
      <PageHeader />
      <div className="result-list">
        Results
      </div>
      <div className="nomination-list">
        Nominations
      </div>
    </div>
  );
}

export default App;
