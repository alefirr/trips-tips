import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../ui';

export const QueryPage = () => {
  return (
    <div>
      <NavLink to="/" href="/">
        <Button title="Main Page" />
      </NavLink>
      <p>
        Query Request1:Місця які знаходяться в Германії:"
        <code>
          SELECT sight.name FROM sights sight JOIN cities city ON sight.city_id=
          city.id JOIN countries country ON city.country_id = country.id WHERE
          country.name = 'Germany'
        </code>
      </p>
      <p>
        Query Request2:Країни,де є хоча б одне місто, населення якого перевищує:
        {}
      </p>
      <input type="number"></input>
      <p>
        Query Request3: Країни з кількістю міст більше, ніж 3 SELECT DISTINCT
        country.name FROM countries country JOIN cities city ON city.country_id
        = country.id GROUP BY country.id HAVING COUNT(DISTINCT city.id) > 4;
      </p>
      <p>
        Query Request4: Всі теги що є в місцях Парижа SELECT DISTINCT tags.name
        FROM tags INNER JOIN sights_tags ON tags.id = sights_tags.tag_id INNER
        JOIN sights ON sights_tags.sight_id = sights.id INNER JOIN cities ON
        sights.city_id = cities.id WHERE cities.name = 'Paris';
      </p>
      <p>
        Query Request5: Країни для яких у списку є столиця SELECT DISTINCT
        c.name FROM countries c JOIN cities ci ON c.id = ci.country_id WHERE
        ci.is_capital = true;
      </p>
      <p>
        Query Request6:Назви міст в яких є місця з однаковою множиною тегів{}
      </p>
      <p>Query Request7: Назви місць для усіх тегів{}</p>
      <p>Query Request8: Назви місць з такими ж тегами, як і місце Х{}</p>
    </div>
  );
};
