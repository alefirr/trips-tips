import React from 'react';
import { NavLink } from 'react-router-dom';
import './Button.css';

export const Button = ({ title, to, href, id }) => {
  return (
    <NavLink to={to} href={href} className="button-header" id={id}>
      {title}
    </NavLink>
  );
};
