import React from 'react';
import './Button.css';

export const Button = ({ title, secondary, type, onClick, width }) => {
  return (
    <button
      type={type}
      className={`button ${secondary ? `secondary` : `main`} `}
      style={{ width: width }}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
