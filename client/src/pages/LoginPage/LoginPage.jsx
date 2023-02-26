import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import '../../components/Button/Button.css';
import { Button } from '../../components/Button/Button';

export const LoginPage = () => {
  return (
    <div className="login-page-container">
      <form className="login-form">
        <label className="login-label">
          Username:
          <input type="text" placeholder="Username" className="login-input" />
        </label>

        <label className="login-label">
          Password:
          <input placeholder="Password" className="login-input" />
        </label>

        <div className="">
          <Button title="Log in" secondary />
          <Link to="/register" className="login-link">
            No account? Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};
