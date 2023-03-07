import React from 'react';
import { getAllCountries } from '../../redux';
import { ListPage } from '../templates';

const PAGE_TITLE = 'Start Your Journey Now';

export const MainPage = () => {
  return (
    <ListPage
      title={PAGE_TITLE}
      displayEntity="country"
      fetcher={getAllCountries}
      selector={(state) => state.country.list}
    />
  );
};
