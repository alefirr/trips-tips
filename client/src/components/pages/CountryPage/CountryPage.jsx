import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Carousel } from '../../components/Carousel';
import { NavLink, useParams } from 'react-router-dom';
import { getAllCities } from '../../redux/slices/citySlice';
import { Button } from '../../components/Button';
import './CountryPage.css';
import { getAllCountries } from '../../redux/slices/countrySlice';

export const CountryPage = () => {
  const dispatch = useDispatch();
  const { countryId } = useParams();
  const country = useSelector(
    (state) =>
      state.country.list.filter((country) => country._id === countryId)[0]
  );
  const cities = useSelector((state) =>
    state.city.list.filter((city) => city.country === countryId)
  );

  useEffect(() => {
    dispatch(getAllCities());
    dispatch(getAllCountries());
  }, [dispatch]);

  return (
    <div className="country-page-container">
      <h1 className="country-page-title">Explore {country.name}</h1>
      <Carousel tiles={cities} route="city" />
      <NavLink to="new-city" href="new-city">
        <Button secondary title="Add new city" />
      </NavLink>
    </div>
  );
};
