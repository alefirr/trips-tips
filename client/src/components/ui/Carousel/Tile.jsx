import React from 'react';
import { Link } from 'react-router-dom';
import './Tile.css';

export const Tile = ({ tile, route }) => {
  const path = `${route}/${tile._id}`;

  return (
    <Link to={path}>
      <div className="tile">
        <img src={tile.img} alt="" className="img-tile" />
        <h3 className="h3-tile">{tile.name}</h3>
      </div>
    </Link>
  );
};
