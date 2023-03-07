import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Button, Carousel } from '../../ui';
import { getAllCities, getAllSights } from '../../../redux';
import './CityPage.css';

export const CityPage = () => {
  const dispatch = useDispatch();
  const { cityId } = useParams();
  const city = useSelector((state) => state.city.list).filter(
    (city) => city._id === cityId
  )[0];
  const sights = useSelector((state) => state.sight.list).filter(
    (sight) => sight.city === cityId
  );

  useEffect(() => {
    dispatch(getAllCities());
    dispatch(getAllSights());
  }, [dispatch]);
  console.log(city, sights);

  return (
    <div className="city-page-container">
      <h1 className="city-page-header">Explore {city?.name}</h1>
      <Carousel tiles={sights} route="sight" />
      <Link to="new-sight">
        <Button title="Add new sight" secondary />
      </Link>
    </div>
  );
};
