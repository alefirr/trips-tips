import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Button } from '../../ui';
import './Header.css';

export const Header = () => {
  return (
    <div className="header-container">
      <NavLink to="/" href="/" className="name-logo-container">
        <img
          src="logo.jpg"
          alt=""
          width="70px"
          height="70px"
          className="logo"
        />
        <h1 id="name-header">Trips&Tips</h1>
      </NavLink>
      <Search />
      <div className="buttons-header-container">
        <NavLink to="new-sight" href="new-sight">
          <Button title="Add Sight" />
        </NavLink>
        <NavLink to="login" href="secondary">
          <Button title="Log in" secondary />
        </NavLink>
      </div>
    </div>
  );
};
