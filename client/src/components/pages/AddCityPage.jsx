import React from 'react';
import { addCity } from '../../redux/slices/citySlice';
import { getAllCountries } from '../../redux/slices/countrySlice';
import { EditPage } from '../templates';
import './AddCityPage.css';

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
      inputs={inputs}
      dispatcher={addCity}
      preloaders={[getAllCountries]}
    />
  );
};
