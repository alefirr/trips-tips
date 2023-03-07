import React from 'react';
import { Header } from '../Header/Header';
import { NavBar } from '../NavBar/NavBar';
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
