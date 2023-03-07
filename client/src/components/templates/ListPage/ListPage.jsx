import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Title, Button, Carousel } from '../../ui';
import './ListPage.css';

export const ListPage = ({ title, entityName, fetcher, selector }) => {
  const dispatch = useDispatch();
  const data = useSelector(selector);

  useEffect(() => {
    dispatch(fetcher());
  }, [fetcher, dispatch]);

  const addPageLink = `new-${entityName}`;
  const addButtonText = `Add new ${entityName}`;

  return (
    <>
      <Title>{title}</Title>
      {data?.length ? (
        <Carousel tiles={data} entityRoute={entityName} />
      ) : (
        <div className="no-data-text">
          <p>No data to display :(</p>
          <p>Press the button below to add something!</p>
        </div>
      )}
      <Link to={addPageLink}>
        <Button title={addButtonText} secondary />
      </Link>
    </>
  );
};
