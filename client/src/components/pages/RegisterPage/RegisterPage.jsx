import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import './RegisterPage.css';

export const RegisterPage = () => {
  return (
    <div className="register-page-container">
      <form className="register-form">
        <label className="register-label">
          Username:
          <input
            type="text"
            placeholder="Username"
            className="register-input"
          />
        </label>

        <label className="register-label">
          Password:
          <input placeholder="Password" className="register-input" />
        </label>

        <div className="">
          <Button title="Sign in" secondary />
          <Link to="/login" className="register-link">
            Have an account? Log in
          </Link>
        </div>
      </form>
    </div>
  );
};
