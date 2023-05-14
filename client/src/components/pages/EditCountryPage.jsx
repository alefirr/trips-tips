import React from 'react';
import { useParams } from 'react-router-dom';
import { getAllContinents, addCountry, updateCountry } from '../../redux';
import { EditPage } from '../templates';

const inputs = [
  {
    id: 'name',
    type: 'text',
    label: 'Add country name:',
    max: 30,
  },
  {
    id: 'text',
    type: 'textarea',
    label: 'Add some info about the country:',
    max: 200,
    isOptional: true,
  },
  {
    id: 'continent_id',
    type: 'select',
    label: 'Add country location:',
    placeholder: 'Select continent',
    optionsSelector: (state) => state.continent.list,
  },
];

export const EditCountryPage = () => {
  const { countryId } = useParams();

  return (
    <EditPage
      entity="country"
      inputs={inputs}
      dispatcher={countryId ? updateCountry : addCountry}
      preloaders={[getAllContinents]}
      selector={
        countryId &&
        ((state) => state.country.list.find((c) => c.id === countryId))
      }
    />
  );
};
