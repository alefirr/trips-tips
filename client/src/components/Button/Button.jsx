import React from 'react';
import './Button.css';

export const Button = ({ title, secondary, type, onClick }) => {
  return (
    <button
      type={type}
      className={`button ${secondary ? `secondary` : `main`} `}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
