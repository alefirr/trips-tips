import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  MainPage,
  CountryPage,
  CityPage,
  SightPage,
  AddCityPage,
  AddCountryPage,
  AddSightPage,
  LoginPage,
} from './pages';
import { Layout } from './components';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="country/:countryId" element={<CountryPage />} />
        <Route path="city/:cityId" element={<CityPage />} />
        <Route path="sight/:sightId" element={<SightPage />} />
        <Route path="new-country" element={<AddCountryPage />} />
        <Route path="new-city" element={<AddCityPage />} />
        <Route path="new-sight" element={<AddSightPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
