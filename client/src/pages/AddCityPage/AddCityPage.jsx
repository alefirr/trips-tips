import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/Button/Button';
import { addCity } from '../../redux/slices/citySlice';
import { getAllCountries } from '../../redux/slices/countrySlice';
import './AddCityPage.css';

export const AddCityPage = () => {
  const [cityName, setCityName] = useState('');
  const [cityText, setCityText] = useState('');
  const [cityPicture, setCityPicture] = useState('');
  const [cityCountryId, setCityCountryId] = useState('');

  const dispatch = useDispatch();
  const countries = useSelector((state) => state.country.list);

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  const submitHandler = () => {
    try {
      const formData = new FormData();
      formData.append('img', cityPicture);
      formData.append('name', cityName);
      formData.append('text', cityText);
      formData.append('country', cityCountryId);
      dispatch(addCity(formData));
    } catch (error) {
      console.log(error);
    }
  };

  console.log(cityCountryId);

  return (
    <div className="add-city-container">
      <form
        className="add-city-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h1 className="add-city-header"> New City</h1>
        <label className="add-city-label">
          Add city picture:
          <input
            type="file"
            className="add-city-input"
            onChange={(e) => setCityPicture(e.target.files[0])}
          />
        </label>
        <label className="add-city-label">
          Add city name:
          <input
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            type="text"
            placeholder="City name"
            className="add-city-input"
          />
        </label>
        <label className="add-city-label">
          Add some info about the city:
          <textarea
            value={cityText}
            className="add-city-input"
            onChange={(e) => setCityText(e.target.value)}
          />
        </label>
        <label htmlFor="country" className="add-city-label">
          Add city location:
          <select
            id="country"
            value={cityCountryId}
            onChange={(e) => setCityCountryId(e.target.value)}
          >
            <option>Choose country</option>
            {countries.map((country) => (
              <option value={country._id} key={country._id}>
                {country.name}
              </option>
            ))}
          </select>
        </label>
        <div className="add-city-button-container">
          <Button title="Add" onClick={submitHandler} />
          <Button title="Cancel" secondary />
        </div>
      </form>
    </div>
  );
};
