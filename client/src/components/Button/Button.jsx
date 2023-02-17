import React from 'react';
import { NavLink } from 'react-router-dom';
import './Button.css';

export const Button = ({ title, to, href, secondary }) => {
  return (
    <NavLink
      to={to}
      href={href}
      className={`button-header ${
        secondary ? `secondary-button` : `main-button`
      }`}
    >
      {title}
    </NavLink>
  );
};
