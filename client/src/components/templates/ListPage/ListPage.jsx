import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Title, Button, Carousel } from '../../ui';
import './ListPage.css';

export const ListPage = ({
  title,
  details,
  displayEntity,
  fetcher,
  selector,
}) => {
  const dispatch = useDispatch();
  const data = useSelector(selector);

  useEffect(() => {
    dispatch(fetcher());
  }, [fetcher, dispatch]);

  const addPageLink = `new-${displayEntity}`;
  const addButtonText = `Add new ${displayEntity}`;

  return (
    <>
      <Title>{title}</Title>
      {details ? (
        <>
          <div className="details-container">
            <div>
              {details?.map((detail) => (
                <h4 key={detail.value}>{`${detail.key} : ${detail.value}`}</h4>
              ))}
            </div>
            <div className="img"></div>
          </div>
          <h2>{`Choose a ${displayEntity} to visit:`}</h2>
        </>
      ) : null}
      {data?.length ? (
        <Carousel tiles={data} entityRoute={displayEntity} />
      ) : (
        <div className="no-data-text">
          <p>No data to display fot now :(</p>
          <p>Press the button below to add something!</p>
        </div>
      )}
      <Link to={addPageLink}>
        <Button title={addButtonText} secondary />
      </Link>
    </>
  );
};
