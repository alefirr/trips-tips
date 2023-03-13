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
  RegisterPage,
} from './components/pages';
import { Layout } from './components';
import { ChartPage } from './components/pages/ChartPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="" element={<MainPage />} />
        <Route path="new-country" element={<AddCountryPage />} />
        <Route path="new-city" element={<AddCityPage />} />
        <Route
          path="country/:countryId/edit-city/:cityId"
          element={<AddCityPage />}
        />
        <Route path="new-sight" element={<AddSightPage />} />
        <Route path="country/:countryId" element={<CountryPage />} />
        <Route path="city/:cityId" element={<CityPage />} />
        <Route path="sight/:sightId" element={<SightPage />} />
        <Route path="country/:countryId/new-city" element={<AddCityPage />} />
        <Route path="country/:countryId/city/:cityId" element={<CityPage />} />
        <Route path="city/:cityId/new-sight" element={<AddSightPage />} />
        <Route path="city/:cityId/sight/:sightId" element={<SightPage />} />
        <Route
          path="country/:countryId/city/:cityId/new-sight"
          element={<AddSightPage />}
        />
        <Route
          path="country/:countryId/city/:cityId/sight/:sightId"
          element={<SightPage />}
        />
        <Route path="/charts" element={<ChartPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
