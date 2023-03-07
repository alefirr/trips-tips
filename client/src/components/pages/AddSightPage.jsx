import React from 'react';
import { addSight } from '../../redux/slices/sightSlice';
import { getAllTypes } from '../../redux/slices/typeSlice';
import { getAllCities } from '../../redux/slices/citySlice';
import { EditPage } from '../templates';
import './AddSightPage.css';

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
    optionsSelector: (state) => state.city.list,
  },
  {
    id: 'type',
    type: 'select',
    label: 'Add sight type:',
    optionsSelector: (state) => state.type.list,
  },
];

export const AddSightPage = () => {
  return (
    <EditPage
      inputs={inputs}
      dispatcher={addSight}
      preloaders={[getAllTypes, getAllCities]}
    />
  );
};
