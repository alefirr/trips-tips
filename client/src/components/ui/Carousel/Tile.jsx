import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import './Tile.css';

export const Tile = ({ tile, route }) => {
  const path = `${route}/${tile._id}`;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={path}>
      <div
        className="tile-container"
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="tile">
          <img src={tile.img} alt="" className="img-tile" />
          <h3 className="h3-tile">{tile.name}</h3>
        </div>
        {isHovered && (
          <div className="tile-button-container">
            <Link to={`edit-${path}`}>
              <Button
                title={<span class="material-symbols-outlined">edit</span>}
                secondary
              />
            </Link>

            <Button
              title={<span class="material-symbols-outlined">delete</span>}
              secondary
            />
          </div>
        )}
      </div>
    </Link>
  );
};
