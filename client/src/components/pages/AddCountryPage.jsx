import React from 'react';
import { getAllContinents } from '../../../redux/continents/continentsActions';
import { addCountry } from '../../redux/slices/countrySlice';
import { EditPage } from '../templates';

const inputs = [
  {
    id: 'img',
    type: 'file',
    label: 'Add country picture:',
  },
  {
    id: 'name',
    type: 'text',
    label: 'Add country name:',
  },
  {
    id: 'text',
    type: 'textarea',
    label: 'Add some info about the country:',
  },
  {
    id: 'continent',
    type: 'select',
    label: 'Add country location:',
    optionsSelector: (state) => state.continent.list,
  },
];

export const AddCountryPage = () => {
  return (
    <EditPage
      inputs={inputs}
      dispatcher={addCountry}
      preloaders={[getAllContinents]}
    />
  );
};
