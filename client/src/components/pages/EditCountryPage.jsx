import React from 'react';
import { useParams } from 'react-router-dom';
import { getAllContinents, addCountry } from '../../redux';
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
      dispatcher={addCountry}
      preloaders={[getAllContinents]}
      selector={
        countryId &&
        ((state) => state.country.list.find((c) => c._id === countryId))
      }
    />
  );
};
