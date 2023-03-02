import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Carousel } from '../../components/Carousel';
import { getAllCountries } from '../../redux/slices/countrySlice';

export const MainPage = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.country.list);

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);
  console.log(countries);

  return <Carousel tiles={countries} />;
};
