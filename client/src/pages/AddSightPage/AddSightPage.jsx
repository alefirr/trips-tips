import React, { useEffect, useState } from 'react';
import { Button } from '../../components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import './AddSightPage.css';
import { addSight } from '../../redux/slices/sightSlice';
import { getAllTypes } from '../../redux/slices/typeSlice';
import { getAllCities } from '../../redux/slices/citySlice';

export const AddSightPage = () => {
  const [sightName, setSightName] = useState('');
  const [sightText, setSightText] = useState('');
  const [sightPicture, setSightPicture] = useState('');
  const [sightCityId, setSightCityId] = useState('');
  const [sightTypeId, setSightTypeId] = useState('');

  const dispatch = useDispatch();
  const types = useSelector((state) => state.type.list);
  const cities = useSelector((state) => state.city.list);

  useEffect(() => {
    dispatch(getAllTypes());
    dispatch(getAllCities());
  }, [dispatch]);

  const submitHandler = () => {
    try {
      const formData = new FormData();
      formData.append('imgUrl', sightPicture);
      formData.append('name', sightName);
      formData.append('text', sightText);
      formData.append('city', sightCityId);
      formData.append('type', sightTypeId);
      dispatch(addSight(formData));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-sight-container">
      <form
        className="add-sight-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h1 className="add-sight-header"> New Sight</h1>
        <label className="add-sight-label">
          Add sight picture:
          <input
            type="file"
            className="add-sight-input"
            onChange={(e) => setSightPicture(e.target.files[0])}
          />
        </label>
        <label className="add-sight-label">
          Add sight name:
          <input
            value={sightName}
            onChange={(e) => setSightName(e.target.value)}
            type="text"
            placeholder="Sight name"
            className="add-sight-input"
          />
        </label>
        <label className="add-sight-label">
          Add some info about the sight:
          <textarea
            value={sightText}
            className="add-sight-input"
            onChange={(e) => setSightText(e.target.value)}
          />
        </label>
        <label htmlFor="city" className="add-sight-label">
          Add sight location:
          <select
            id="city"
            value={sightCityId}
            onChange={(e) => setSightCityId(e.target.value)}
          >
            <option>Choose city</option>
            {cities.map((city) => (
              <option value={city._id} key={city._id}>
                {city.name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="type" className="add-sight-label">
          Add sight type:
          <select
            id="type"
            value={sightTypeId}
            onChange={(e) => setSightTypeId(e.target.value)}
          >
            <option>Choose type</option>
            {types.map((type) => (
              <option value={type._id} key={type._id}>
                {type.name}
              </option>
            ))}
          </select>
        </label>
        <div className="add-sight-button-container">
          <Button title="Add" onClick={submitHandler} />
          <Button title="Cancel" secondary />
        </div>
      </form>
    </div>
  );
};
