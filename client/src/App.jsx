import { Routes, Route } from 'react-router-dom';
import {
  MainPage,
  CountryPage,
  CityPage,
  SightPage,
  EditCityPage,
  EditCountryPage,
  EditSightPage,
} from './components/pages';
import { Layout } from './components';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="" element={<MainPage />} />
        <Route path="new-country" element={<EditCountryPage />} />
        <Route path="edit-country/:countryId" element={<EditCountryPage />} />
        <Route path="new-city" element={<EditCityPage />} />
        <Route
          path="country/:countryId/edit-city/:cityId"
          element={<EditCityPage />}
        />
        <Route path="new-sight" element={<EditSightPage />} />
        <Route path="country/:countryId" element={<CountryPage />} />
        <Route path="city/:cityId" element={<CityPage />} />
        <Route path="sight/:sightId" element={<SightPage />} />
        <Route path="country/:countryId/new-city" element={<EditCityPage />} />
        <Route path="country/:countryId/city/:cityId" element={<CityPage />} />
        <Route path="city/:cityId/new-sight" element={<EditSightPage />} />
        <Route path="city/:cityId/sight/:sightId" element={<SightPage />} />
        <Route
          path="country/:countryId/city/:cityId/new-sight"
          element={<EditSightPage />}
        />
        <Route
          path="country/:countryId/city/:cityId/edit-sight/:sightId"
          element={<EditSightPage />}
        />
        <Route
          path="country/:countryId/city/:cityId/sight/:sightId/edit-sight/:sightId"
          element={<EditSightPage />}
        />
        <Route
          path="sight/:sightId/edit-sight/:sightId"
          element={<EditSightPage />}
        />
        <Route
          path="country/:countryId/city/:cityId/sight/:sightId"
          element={<SightPage />}
        />
      </Routes>
    </Layout>
  );
}

export default App;
