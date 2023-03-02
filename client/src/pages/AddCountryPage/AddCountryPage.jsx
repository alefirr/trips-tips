import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/Button/Button';
import { getAllContinents } from '../../redux/slices/continentSlice';
import { addCountry } from '../../redux/slices/countrySlice';
import './AddCountryPage.css';

export const AddCountryPage = () => {
  const [countryName, setCountryName] = useState('');
  const [countryText, setCountryText] = useState('');
  const [countryPicture, setCountryPicture] = useState('');
  const [countryContinentId, setCountryContinent] = useState('');

  const dispatch = useDispatch();
  const continents = useSelector((state) => state.continent.list);

  useEffect(() => {
    dispatch(getAllContinents());
  }, [dispatch]);

  const submitHandler = () => {
    try {
      const formData = new FormData();
      formData.append('imgUrl', countryPicture);
      formData.append('name', countryName);
      formData.append('text', countryText);
      formData.append('continent', countryContinentId);
      dispatch(addCountry(formData));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-country-container">
      <form
        className="add-country-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h1 className="add-country-header"> New Country</h1>
        <label className="add-country-label">
          Add country picture:
          <input
            type="file"
            className="add-country-input"
            onChange={(e) => setCountryPicture(e.target.files[0])}
          />
        </label>
        <label className="add-country-label">
          Add country name:
          <input
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
            type="text"
            placeholder="Country name"
            className="add-country-input"
          />
        </label>
        <label className="add-country-label">
          Add some info about the country:
          <textarea
            value={countryText}
            className="add-country-input"
            onChange={(e) => setCountryText(e.target.value)}
          />
        </label>
        <label for="continent" className="add-country-label">
          Add country location:
          <select
            id="continent"
            value={countryContinentId}
            onChange={(e) => setCountryContinent(e.target.value)}
          >
            <option>Choose continent</option>
            {continents.map((continent) => (
              <option value={continent._id} key={continent._id}>
                {continent.name}
              </option>
            ))}
          </select>
        </label>
        <div className="add-country-button-container">
          <Button title="Add" onClick={submitHandler} />
          <Button title="Cancel" secondary />
        </div>
      </form>
    </div>
  );
};
