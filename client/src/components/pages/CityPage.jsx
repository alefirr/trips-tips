import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllCities, getAllCountries, getAllSights } from '../../redux';
import { ListPage } from '../templates';

export const CityPage = () => {
  const dispatch = useDispatch();
  let { cityId } = useParams();
  cityId = +cityId;

  const countries = useSelector((state) => state.country.list);
  const cities = useSelector((state) => state.city.list);

  useEffect(() => {
    if (!countries.length) {
      dispatch(getAllCountries());
    }
    if (!cities.length) {
      dispatch(getAllCities());
    }
  }, [cities.length, countries.length, dispatch]);

  const city = useMemo(
    () => cities.find((city) => city.id === cityId),
    [cityId, cities]
  );

  const cityName = city?.name;

  const getDetails = () => {
    const details = [];
    for (let key in city) {
      switch (key) {
        case 'text':
          details.push({ key: 'Info', value: city[key] || 'Empty' });
          break;
        case 'country_id':
          const country = countries.find((country) => country.id === city[key]);
          details.push({ key: 'Country', value: country?.name });
          break;
        case 'is_capital':
          details.push({
            key: 'Is it a capital',
            value: city[key] ? 'Yes' : 'No',
          });
          break;
        case 'population':
          details.push({ key: 'Population', value: city[key] || 'Unknown' });
          break;
        default:
          break;
      }
    }
    console.log(details);
    return details;
  };

  const pageTitle = `Explore ${cityName}`;

  return (
    <ListPage
      title={pageTitle}
      details={getDetails()}
      displayEntity="sight"
      fetcher={getAllSights}
      selector={(state) =>
        state.sight.list.filter((sight) => sight.city_id === cityId)
      }
    />
  );
};
