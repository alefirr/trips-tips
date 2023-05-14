import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getAllCities,
  getAllCountries,
  getAllSights,
  removeCity,
  removeCountry,
  removeSight,
} from '../../../redux';
import { Button } from '../Button';
import './Tile.css';

const REMOVE_DISPATCHERS = {
  country: removeCountry,
  city: removeCity,
  sight: removeSight,
};

const GET_ALL_DISPATCHERS = {
  country: getAllCountries,
  city: getAllCities,
  sight: getAllSights,
};

export const Tile = ({ tile, route }) => {
  const path = `${route}/${tile.id}`;

  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteButtonClick = async (e) => {
    await dispatch(REMOVE_DISPATCHERS[route](tile.id));
    dispatch(GET_ALL_DISPATCHERS[route]());
  };

  return (
    <div
      className="tile-container"
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={path}>
        <div className="tile">
          <img src={tile.img} alt="" className="img-tile" />
          <h3 className="h3-tile">{tile.name}</h3>
        </div>
      </Link>
      {isHovered && (
        <div className="tile-button-container">
          <Link to={`edit-${path}`}>
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
      )}
    </div>
  );
};
