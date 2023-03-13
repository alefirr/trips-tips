import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getAllCities,
  getAllCountries,
  getAllSights,
  getAllTypes,
} from '../../../redux';
import './SightPage.css';

export const SightPage = () => {
  const dispatch = useDispatch();

  const { sightId } = useParams();

  const countries = useSelector((state) => state.country.list);
  const types = useSelector((state) => state.type.list);
  const cities = useSelector((state) => state.city.list);
  const sights = useSelector((state) => state.sight.list);

  useEffect(() => {
    if (!countries.length) {
      dispatch(getAllCountries());
    }
    if (!types.length) {
      dispatch(getAllTypes());
    }
    if (!cities.length) {
      dispatch(getAllCities());
    }
    if (!sights.length) {
      dispatch(getAllSights());
    }
  }, [cities.length, countries.length, sights.length, dispatch, types.length]);

  const sight = useMemo(
    () => sights.find((sight) => sight._id === sightId),
    [sightId, sights]
  );
  const type = useMemo(
    () => types.find((type) => type._id === sight?.type),
    [sight?.type, types]
  );
  const city = useMemo(
    () => cities.find((city) => city._id === sight?.city),
    [cities, sight?.city]
  );
  const country = useMemo(
    () => countries.find((country) => country._id === city?.country),
    [city?.country, countries]
  );

  useEffect(() => {
    dispatch(getAllSights());
  }, [dispatch]);

  return (
    <div className="sight-page-container">
      <h1 className="sight-page-header">Enjoy {sight?.name}</h1>
      <h4 className="sight-page-type"> Type: {type?.name}</h4>
      <h4 className="sight-page-city"> City: {city?.name}</h4>
      <h4 className="sight-page-country"> Country: {country?.name}</h4>
      <p className="sight-page-text">{sight?.text}</p>
    </div>
  );
};
