import React from 'react';
import { addCity, getAllCountries } from '../../redux';
import { EditPage } from '../templates';

const inputs = [
  {
    id: 'img',
    type: 'file',
    label: 'Add city picture:',
  },
  {
    id: 'name',
    type: 'text',
    label: 'Add city name:',
  },
  {
    id: 'text',
    type: 'textarea',
    label: 'Add some info about the city:',
  },
  {
    id: 'country',
    type: 'select',
    label: 'Add city location:',
    placeholder: 'Select country',
    optionsSelector: (state) => state.country.list,
  },
  {
    id: 'isCapital',
    type: 'checkbox',
    label: 'Is it a capital?',
  },
  {
    id: 'population',
    type: 'number',
    label: 'Add city population:',
  },
];

export const AddCityPage = () => {
  return (
    <EditPage
      entity="city"
      inputs={inputs}
      dispatcher={addCity}
      preloaders={[getAllCountries]}
    />
  );
};
