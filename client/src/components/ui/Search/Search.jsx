import React from 'react';
import './Search.css';

export const Search = () => {
  return (
    <div className="search-container">
      <input type="text" placeholder="Search" />
      <button type="submit" className="search-button">
        <span className="material-symbols-outlined">search</span>
      </button>
    </div>
  );
};
