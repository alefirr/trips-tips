import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';

import { Carousel } from '../../components/Carousel';
import { getAllCountries } from '../../redux/slices/countrySlice';
import './MainPage.css';

export const MainPage = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.country.list);

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  return (
    <div className="main-page-container">
      <h1 className="main-page-title">Start Your Journey Now</h1>
      <Carousel tiles={countries} route="country" />
      <Link to="new-country">
        <Button title="Add new country" secondary />
      </Link>
    </div>
  );
};
