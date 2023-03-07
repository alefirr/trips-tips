import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllSights } from '../../redux';
import { ListPage } from '../templates';

export const CityPage = () => {
  const { cityId } = useParams();

  const cityName = useSelector(
    (state) => state.city.list.find((city) => city._id === cityId).name
  );

  const pageTitle = `Explore ${cityName}`;

  return (
    <ListPage
      title={pageTitle}
      displayEntity="sight"
      fetcher={getAllSights}
      selector={(state) =>
        state.sight.list.filter((sight) => sight.city === cityId)
      }
    />
  );
};
