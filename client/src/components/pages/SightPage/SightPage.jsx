import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  getAllCities,
  getAllCountries,
  getAllSights,
  getAllTypes,
  removeSight,
} from '../../../redux';
import { Button } from '../../ui/Button';
import './SightPage.css';

export const SightPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { sightId } = useParams();
  sightId = +sightId;

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
    () => sights.find((sight) => sight.id === sightId),
    [sightId, sights]
  );

  const typesMap = useMemo(
    () => types.reduce((acc, type) => ({ ...acc, [type.id]: type }), {}),
    [types]
  );

  const city = useMemo(
    () => cities.find((city) => city.id === sight?.city_id),
    [cities, sight?.city_id]
  );
  const country = useMemo(
    () => countries.find((country) => country.id === city?.country_id),
    [city?.country_id, countries]
  );

  useEffect(() => {
    dispatch(getAllSights());
  }, [dispatch]);

  const handleDeleteButtonClick = async () => {
    dispatch(removeSight(sightId));
    navigate('/');
  };

  return (
    <div className="sight-page-container">
      <div className="sight-page-text-container">
        <h1 className="sight-page-header">{sight?.name}</h1>
        <h4 className="sight-page-info">
          Types: {types.map((typeId) => typesMap[typeId].name).join(', ')}
        </h4>
        <h4 className="sight-page-info"> City: {city?.name}</h4>
        <h4 className="sight-page-info"> Country: {country?.name}</h4>
        <p className="sight-page-text">{sight?.text}</p>
        <div className="sight-page-buttons-container">
          <Link to={`edit-sight/${sightId}`}>
            <Button
              title={<span className="material-symbols-outlined">edit</span>}
              secondary
            />
          </Link>

          <Button
            title={<span className="material-symbols-outlined">delete</span>}
            onClick={handleDeleteButtonClick}
            secondary
          />
        </div>
      </div>
    </div>
  );
};
