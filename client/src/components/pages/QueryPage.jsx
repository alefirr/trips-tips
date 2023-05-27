import React from 'react';
import axios from 'axios';
import { Button } from '../ui';

const REQUESTS = [
  {
    label: 'Місця які знаходяться в країні:',
    query: (country) => `
      SELECT sight.name
      FROM sights sight
      JOIN cities city ON sight.city_id = city.id
      JOIN countries country ON city.country_id = country.id WHERE country.name = '${country}';
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
    type: 'number',
  },
  {
    label: 'Країни з кількістю міст більше, ніж:',
    query: (count) => `
      SELECT DISTINCT country.name
      FROM countries country
      JOIN cities city ON city.country_id = country.id
      GROUP BY country.id HAVING COUNT(DISTINCT city.id) > ${count};
    `,
    type: 'number',
  },
  {
    label: 'Всі теги що є в місцях міста:',
    query: (city) => `
      SELECT DISTINCT tags.name
      FROM tags
      INNER JOIN sights_tags ON tags.id = sights_tags.tag_id
      INNER JOIN sights ON sights_tags.sight_id = sights.id
      INNER JOIN cities ON sights.city_id = cities.id WHERE cities.name = '${city}';
    `,
    type: 'text',
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
    label: ' Знайти назви місць, які мають всі теги, що й місце:',
    query: (place) => `
      SELECT s.name
      FROM sights s
      WHERE s.name != '${place}'
      AND NOT EXISTS
        ((SELECT sights_tags.tag_id
          FROM sights_tags
          WHERE sights_tags.sight_id = s.id)
          EXCEPT
          (SELECT sights_tags.tag_id
          FROM sights_tags
          WHERE sights_tags.sight_id IN
	          (SELECT sights.id
            FROM sights
            WHERE sights.name = '${place}')))
      AND NOT EXISTS
        ((SELECT sights_tags.tag_id
        FROM sights_tags
        WHERE sights_tags.sight_id IN
  	      (SELECT sights.id
          FROM sights
          WHERE sights.name = '${place}'))
        EXCEPT
        (SELECT sights_tags.tag_id
         FROM sights_tags
         WHERE sights_tags.sight_id = s.id)); `,
  },
  {
    label:
      'Знайти назви тегів, які повторюються в принаймні усіх місцях міста з назвою:',
    query: (city) => `
    SELECT tags.name
      FROM tags
      WHERE NOT EXISTS 
      ((SELECT sights.id
        FROM sights 
        WHERE sights.city_id  IN 
          (SELECT cities.id 
          FROM cities 
          WHERE cities.name = '${city}'))
          EXCEPT
          (SELECT sights_tags.sight_id 
            FROM sights_tags
            WHERE sights_tags.tag_id = tags.id));`,
    type: 'text',
  },
  {
    label: `Знайти місто в місцях якого є принаймні одне місце з усіма тегами`,
    query: `SELECT c.name
            FROM cities c
            WHERE NOT EXISTS (
              SELECT t.id
              FROM tags t
              WHERE NOT EXISTS (
                SELECT s.id
                FROM sights s
                WHERE s.city_id = c.id
                AND s.id IN (
                  SELECT st.sight_id
                  FROM sights_tags st
                  WHERE st.tag_id = t.id             
                )
              )
            );`,
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
                type={request.type || 'text'}
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
