import React, { Fragment } from 'react';
import { Header } from './Header';
import { NavBar } from './NavBar';

export const Layout = ({ children }) => {
  return (
    <Fragment>
      <div className="container">
        <Header />
        <NavBar />
        {children}
      </div>
    </Fragment>
  );
};
