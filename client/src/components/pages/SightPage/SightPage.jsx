import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllSights, getAllTypes, getAllCities } from '../../../redux';

export const SightPage = () => {
  const dispatch = useDispatch();
  const { sightId } = useParams();
  const sight = useSelector((state) => state.sight.list).filter(
    (sight) => sight._id === sightId
  )[0];
  const type = useSelector((state) => state.type.list).filter(
    (type) => type._id === sight.type
  )[0];
  const city = useSelector((state) => state.city.list).filter(
    (city) => city._id === sight.city
  )[0];
  console.log(sight, type, city);

  useEffect(() => {
    dispatch(getAllSights());
    dispatch(getAllTypes());
    dispatch(getAllCities());
  }, [dispatch]);

  return (
    <div className="sight-page-container">
      <h1 className="sight-page-header">Enjoy {sight?.name}</h1>
      <h4 className="sight-page-type"> Type: {type?.name}</h4>
      <h4 className="sight-page-city"> City: {city?.name}</h4>
      <p className="sight-page-text">{sight.text}</p>
    </div>
  );
};
