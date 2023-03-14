import React from 'react';
import { useParams } from 'react-router-dom';
import { addCity, getAllCountries, updateCity } from '../../redux';
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

export const EditCityPage = () => {
  const { cityId } = useParams();

  return (
    <EditPage
      entity="city"
      inputs={inputs}
      dispatcher={cityId ? updateCity : addCity}
      preloaders={[getAllCountries]}
      selector={
        cityId &&
        ((state) => state.city.list.find((city) => city._id === cityId))
      }
    />
  );
};
