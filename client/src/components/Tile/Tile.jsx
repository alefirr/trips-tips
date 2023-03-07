import React from 'react';
import { Link } from 'react-router-dom';
import './Tile.css';

export const Tile = ({ tile, route }) => {
  return (
    <Link to={`${route}/${tile._id}`}>
      <div className="tile">
        <img src={tile.img} alt="" className="img-tile" />
        <h3 className="h3-tile">{tile.name}</h3>
      </div>
    </Link>
  );
};
