import * as React from 'react';
import './PageHeader.scss';

const PageHeader = () => {
  return (
    <div className="page-header">
      <div className="search-bar">
        <input className="text-field" placeholder="Search..." />
      </div>
      <div className="page-title">
        The Shoppies
      </div>
    </div>
  )
}

export default PageHeader;