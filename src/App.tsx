import * as React from 'react';
import './App.scss';

const App = () => {

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="search-bar">
          <input className="text-field" placeholder="Search..." />
        </div>
        <div className="page-title">
          The Shoppies
        </div>
      </div>
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
