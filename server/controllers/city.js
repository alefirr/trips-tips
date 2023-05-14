import query from '../database.js';

const injectCityById = async (id) => {
  const res = await query(`SELECT * FROM CITIES WHERE id = ${id}`);
  return res?.rows?.[0];
};

export const addCity = async (req, res) => {
  try {
    const { name, text, country_id, is_capital, population } = req.body;

    const isAdded = (
      await query(
        `SELECT * FROM CITIES WHERE name = '${name}' AND country_id = ${country_id}`
      )
    )?.rows?.[0];

    if (isAdded) {
      return res.status(400).json({
        message: 'City with such name already exists in this country',
      });
    }

    const id = (
      await query(
        `INSERT INTO CITIES (name, text, country_id, is_capital, population) VALUES ('${name}', '${text}', ${country_id}, ${is_capital}, ${population}) RETURNING id`
      )
    ).rows?.[0]?.id;

    res.json({
      id,
      name,
      text,
      country_id,
      is_capital,
      population,
    });
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during adding city',
      e: e.message,
    });
  }
};

export const updateCity = async (req, res) => {
  try {
    const { name, text, id, country_id, is_capital, population } = req.body;

    const nameExists = (
      await query(
        `SELECT * FROM CITIES WHERE name = '${name} AND id != ${id} AND country_id = ${country_id}'`
      )
    )?.rows?.[0];

    if (nameExists) {
      return res.status(400).json({
        message: 'City with such name already exists in this country',
      });
    }

    const city = await injectCityById(id);

    if (city) {
      await query(
        `UPDATE CITIES SET name = '${name}', text = '${text}', country_id = ${country_id}, is_capital = ${is_capital}, population = ${population} WHERE id = ${id}`
      );

      return res.json({
        name,
        text,
        country_id,
        is_capital,
        population,
      });
    }

    res.status(400).json({ message: 'No such city' });
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during updating city',
      e: e.message,
    });
  }
};

export const getAllCities = async (_req, res) => {
  try {
    const cities = (await query(`SELECT * FROM CITIES ORDER BY "name" ASC`))
      ?.rows;

    if (!cities?.length) {
      return res.status(400).json({ message: 'No cities!' });
    }

    res.json(cities);
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during getting cities',
      e: e.message,
    });
  }
};

export const getCityById = async (req, res) => {
  try {
    const city = await injectCityById(req.params.id);

    if (!city) {
      return res.status(400).json({ message: 'No such city' });
    }

    res.json(city);
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during getting city',
      e: e.message,
    });
  }
};

export const removeCity = async (req, res) => {
  try {
    const city = await injectCityById(req.params.id);

    if (!city) {
      return res.status(400).json({ message: 'No such city' });
    }

    await query(`DELETE FROM CITIES WHERE id = ${req.params.id}`);

    res.json({ message: 'City was deleted' });
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during removing city',
      e: e.message,
    });
  }
};
