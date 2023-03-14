import React from 'react';
import { addSight, getAllTypes, getAllCities } from '../../redux';
import { EditPage } from '../templates';

const inputs = [
  {
    id: 'img',
    type: 'file',
    label: 'Add sight picture:',
  },
  {
    id: 'name',
    type: 'text',
    label: 'Add sight name:',
  },
  {
    id: 'text',
    type: 'textarea',
    label: 'Add some info about the sight:',
  },
  {
    id: 'city',
    type: 'select',
    label: 'Add sight location:',
    placeholder: 'Select city',
    optionsSelector: (state) => state.city.list,
  },
  {
    id: 'type',
    type: 'select',
    label: 'Add sight type:',
    placeholder: 'Select type',
    optionsSelector: (state) => state.type.list,
  },
];

export const EditSightPage = () => {
  return (
    <EditPage
      entity="sight"
      inputs={inputs}
      dispatcher={addSight}
      preloaders={[getAllTypes, getAllCities]}
    />
  );
};
