import React from 'react';
import { Header } from '../Header/Header';
import { NavBar } from '../NavBar/NavBar';
import { Body } from '../Body/Body';
import './Layout.css';

export const Layout = ({ children }) => {
  return (
    <div className="container">
      <Header />
      <NavBar />
      <Body children={children} />
    </div>
  );
};
