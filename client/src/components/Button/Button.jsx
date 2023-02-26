import React from 'react';
import './Button.css';

export const Button = ({ title, secondary, type }) => {
  return (
    <button
      type={type}
      className={`button ${secondary ? `secondary` : `main`} `}
    >
      {title}
    </button>
  );
};
