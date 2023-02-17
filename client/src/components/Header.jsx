import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search } from './Search';
import './Header.css';
import { Button } from './Button';

export const Header = () => {
  return (
    <div className="header-container">
      <NavLink to="/" href="/" className="name-logo-container">
        <img src="logo.jpg" alt="" width="70px" className="logo" />
        <h1 id="name-header">Trips&Tips</h1>
      </NavLink>
      <Search />
      <div className="buttons-header-container">
        <Button
          title="Add Sight"
          to="new-sight"
          href="new-sight"
          id="addsight-button"
        />
        <Button title="Log in" to="login" href="login" id="login-button" />
      </div>
    </div>
  );
};
