import React, { useState } from 'react';
import { Button } from '../Button';
import './Carousel.css';

export const Carousel = ({ tiles }) => {
  const [rightCounter, setRightCounter] = useState(4);
  const [leftCounter, setLeftCounter] = useState(0);

  const handleRightButtonClick = () => {
    if (rightCounter < tiles.length - 1 && rightCounter >= 4) {
      setRightCounter((prev) => ++prev);
      setLeftCounter((prev) => ++prev);
    } else {
      setRightCounter(4);
      setLeftCounter(0);
    }
  };

  const handleLeftButtonClick = () => {
    if (
      leftCounter < tiles.length - 4 &&
      leftCounter >= 0 &&
      rightCounter > 4
    ) {
      setLeftCounter((prev) => --prev);
      setRightCounter((prev) => --prev);
    } else {
      setRightCounter(4);
      setLeftCounter(0);
    }
  };

  console.log(leftCounter, rightCounter);

  return (
    <div className="slider">
      <Button title="<" secondary onClick={handleLeftButtonClick}></Button>
      {tiles.map(
        (tile, index) =>
          index >= leftCounter &&
          index <= rightCounter && (
            <div className="tile" key={tile._id}>
              <img src={tile.img} alt="" />
              <h3>{tile.name}</h3>
            </div>
          )
      )}
      <Button title=">" secondary onClick={handleRightButtonClick}></Button>
    </div>
  );
};
