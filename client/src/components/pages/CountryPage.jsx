import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllCities, getAllCountries, getAllContinents } from '../../redux';
import { ListPage } from '../templates';

export const CountryPage = () => {
  const dispatch = useDispatch();
  let { countryId } = useParams();
  countryId = +countryId;

  const countries = useSelector((state) => state.country.list);
  const continents = useSelector((state) => state.continent.list);

  useEffect(() => {
    if (!countries.length) {
      dispatch(getAllCountries());
    }
    dispatch(getAllContinents());
  }, [countries.length, dispatch]);

  const country = useMemo(
    () => countries.find((country) => country.id === +countryId),
    [countries, countryId]
  );

  const pageTitle = `Explore ${country?.name}`;

  const getDetails = () => {
    const details = [];
    for (let key in country) {
      switch (key) {
        case 'text':
          details.push({ key: 'Info', value: country[key] });
          break;
        case 'continent':
          const continent = continents.find(
            (continent) => continent.id === country[key]
          );

          details.push({ key: 'Continent', value: continent?.name });
          break;
        default:
          break;
      }
    }
    return details;
  };

  return (
    <ListPage
      title={pageTitle}
      details={getDetails()}
      displayEntity="city"
      fetcher={getAllCities}
      selector={(state) =>
        state.city.list.filter((city) => city.country_id === countryId)
      }
    />
  );
};
