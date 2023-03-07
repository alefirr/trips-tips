import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Title, Button, Carousel } from '../../ui';

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
      <Carousel tiles={data} entityRoute={entityName} />
      <Link to={addPageLink}>
        <Button title={addButtonText} secondary />
      </Link>
    </>
  );
};
