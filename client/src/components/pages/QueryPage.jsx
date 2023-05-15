import React from 'react';
import axios from 'axios';
import { Button } from '../ui';

const REQUESTS = [
  {
    label: 'Місця які знаходяться в Германії:',
    query: `
      SELECT sight.name
      FROM sights sight
      JOIN cities city ON sight.city_id = city.id
      JOIN countries country ON city.country_id = country.id WHERE country.name = 'Germany';
    `,
  },
  {
    label: 'Країни, де є хоча б одне місто, населення якого перевищує:',
    query: (population) => `
      SELECT DISTINCT countries.name 
      FROM cities 
      JOIN countries ON cities.country_id = countries.id 
      WHERE cities.population > ${population};
    `,
  },
  {
    label: 'Країни з кількістю міст більше, ніж 3:',
    query: `
      SELECT DISTINCT country.name
      FROM countries country
      JOIN cities city ON city.country_id = country.id
      GROUP BY country.id HAVING COUNT(DISTINCT city.id) > 4;
    `,
  },
  {
    label: 'Всі теги що є в місцях міста:',
    query: (city) => `
      SELECT DISTINCT tags.name
      FROM tags
      INNER JOIN sights_tags ON tags.id = sights_tags.tag_id
      INNER JOIN sights ON sights_tags.sight_id = sights.id
      INNER JOIN cities ON sights.city_id = cities.id WHERE cities.name = '${city}'
    `,
  },
  {
    label: 'Країни для яких у списку є столиця:',
    query: `
      SELECT DISTINCT c.name
      FROM countries c
      JOIN cities ci ON c.id = ci.country_id WHERE ci.is_capital = true;
    `,
  },
  {
    label: 'Назви місць з такими ж тегами, як і Ейфелева вежа:',
    query: `
      SELECT s.name
      FROM sights s
      JOIN sights_tags st ON s.id = st.sight_id
      JOIN tags t ON st.tag_id = t.id
      WHERE t.id IN (
          SELECT t.id
          FROM sights s
          JOIN sights_tags st ON s.id = st.sight_id
          JOIN tags t ON st.tag_id = t.id
          WHERE s.name = 'Eiffel Tower'
      )
      AND s.name != 'Eiffel Tower'
      GROUP BY s.id
      HAVING COUNT(DISTINCT t.id) = (
          SELECT COUNT(DISTINCT t.id)
          FROM sights s
          JOIN sights_tags st ON s.id = st.sight_id
          JOIN tags t ON st.tag_id = t.id
          WHERE s.name = 'Eiffel Tower'
      )
    `,
  },
  {
    label: `Знайти назви міст в яких є місця, які сполучені з тегами 'Art', 'Park'`,
    query: `
      SELECT DISTINCT cities.name 
      FROM cities
      INNER JOIN sights ON cities.id = sights.city_id
      INNER JOIN sights_tags ON sights.id = sights_tags.sight_id
      INNER JOIN tags ON sights_tags.tag_id = tags.id
      WHERE tags.name IN ('Art', 'Park')
      GROUP BY cities.id
      HAVING COUNT(DISTINCT tags.name) = 2;
    `,
  },
];

const DEFAULT_INPUTS = new Array(REQUESTS.length);

export const QueryPage = () => {
  const [inputs, setInputs] = React.useState(DEFAULT_INPUTS);
  const [results, setResults] = React.useState({});

  const onSendRequest = async (index) => {
    const request = REQUESTS[index];
    const query =
      typeof request.query === 'function'
        ? request.query(inputs[index])
        : request.query;

    const result = await axios.post('http://localhost:3002/api/query', {
      query,
    });

    setResults({ ...results, [index]: result.data });
  };

  return (
    <div>
      {REQUESTS.map((request, index) => (
        <div style={{ marginBottom: 40 }}>
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <h3>{request.label}</h3>
            {typeof request.query === 'function' && (
              <input
                value={inputs[index] || ''}
                onChange={(e) =>
                  setInputs({ ...inputs, [index]: e.target.value })
                }
                style={{ marginLeft: 20 }}
              />
            )}
            <div style={{ marginLeft: 20 }}>
              <Button
                title="Виконати запит"
                onClick={() => onSendRequest(index)}
              />
            </div>
          </div>
          {results[index] && (
            <div
              style={{
                padding: 12,
                backgroundColor: 'white',
                marginTop: 10,
                maxWidth: 1000,
              }}
            >
              {results[index]?.join(', ') || 'Немає результатів'}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
