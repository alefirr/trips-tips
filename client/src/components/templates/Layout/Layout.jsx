import React from 'react';
import { Header } from './Header';
import { NavBar } from '../../ui/';
import './Layout.css';

export const Layout = ({ children }) => {
  return (
    <div className="container">
      <Header />
      <NavBar />
      <div className="body-container">{children}</div>
    </div>
  );
};
