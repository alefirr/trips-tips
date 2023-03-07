import React, { useState } from 'react';
import { Button } from '../Button';
import { Tile } from './Tile';
import './Carousel.css';

export const Carousel = ({ tiles, entityRoute }) => {
  const [rightCounter, setRightCounter] = useState(3);
  const [leftCounter, setLeftCounter] = useState(0);

  if (!tiles?.length) {
    return (
      <p className="no-data-text">
        <p>No data to display :(</p>
        <p>Press the button below to add something!</p>
      </p>
    );
  }

  const handleRightButtonClick = () => {
    if (rightCounter < tiles.length - 1 && rightCounter >= 3) {
      setRightCounter((prev) => ++prev);
      setLeftCounter((prev) => ++prev);
    } else {
      setRightCounter(3);
      setLeftCounter(0);
    }
  };

  const handleLeftButtonClick = () => {
    if (
      leftCounter <= tiles.length - 4 &&
      leftCounter >= 0 &&
      rightCounter >= 4
    ) {
      setLeftCounter((prev) => --prev);
      setRightCounter((prev) => --prev);
    } else {
      setRightCounter(tiles.length - 1);
      setLeftCounter(tiles.length - 4);
    }
  };

  return (
    <div className="slider">
      <Button
        title="<"
        secondary
        onClick={handleLeftButtonClick}
        width="50px"
      />
      {tiles.map(
        (tile, index) =>
          index >= leftCounter &&
          index <= rightCounter && (
            <Tile tile={tile} route={entityRoute} key={tile._id} />
          )
      )}
      <Button
        title=">"
        secondary
        onClick={handleRightButtonClick}
        width="50px"
      />
    </div>
  );
};
