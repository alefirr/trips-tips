import React from 'react';
import { useParams } from 'react-router-dom';
import { addCity, getAllCountries, updateCity } from '../../redux';
import { EditPage } from '../templates';

const inputs = [
  {
    id: 'name',
    type: 'text',
    label: 'Add city name:',
    max: 30,
  },
  {
    id: 'text',
    type: 'textarea',
    label: 'Add some info about the city:',
    max: 200,
    isOptional: true,
  },
  {
    id: 'country_id',
    type: 'select',
    label: 'Add city location:',
    placeholder: 'Select country',
    optionsSelector: (state) => state.country.list,
  },
  {
    id: 'is_capital',
    type: 'checkbox',
    label: 'Is it a capital?',
  },
  {
    id: 'population',
    type: 'number',
    label: 'Add city population:',
    isOptional: true,
    max: 1000,
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
        ((state) => state.city.list.find((city) => city.id === +cityId))
      }
    />
  );
};
