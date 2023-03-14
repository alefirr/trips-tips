import React from 'react';
import { useParams } from 'react-router-dom';
import { addSight, getAllTypes, getAllCities, updateSight } from '../../redux';
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
  const { sightId } = useParams();

  return (
    <EditPage
      entity="sight"
      inputs={inputs}
      dispatcher={sightId ? updateSight : addSight}
      preloaders={[getAllTypes, getAllCities]}
      selector={
        sightId && ((state) => state.sight.list.find((s) => s._id === sightId))
      }
    />
  );
};
